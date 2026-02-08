import { useEffect, useState } from 'react';
import CameraFeed from './CameraFeed';
import Instructions from './Instructions';
import Controls from './Controls';
import StartButton from './StartButton';
import PhotoStrip from './PhotoStrip';
import ResultsScreen from './ResultsScreen';

export default function BoothFrame() {
    const [startSignal, setStartSignal] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [background, setBackground] = useState(0);
    const [isBW, setIsBW] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(false);
    useEffect(() => {
  if (photos.length === 4) {
    setIsSessionActive(false);
  }
}, [photos]);
    return (
    <div className="booth">
      <div className="top-panel" />
      {photos.length < 4 ? (
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
) : (
  <ResultsScreen
    photos={photos}
    background={background}
    setBackground={setBackground}
  />
)}
      <Controls
  isBW={isBW}
  setIsBW={setIsBW}
  isSessionActive={isSessionActive}
/>
      <Instructions />
      <div className="side-note">your photostrip ↓</div>
      <PhotoStrip photos={photos} />
    </div>
  );
}
