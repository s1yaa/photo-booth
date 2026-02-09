export default function PhotoStrip({ photos, isBW, emoji }) {
  return (
    <div className="photo-strip">
      {photos.map((photo, index) => (
        <div className="strip-photo" key={index}>
          <img
            src={photo}
            alt={`photo-${index}`}
            style={{
              filter: isBW ? "grayscale(100%)" : "none"
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
