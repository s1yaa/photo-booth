import { useEffect, useRef, useState } from 'react';

export default function CameraFeed({ startSignal, onPhotosUpdate, isBW }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);

  function capturePhoto() {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (isBW) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // classic grayscale formula
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  const imageData = canvas.toDataURL('image/png');
  setPhotos(prev => [...prev, imageData]);
}

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

  let shot = 0;
  let count = 3;

  setCountdown(count);

  const interval = setInterval(() => {
    count -= 1;

    if (count === 0) {
      capturePhoto();
      shot += 1;

      if (shot === 4) {
        setCountdown(null);
        clearInterval(interval);
        return;
      }

      count = 3;
      setCountdown(count);
    } else {
      setCountdown(count);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [startSignal]);

useEffect(() => {
  onPhotosUpdate?.(photos);
}, [photos]);

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
  style={{
    filter: isBW ? 'grayscale(100%)' : 'none',
  }}
/>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {countdown && (
  <div className="countdown-overlay">{countdown}</div>
)}
      </div>
    </div>
  );
}
