export default function Controls({
  isBW,
  setIsBW,
  isSessionActive,
  setMode,
  hasPhotos
}) {
  const uploadDisabled = hasPhotos || isSessionActive;

  return (
    <div className="controls">
      <span
        className={`filter-toggle ${isSessionActive ? "locked" : ""}`}
        onClick={() => {
          if (!isSessionActive) setIsBW(v => !v);
        }}
      >
        {isBW ? "B/W" : "Color"}
      </span>

    </div>
  );
}
