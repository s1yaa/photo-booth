import { useEffect, useState } from "react";
import CameraFeed from "./CameraFeed";
import Instructions from "./Instructions";
import Controls from "./Controls";
import StartButton from "./StartButton";
import PhotoStrip from "./PhotoStrip";
import ResultsScreen from "./ResultsScreen";
import UploadInput from "./UploadInput";

export default function BoothFrame() {
  const [startSignal, setStartSignal] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [background, setBackground] = useState(0);
  const [isBW, setIsBW] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [mode, setMode] = useState("camera"); // camera | upload | result

  function handleRetake() {
    setPhotos([]);
    setIsSessionActive(false);
    setIsBW(false);
    setBackground(0);
    setMode("camera");
  }

  // move to results when 4 photos ready
  useEffect(() => {
    if (photos.length === 4) {
      setIsSessionActive(false);
      setMode("result");
    }
  }, [photos]);

  return (
    <div className="booth">
      <div className="top-panel" />

      {/* CAMERA MODE */}
      {mode === "camera" && photos.length < 4 && (
        <>
          <CameraFeed
            startSignal={startSignal}
            onPhotosUpdate={setPhotos}
            isBW={isBW}
          />

          <StartButton
            onStart={() => {
              setIsSessionActive(true);
              setStartSignal(s => s + 1);
            }}
          />
        </>
      )}

      {/* UPLOAD MODE */}
      {mode === "upload" && photos.length < 4 && (
        <UploadInput
          onUpload={(images) => setPhotos(images)}
          disabled={isSessionActive}
        />
      )}

      {mode === "result" && (
  <ResultsScreen
    photos={photos}
    background={background}
    setBackground={setBackground}
    onRetake={handleRetake}
    isBW={isBW}
  />
)}

      {/* MODE TOGGLE */}
      {photos.length === 0 && (
        <div className="mode-toggle">
          {mode === "camera" ? (
            <button onClick={() => setMode("upload")}>
              Upload instead
            </button>
          ) : (
            <button onClick={() => setMode("camera")}>
              Back to camera
            </button>
          )}
        </div>
      )}

      <Controls
        isBW={isBW}
        setIsBW={setIsBW}
        isSessionActive={isSessionActive}
        hasPhotos={photos.length > 0}
      />

      <Instructions />

      {photos.length > 0 && mode !== "result" && (
  <>
    <div className="side-note">your photostrip ↓</div>
    <PhotoStrip photos={photos} isBW={isBW} />
  </>
)}
    </div>
  );
}
