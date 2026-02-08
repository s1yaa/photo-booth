import CameraMock from './CameraMock';
import Instructions from './Instructions';
import Controls from './Controls';
import StartButton from './StartButton';

export default function BoothFrame() {
  return (
    <div className="booth">
      <div className="top-panel" />
      <CameraMock />
      <Controls />
      <Instructions />
      <StartButton />
    </div>
  );
}
