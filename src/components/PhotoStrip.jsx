export default function PhotoStrip({ photos, isBW }) {
  return (
    <div className="photo-strip">
      {photos.map((photo, i) => (
        <img
          key={i}
          src={photo}
          className="strip-photo"
          style={{
            filter: isBW ? "grayscale(100%)" : "none",
          }}
        />
      ))}
    </div>
  );
}
