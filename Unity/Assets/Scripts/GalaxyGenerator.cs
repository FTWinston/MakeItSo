using UnityEngine;
using System.Collections;
using Universe;
using System;

public class GalaxyGenerator : MonoBehaviour
{
	public Transform galaxyObject;
	public GameObject starTemplate;
    Galaxy galaxy;

	// Use this for initialization
	void Start ()
    {
		var generator = new Universe.GalaxyGenerator();
		generator.NumStars = 10000;

		galaxy = generator.Generate();

        // determine angular size of 1 pixel, so that we can ensure stars are never rendered smaller than this, but stay fixed at this angular size and fade away instead
        // ok this value needs doubled for some reason, then we want it a bit bigger so that things never round to just below 1 pixel and disappear.
        float FOV = 60 * Mathf.PI / 180f; // we need this in radians
        galaxy.angularDiameterCutoff = FOV / Screen.currentResolution.height * 2.8362f; // 0.00275 for 1080p at 60 degrees

		foreach (var starInfo in galaxy.Stars)
		{
			GameObject star = (GameObject)Instantiate(starTemplate);
			star.transform.parent = galaxyObject;
			star.transform.position = (Vector3)starInfo.Position;

			float r = (float)starInfo.Radius;
			star.transform.localScale = new UnityEngine.Vector3(r, r, r);

            star.renderer.material.color = starInfo.Color;

			//star.GetComponent<MyScript>().DoSomething();


            starInfo.Renderer = star;
		}
	}

    // scale all stars so that they have a minimum "on screen" size
    void Update()
    {
        //var time = DateTime.Now;
        var position = -galaxyObject.position;
        foreach (var star in galaxy.Stars)
        {
            var dist = (star.Renderer.GetComponent<Transform>().localPosition - position).magnitude;

            float r = (float)star.Radius;
            Vector3 scale = new UnityEngine.Vector3(r, r, r);

            var angularDiam = 2 * star.Radius / dist;
            float alpha = 1f;

            if (angularDiam < galaxy.angularDiameterCutoff)
            {
                float distScale = (float)(angularDiam / galaxy.angularDiameterCutoff);
                scale /= distScale;
                
                // at dist * distScale, intensity is 1

                // I = k * absLum / dist²
                
                // 1 = k * star.Luminosity / (dist * distScale)²
                // ? = k * star.Luminosity / dist²;

                // rearrange the first for k
                // k = (dist * distScale)² / star.Luminosity

                // substitute it in
                // ? = ((dist * distScale)² / star.Luminosity) * star.Luminosity / dist²;

                // and luminosity cancels?? well that doesn't seem to make any sense

                // ? = (dist * distScale)² / dist²;
                // ? = distScale²

                alpha = Math.Min(1f, (float)(1000000000000000000000.0 * star.Luminosity / dist / dist));
            }

            star.Renderer.SetActive(alpha > 0.001f);

            star.Renderer.transform.localScale = scale;
            star.Renderer.renderer.material.color = star.Color * alpha;
        }

        //var duration = DateTime.Now - time;
    }
}
