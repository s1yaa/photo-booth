import { useEffect, useRef } from 'react';

export default function CameraFeed() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Camera access denied', err);
      }
    }

    startCamera();
  }, []);

  return (
    <div className="camera-wrap">
      <span className="eye-level">eye level →</span>

      <div className="green-light" />

      <div className="camera-frame">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-video"
        />
      </div>
    </div>
  );
}
