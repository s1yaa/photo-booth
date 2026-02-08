import React, { useState, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import PhotoBooth from './components/PhotoBooth';
import { UploadPhotos, PhotoStrip, BackgroundSelector } from './components/UploadPhotos';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState('bg1');
  const [flash, setFlash] = useState(false);
  const stripRef = useRef(null);

  const handleUpload = (uploadedPhotos) => {
    setPhotos(uploadedPhotos);
  };

  const handlePhotoCapture = (capturedPhotos) => {
    setPhotos(capturedPhotos);
    triggerFlash();
  };

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  const downloadStrip = async () => {
    if (stripRef.current) {
      const canvas = await html2canvas(stripRef.current, { backgroundColor: null });
      const link = document.createElement('a');
      link.download = 'photostrip.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#C0C0C0] flex items-center justify-center font-["Press_Start_2P"] relative">
      {/* Flash Overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      <div className="bg-[#E0E0E0] p-4 rounded-lg shadow-[4px_4px_0px_0px_black] w-[600px] h-[750px] border-4 border-black flex flex-col relative">
        {/* Header */}
        <div className="bg-[#808080] px-2 py-1 rounded-t border-b-4 border-black flex justify-between items-center shadow-[2px_2px_0px_0px_black]">
          <span className="text-black">Retro Photobooth</span>
          <div className="space-x-2 flex">
            <button className="w-4 h-4 bg-red-500 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_black] hover:brightness-110"></button>
            <button className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_black] hover:brightness-110"></button>
            <button className="w-4 h-4 bg-green-500 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_black] hover:brightness-110"></button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col mt-4 gap-4">
          <PhotoBooth onCapture={handlePhotoCapture} />

          <div ref={stripRef} className="p-1 bg-[#B0B0B0] border-4 border-black shadow-[3px_3px_0px_0px_black]">
            <PhotoStrip photos={photos} background={selectedBackground} />
          </div>

          <BackgroundSelector selectedBackground={selectedBackground} onSelect={setSelectedBackground} />
        </div>

        {/* Footer / Actions */}
        <div className="mt-4 flex justify-between items-center">
          <UploadPhotos onUpload={handleUpload} />
          <button onClick={downloadStrip} className="px-4 py-2 border-4 border-black rounded bg-[#D0D0D0] shadow-[2px_2px_0px_0px_black] hover:bg-[#C0C0C0] hover:shadow-[1px_1px_0px_0px_black]">
            Download Strip
          </button>
          {/* Tamagotchi Mascot */}
          <motion.img 
            src="./assets/icons/tamagotchi.png" 
            alt="mascot" 
            className="w-12 h-12 shadow-[2px_2px_0px_0px_black]" 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
