using UnityEngine;
using System.Collections;

public class HelmController : MonoBehaviour
{
	public Transform galaxy;
	public ClickableText cameraText;
	public GUIText speedometer;
	public Camera rearCam, bowCam, topCam;

    public const float MaxImpulse = 200000, MinWarp = 3000000, MaxWarp = 300000000;
    private const float MaxImpulseSq = MaxImpulse * MaxImpulse, MinWarpSq = MinWarp * MinWarp, MaxWarpSq = MaxWarp * MaxWarp;

    private const float WarpAccel = MinWarp * 3f, ImpulseAccel = MaxImpulse * 0.2f, ImpulseAccelSq = ImpulseAccel * ImpulseAccel, ThrusterAccel = 100f, ThrusterCutoff = MaxImpulse * 0.001f, RotateSpeed = 1f;


    bool AtWarp, WarpTransition;

	enum CameraMode
	{
		Rear,
        Bow,
		Top,

		First = Rear,
		Last = Top,
	}

	CameraMode cameraMode;
	
	private Quaternion angularVelocity;
	private Vector3 velocity;

	// Use this for initialization
	void Start()
	{
		angularVelocity = Quaternion.identity;
		velocity = Vector3.zero;
        AtWarp = false;

		cameraText.OnClicked += CycleCamera;

		UpdateHelpText();
	}
	
	// Update is called once per frame
	void Update()
	{
        if (Input.GetButtonDown("ToggleCam"))
            CycleCamera();
        if (Input.GetButtonDown("Warp"))
        {
            AtWarp = !AtWarp;
            WarpTransition = true;
        }

        float speed = velocity.magnitude;
        if (AtWarp)
            speedometer.text = "Warp " + ((speed - MinWarp) / (MaxWarp - MinWarp) * 9 + 1).ToString("F2");
        else
            speedometer.text = speed > MaxImpulse * 0.999f ? "Full impulse" : speed < 1f ? "All stop" : (speed / MaxImpulse).ToString("F4") + " impulse";
	}

	// called just before physics?
	void FixedUpdate()
	{
		Rotate();
        Move();
	}

	private void Rotate()
	{
		if ( Input.GetButton("StopRot") )
		{
			angularVelocity = Quaternion.RotateTowards(angularVelocity, Quaternion.identity, RotateSpeed * Time.deltaTime);
		}
		else
		{
			float pitch = Input.GetAxis("Pitch");
			float yaw = Input.GetAxis("Yaw");
			float roll = Input.GetAxis("Roll");

            var rotateSpeed = AtWarp ? RotateSpeed * 0.3f : RotateSpeed;

            Quaternion change = Quaternion.Euler(-roll * rotateSpeed * Time.deltaTime, yaw * rotateSpeed * Time.deltaTime, -pitch * rotateSpeed * Time.deltaTime);
			angularVelocity *= change;

            // auto-braking rotation
            //float scale = 25;
            //angularVelocity = Quaternion.Euler(-roll * rotateSpeed * Time.deltaTime * scale, yaw * rotateSpeed * Time.deltaTime * scale, -pitch * rotateSpeed * Time.deltaTime * scale);
		}
		rigidbody.rotation *= angularVelocity;
	}

    private void Move()
    {
        Vector3 forward = Vector3.right;
        Vector3 right = Vector3.back;
        Vector3 up = Vector3.up;
        
        float throttle = Input.GetAxis("Throttle");

        if (AtWarp)
        {
            if (WarpTransition)
            {// in going to warp, ensure that we're moving, and moving strictly forwards
                if (velocity.sqrMagnitude < 1)
                    velocity = forward;
                else
                {
                    var forwardSpeed = Vector3.Dot(velocity, forward);
                    velocity = forward * forwardSpeed;
                    if (forwardSpeed < 0)
                        velocity = -velocity;
                }
                WarpTransition = false;
            }

            // accelerate / decelerate according to the throttle
            velocity += forward * throttle * WarpAccel * Time.deltaTime;
            
            // apply min & max speed limits
            float speedSq = velocity.sqrMagnitude;
            if (speedSq > MaxWarpSq)
                velocity = forward * MaxWarp;
            else if (speedSq < MinWarpSq)
                velocity = forward * MinWarp;
        }
        else
        {
            if (WarpTransition)
            {// always come out of warp at half impulse
                velocity = forward * MaxImpulse * 0.5f;
                WarpTransition = false;
            }

            float transLR, transUD;

            if (Input.GetButton("StopTrans"))
            {
                if (velocity.sqrMagnitude > ImpulseAccelSq * Time.deltaTime)
                    velocity -= velocity.normalized * ImpulseAccel * Time.deltaTime;
                else
                    velocity = Vector3.zero;
            }
            else
            {
                // lateral acceleration
                transLR = Input.GetAxis("LeftRight");
                transUD = Input.GetAxis("UpDown");
                Vector3 change = (right * transLR + up * transUD) * ThrusterAccel;

                // forward/back acceleration scales much faster, once you get going
                float forwardSpeed = Mathf.Abs(Vector3.Dot(velocity, forward));
                if (forwardSpeed < ThrusterCutoff )
                    change += throttle * forward * ThrusterAccel;
                else
                    change += throttle * forward * ImpulseAccel * forwardSpeed / MaxImpulse * 3f;

                velocity += change * Time.deltaTime;

                // impose a speed limit
                if (velocity.sqrMagnitude > MaxImpulseSq)
                    velocity = velocity.normalized * MaxImpulse;
            }
        }

        galaxy.position -= rigidbody.rotation * velocity;
    }
	
	void CycleCamera()
	{
		if (cameraMode == CameraMode.Last)
			cameraMode = CameraMode.First;
		else
			cameraMode ++;

		rearCam.enabled = cameraMode == CameraMode.Rear;
        bowCam.enabled = cameraMode == CameraMode.Bow;
		topCam.enabled = cameraMode == CameraMode.Top;

		UpdateHelpText();
	}

	void UpdateHelpText()
	{
		switch (cameraMode)
		{
		case CameraMode.Rear:
			cameraText.text.text = "Camera: Rear";
            break;
        case CameraMode.Bow:
            cameraText.text.text = "Camera: Rear";
            break;
		case CameraMode.Top:
			cameraText.text.text = "Camera: Top-down";
			break;
		default:
			cameraText.text.text = "Camera: ???";
			break;
		}
	}
}
