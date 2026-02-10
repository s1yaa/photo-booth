import PhotoStrip from './PhotoStrip';
import { useState } from "react";
const STRIP_WIDTH = 300;
const PHOTO_HEIGHT = 220;
const GAP = 12;
const PADDING = 20;

const STRIP_HEIGHT =
  PADDING * 2 + PHOTO_HEIGHT * 4 + GAP * 3;

export default function ResultsScreen({
  photos,
  background,
  setBackground,
  onRetake,
  isBW,
  caption,
  setCaption
}) {
  const [emoji, setEmoji] = useState(null);
  const EMOJI_OPTIONS = [
  "💗", "🎀", "✨", "🌷", "💅",
  "🫶", "🦋", "🍒", "🍓", "💋",
  "⭐", "🥳", "🩷", "😎", "🔥",
  "💄", "🪩", "😝", "☁️", "🧸"
];

  function downloadStrip() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = STRIP_WIDTH;
  canvas.height = STRIP_HEIGHT;

  // background
  ctx.fillStyle = getBackgroundColor(background);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const loadImages = photos.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
    });
  });

  Promise.all(loadImages).then(images => {
    images.forEach((img, i) => {
      const y =
  PADDING + i * (PHOTO_HEIGHT + GAP);
      const jitterX = Math.random() * 4 - 2;
const jitterY = Math.random() * 4 - 2;

      // BW applied at export time
      ctx.filter = isBW ? "grayscale(100%)" : "none";

      ctx.save();

      ctx.drawImage(
        img,
        PADDING,
        y + jitterX,
        STRIP_WIDTH - PADDING * 2,
        PHOTO_HEIGHT
      );

      ctx.restore();

      if (emoji) {
  ctx.font = "28px 'Apple Color Emoji'";
  ctx.textAlign = "center";

  // top-right emoji for THIS photo
  ctx.save();
  ctx.translate(
    STRIP_WIDTH - PADDING - 16,
    y + 28
  );
  ctx.rotate(-0.25);
  ctx.fillText(emoji, 0, 0);
  ctx.restore();

  // bottom-left emoji for THIS photo
  ctx.save();
  ctx.translate(
    PADDING + 16,
    y + PHOTO_HEIGHT - 12
  );
  ctx.rotate(0.25);
  ctx.fillText(emoji, 0, 0);
  ctx.restore();
}


      // optional frame around each photo
      ctx.filter = "none";
      ctx.strokeStyle = background === 3 ? "#fff" : "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        PADDING,
        y,
        STRIP_WIDTH - PADDING * 2,
        PHOTO_HEIGHT
      );
    });

    ctx.font = "16px 'Gloria Hallelujah'";
ctx.fillStyle = background === 3 ? "#fff" : "#000";

ctx.save();
ctx.translate(STRIP_WIDTH / 2, STRIP_HEIGHT - 30);
ctx.rotate(-0.05);
ctx.textAlign = "center";

const date = new Date().toLocaleDateString();
ctx.fillText(`${caption || "photobooth"} · ${date}`, 0, 0);

ctx.restore();

    // download (ONLY ONCE)
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "photostrip.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

    return (
    <div className={`results paper-${background}`}>

      <div className="results-notes">
        <div className="note">your photostrip ↓</div>
        <div className="note">cut here ✂️</div>
      </div>

      <div className="strip-wrapper">
        <PhotoStrip photos={photos} isBW={isBW} emoji={emoji}/>
      </div>

      <input
  value={caption}
  onChange={(e) => setCaption(e.target.value)}
  placeholder="write something cute…"
  className="caption-input"
/>

<div className="emoji-picker">
  {EMOJI_OPTIONS.map((e, i) => (
    <span
      key={i}
      className={`emoji-choice ${emoji === e ? "active" : ""}`}
      onClick={() => setEmoji(e)}
    >
      {e}
    </span>
  ))}
</div>

      <div className="bg-picker">
  <span onClick={() => setBackground(0)}>paper</span>
  <span onClick={() => setBackground(1)}>cream</span>
  <span onClick={() => setBackground(2)}>pink</span>
  <span onClick={() => setBackground(3)}>night</span>
  <span onClick={() => setBackground(4)}>mint</span>
  <span onClick={() => setBackground(5)}>lavender</span>
  <span onClick={() => setBackground(6)}>red</span>
  <span onClick={() => setBackground(7)}>navy</span>
  <span onClick={() => setBackground(8)}>charcoal</span>
  <span onClick={() => setBackground(9)}>plum</span>
</div>

      <div className="actions">
  <button onClick={downloadStrip}>
    download ↓
  </button>
  <button onClick={onRetake}>↺ oops, retake strip
</button>
</div>
    </div>
  );
}

function getBackgroundColor(bg) {
  switch (bg) {
    case 1: return "#f6f1e9"; // cream
    case 2: return "#fdebed"; // pink
    case 3: return "#000000"; // night
    case 4: return "#e8f5e9"; // mint
    case 5: return "#f3e5f5"; // lavender

    /* NEW DARK COLORS */
    case 6: return "#8b1e1e"; // deep red
    case 7: return "#1e1e2f"; // navy
    case 8: return "#2f2f2f"; // charcoal
    case 9: return "#3b1f3b"; // plum

    default: return "#fafafa";
  }
}

