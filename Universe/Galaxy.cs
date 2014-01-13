using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Universe
{
    public class Galaxy
    {
        public List<Star> Stars = new List<Star>();
        
        Vector3 minExtent, maxExtent;
        RenderCell[, ,] renderCells;
        float cellSize;

        const float avgStarsPerCell = 5;
        const double angularDiameterCutoff = 0.02; // a 1-radius sphere 100 units distant. Probably too big?

        public void CalculateRenderCells()
        {
            minExtent = Vector3.zero;
            maxExtent = Vector3.zero;

            foreach (var star in Stars)
            {
                if (star.Position.x < minExtent.x)
                    minExtent.x = star.Position.x;
                else if (star.Position.x > maxExtent.x)
                    maxExtent.x = star.Position.x;

                if (star.Position.y < minExtent.y)
                    minExtent.y = star.Position.y;
                else if (star.Position.y > maxExtent.y)
                    maxExtent.y = star.Position.y;

                if (star.Position.z < minExtent.z)
                    minExtent.z = star.Position.z;
                else if (star.Position.z > maxExtent.z)
                    maxExtent.z = star.Position.z;
            }

            // at this point, minExtent and maxExtent are the bounds of THE CENTER OF THE OUTERMOST STARS
            // these should be extended so as to encompass the max visibility range of all stars in the galaxy

            // cell VOLUME is proportional to the number of stars. Cell length therefore proportional to cube root of # of stars
            Vector3 extent = maxExtent - minExtent;
            float cellVol = avgStarsPerCell * extent.x * extent.y * extent.z / Stars.Count;
            cellSize = (float)Math.Pow(cellVol, 0.333333333333333333);

            int xMax = (int)Math.Ceiling(extent.x / cellSize);
            int yMax = (int)Math.Ceiling(extent.y / cellSize);
            int zMax = (int)Math.Ceiling(extent.z / cellSize);

#if DEBUG
            Console.WriteLine("Min extent: " + minExtent);
            Console.WriteLine("Max extent: " + maxExtent);
            Console.WriteLine(string.Format("Render cell grid: {0}x{1}x{2} = {3}", xMax, yMax, zMax, xMax * yMax * zMax));

            var allCells = new List<RenderCell>();
#endif

            renderCells = new RenderCell[xMax, yMax, zMax];
            for (int x = 0; x < xMax; x++)
                for (int y = 0; y < yMax; y++)
                    for (int z = 0; z < zMax; z++)
                    {
                        var cellStars = new List<Star>();
                        var visibleStars = new List<Star>();

                        Vector3 boundsMin = minExtent + new Vector3(x * cellSize, y * cellSize, z * cellSize);
                        Vector3 boundsMax = boundsMin + new Vector3(cellSize, cellSize, cellSize);

                        foreach (var star in Stars)
                            if (Within(star.Position, boundsMin, boundsMax))
                            {
                                cellStars.Add(star);
                                visibleStars.Add(star);
                            }
                            else
                            {
                                // is this star big enough to be seen from the current region?
                                Vector3 closest = ClosestPoint(star.Position, boundsMin, boundsMax);
                                float distance = Vector3.Distance(closest, star.Position);
                                double angularDiameter = 2 * Math.Asin(star.Radius / distance); // star.Radius is HUGE! That's not what we're using in-game. Need to use the same scale, though ultimately them being different seems pointless.

                                if (angularDiameter > angularDiameterCutoff)
                                    visibleStars.Add(star);
                            }

                        if (visibleStars.Count > 0)
                        {
                            RenderCell rc = new RenderCell();
                            rc.StarsInCell = cellStars;
                            rc.StarsToRender = visibleStars;
                            renderCells[x, y, z] = rc;
#if DEBUG
                            allCells.Add(rc);
#endif
                        }

#if DEBUG
                        else
                        {
                            RenderCell rc = new RenderCell();
                            rc.StarsInCell = new List<Star>();
                            rc.StarsToRender = new List<Star>();
                            allCells.Add(rc);
                        }
#endif
                    }

#if DEBUG
            Console.WriteLine(string.Format("Stars in cell: {0} mean, {1} min, {2} max",
                allCells.Sum((c)=>c.StarsInCell.Count)/allCells.Count,
                allCells.Min((c) => c.StarsInCell.Count),
                allCells.Max((c) => c.StarsInCell.Count)
            ));
            Console.WriteLine(string.Format("Stars visible from cell: {0} mean, {1} min, {2} max",
                allCells.Sum((c) => c.StarsToRender.Count) / allCells.Count,
                allCells.Min((c) => c.StarsToRender.Count),
                allCells.Max((c) => c.StarsToRender.Count)
            ));
#endif
        }

        public RenderCell GetRenderCell(Vector3 location)
        {
            location -= minExtent;

            int x = (int)(location.x / cellSize + 0.5f),
                y = (int)(location.y / cellSize + 0.5f),
                z = (int)(location.z / cellSize + 0.5f);

            if (x < 0 || y < 0 || z < 0
              || x >= renderCells.GetLength(0)
              || y >= renderCells.GetLength(1)
              || x >= renderCells.GetLength(2))
                return null;

            return renderCells[x,y,z];
        }

        private bool Within(Vector3 pos, Vector3 boundsMin, Vector3 boundsMax)
        {
            for (int i = 0; i < 3; i++)
                if (pos[i] < boundsMin[i] || pos[i] > boundsMax[i])
                    return false;
            return true;
        }

        private Vector3 ClosestPoint(Vector3 pos, Vector3 boundsMin, Vector3 boundsMax)
        {
            Vector3 vec = new Vector3();

            for (int i = 0; i < 3; i++)
            {
                if (pos[i] < boundsMin[i])
                    vec[i] = boundsMin[i];
                else if (pos[i] > boundsMax[i])
                    vec[i] = boundsMax[i];
                else
                    vec[i] = pos[i];
            }

            return vec;
        }

        public class RenderCell
        {
            internal List<Star> StarsInCell = new List<Star>();
            internal List<Star> StarsToRender = new List<Star>(); // stars within this cell, plus stars outwith this cell that could be "fully" visible from it
        }
    }
}
