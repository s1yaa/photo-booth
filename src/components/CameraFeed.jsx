import { useEffect, useRef, useState } from 'react';

export default function CameraFeed({ startSignal }) {
  const videoRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

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

  useEffect(() => {
  if (!startSignal) return;

  let count = 3;
  setCountdown(count);

  const interval = setInterval(() => {
    count -= 1;
    if (count === 0) {
      setCountdown(null);
      clearInterval(interval);
    } else {
      setCountdown(count);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [startSignal]);

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
        {countdown && (
  <div className="countdown-overlay">{countdown}</div>
)}
      </div>
    </div>
  );
}
