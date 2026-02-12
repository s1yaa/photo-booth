import { useEffect, useState } from "react";
import CameraFeed from "./CameraFeed";
import Instructions from "./Instructions";
import StartButton from "./StartButton";
import PhotoStrip from "./PhotoStrip";
import ResultsScreen from "./ResultsScreen";
import UploadInput from "./UploadInput";

export default function BoothFrame() {
  const [startSignal, setStartSignal] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [background, setBackground] = useState(0);
  const [filterMode, setFilterMode] = useState("color");
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [mode, setMode] = useState("camera"); // camera | upload | result
  const [caption, setCaption] = useState("");
  const [emoji, setEmoji] = useState("");

  function handleRetake() {
    setPhotos([]);
    setIsSessionActive(false);
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

      {/* CAMERA MODE */}
      {mode === "camera" && photos.length < 4 && (
        <>
          <CameraFeed
            startSignal={startSignal}
            onPhotosUpdate={setPhotos}
            filterMode={filterMode}
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
  filterMode={filterMode}
  setFilterMode={setFilterMode}
  caption={caption}
  setCaption={setCaption}
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

      <Instructions />

      {photos.length > 0 && mode !== "result" && (
  <>
    <div className="side-note">your photostrip ↓</div>
    <PhotoStrip photos={photos}  filterMode={filterMode} emoji={emoji} />
  </>
)}
    </div>
  );
}
