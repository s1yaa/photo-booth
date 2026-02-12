function getCssFilter(mode) {
  switch (mode) {
    case "bw":
      return "grayscale(100%)";

    case "warm":
      return "brightness(1.05) sepia(0.25) saturate(1.2)";

    case "vintage":
      return "sepia(0.4) contrast(0.9) brightness(1.05) saturate(0.85)";

    default:
      return "none";
  }
}

export default function PhotoStrip({ photos, filterMode, emoji }) {
  return (
    <div className="photo-strip">
      {photos.map((photo, index) => (
        <div className="strip-photo" key={index}>
          <img
            src={photo}
            alt={`photo-${index}`}
            style={{
              filter: getCssFilter(filterMode),
            }}
          />
          {emoji && (
            <>
              <span className="emoji emoji-top">{emoji}</span>
              <span className="emoji emoji-bottom">{emoji}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
