using UnityEngine;
using System.Collections;

public class ClickableText : MonoBehaviour
{
	public GUIText text;

	void Start ()
	{
		clickState = 0;
	}

	int clickState;
	void OnMouseEnter()
	{
		clickState = 1;
		text.fontStyle = FontStyle.Italic;
	}

	void OnMouseExit()
	{
		clickState = 0;
		text.fontStyle = FontStyle.Normal;
	}

	void OnMouseDown()
	{
		if (clickState == 1)
		{
			clickState = 2;
			text.fontStyle = FontStyle.BoldAndItalic;
		}
	}

	void OnMouseUp()
	{
		if (clickState == 2)
		{
			clickState = 1;
			text.fontStyle = FontStyle.Italic;

			if(OnClicked != null)
				OnClicked();
		}
	}

	public delegate void ClickAction();
	public event ClickAction OnClicked;
}
