import { useState } from 'react';
import CameraFeed from './CameraFeed';
import Instructions from './Instructions';
import Controls from './Controls';
import StartButton from './StartButton';

export default function BoothFrame() {
    const [startSignal, setStartSignal] = useState(0);
  return (
    <div className="booth">
      <div className="top-panel" />
      <CameraFeed startSignal={startSignal} />
      <Controls />
      <Instructions />
      <StartButton onStart={() => setStartSignal(s => s + 1)} />
      <div className="side-note">your photostrip ↓</div>
    </div>
  );
}
