export default function Controls({ isBW, setIsBW, isSessionActive }) {
  return (
    <div className="controls">
      <span
        className={`filter-toggle ${isSessionActive ? 'locked' : ''}`}
        onClick={() => {
          if (!isSessionActive) {
            setIsBW(bw => !bw);
          }
        }}
      >
        {isBW ? 'b&w' : 'color'} ↔
      </span>

      <span className="price">$0 · 4 pics</span>
    </div>
  );
}
