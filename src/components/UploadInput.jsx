export default function UploadInput({ onUpload }) {
  function handleUpload(e) {
    const files = Array.from(e.target.files).slice(0, 4);

    const readers = files.map(
      file =>
        new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then(images => {
      onUpload(images);
    });
  }

  return (
    <div className="upload-wrap">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
      />
      <div className="side-note">
        upload up to 4 photos 📎
      </div>
    </div>
  );
}
