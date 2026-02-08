import CameraFeed from './CameraFeed';
import Instructions from './Instructions';
import Controls from './Controls';
import StartButton from './StartButton';

export default function BoothFrame() {
  return (
    <div className="booth">
      <div className="top-panel" />
      <CameraFeed />
      <Controls />
      <Instructions />
      <StartButton />
      <div className="side-note">your photostrip ↓</div>
    </div>
  );
}
