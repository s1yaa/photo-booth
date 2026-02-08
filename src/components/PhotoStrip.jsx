export default function PhotoStrip({ photos }) {
  return (
    <div className="photo-strip">
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`shot-${i}`}
          className="strip-photo"
        />
      ))}

      {[...Array(4 - photos.length)].map((_, i) => (
        <div key={`empty-${i}`} className="strip-empty" />
      ))}
    </div>
  );
}
