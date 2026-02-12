export default function StartButton({ onStart }) {
  return (
    <div className="start-wrap">
      <div className="start-button" onClick={onStart} />
      <div className="start-label">press</div>
    </div>
  );
}
