import { useState } from 'react';
import CameraFeed from './CameraFeed';
import Instructions from './Instructions';
import Controls from './Controls';
import StartButton from './StartButton';
import PhotoStrip from './PhotoStrip';

export default function BoothFrame() {
    const [startSignal, setStartSignal] = useState(0);
    const [photos, setPhotos] = useState([]);
    return (
    <div className="booth">
      <div className="top-panel" />
      <CameraFeed
  startSignal={startSignal}
  onPhotosUpdate={setPhotos}
/>
      <Controls />
      <Instructions />
      <StartButton onStart={() => setStartSignal(s => s + 1)} />
      <div className="side-note">your photostrip ↓</div>
      <PhotoStrip photos={photos} />
    </div>
  );
}
