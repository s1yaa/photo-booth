import PhotoStrip from './PhotoStrip';
const STRIP_WIDTH = 300;
const PHOTO_HEIGHT = 220;
const GAP = 12;
const PADDING = 20;

const STRIP_HEIGHT =
  PADDING * 2 + PHOTO_HEIGHT * 4 + GAP * 3;

export default function ResultsScreen({ photos, background, setBackground }) {
  function downloadStrip() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = STRIP_WIDTH;
  canvas.height = STRIP_HEIGHT;

  // background
  ctx.fillStyle = getBackgroundColor(background);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const loadImages = photos.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // 🔑 REQUIRED
      img.src = src;
      img.onload = () => resolve(img);
    });
  });

  Promise.all(loadImages).then(images => {
    images.forEach((img, i) => {
      const y = PADDING + i * (PHOTO_HEIGHT + GAP);

      ctx.drawImage(
        img,
        PADDING,
        y,
        STRIP_WIDTH - PADDING * 2,
        PHOTO_HEIGHT
      );
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'photostrip.png';

    // 🔑 SAFARI + CHROME REQUIRE THIS
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

    return (
    <div className={`results paper-${background}`}>
      <div className="strip-wrapper">
        <PhotoStrip photos={photos} />
      </div>

      <div className="results-notes">
        <div className="note">your photostrip ↓</div>
        <div className="note">cut here ✂️</div>
      </div>

      <div className="bg-picker">
        <span onClick={() => setBackground(0)}>paper</span>
        <span onClick={() => setBackground(1)}>cream</span>
        <span onClick={() => setBackground(2)}>pink</span>
        <span onClick={() => setBackground(3)}>night</span>
      </div>
      <div className="actions">
  <button onClick={downloadStrip}>
    download ↓
  </button>
</div>
    </div>
  );
}

function getBackgroundColor(bg) {
  switch (bg) {
    case 1:
      return '#f6f1e9';
    case 2:
      return '#fdebed';
    case 3:
      return '#000000';
    default:
      return '#fafafa';
  }
}

