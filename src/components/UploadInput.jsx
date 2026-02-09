export default function UploadInput({ onUpload }) {
  function handleUpload(e) {
    const files = Array.from(e.target.files);

    if (files.length === 1) {
      alert("Please select multiple photos at once (hold Cmd / Ctrl)");
      e.target.value = "";
      return;
    }

    const limited = files.slice(0, 4);

    const readers = limited.map(
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
        select up to 4 photos at once<br />
        (hold Cmd / Ctrl or Shift)
      </div>
    </div>
  );
}
