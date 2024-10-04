import React, { useState, useRef } from 'react';
import { jsPDF } from "jspdf";

const ChordImageGenerator = () => {
  const [chordInput, setChordInput] = useState('');
  const [chordImages, setChordImages] = useState([]);
  const [chords, setChords] = useState([]);
  const containerRef = useRef(null);

  const handleInputChange = (e) => {
    setChordInput(e.target.value);
  };

  const generateChordImages = () => {
    const chords = chordInput.split(',').map(chord => chord.trim().toUpperCase());
    const images = chords.map(chord => {
      try {
        return `/chords/${chord}.jpg`;
      } catch (error) {
        console.error(`Chord image not found for ${chord}`);
        return null;
      }
    }).filter(Boolean);
    setChordImages(images);
  };

  const exportToPDF = async () => {
    const pdf = new jsPDF();
    const container = containerRef.current;
    const images = container.getElementsByTagName('img');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imageSize = (pageWidth - margin * 6) / 5; // 5 images per row
    const imagesPerPage = 15; // 3 rows of 5 images each

    for (let i = 0; i < images.length; i++) {
      if (i > 0 && i % imagesPerPage === 0) {
        pdf.addPage();
      }

      const img = images[i];
      const imgData = await fetch(img.src).then(r => r.blob()).then(blob => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      });

      const row = Math.floor((i % imagesPerPage) / 5);
      const col = i % 5;

      const x = margin + col * (imageSize + margin);
      const y = margin + row * (imageSize + margin);

      // Calculate scaling to fit within the allocated space while maintaining aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const aspectRatio = imgProps.width / imgProps.height;
      let imgWidth = imageSize;
      let imgHeight = imageSize;

      if (aspectRatio > 1) {
        imgHeight = imgWidth / aspectRatio;
      } else {
        imgWidth = imgHeight * aspectRatio;
      }

      // Center the image in its allocated space
      const xOffset = (imageSize - imgWidth) / 2;
      const yOffset = (imageSize - imgHeight) / 2;

      pdf.addImage(imgData, 'JPEG', x + xOffset, y + yOffset, imgWidth, imgHeight, undefined, 'FAST');

      // Add chord name below the image
      const chordName = img.alt.replace('Chord ', '');
      pdf.setFontSize(10);
      pdf.text(chordName, x + imageSize / 2, y + imageSize + 5, { align: 'center' });
    }

    pdf.save("chord-diagrams.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          Chord Image Generator
        </h1>
        
        <p className="text-lg text-center mb-8 text-gray-600">
          Enter chord codes separated by commas (e.g., C, Am, G7) in the input below and click "Generate" to see chord diagrams.
        </p>
        
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="text"
            value={chordInput}
            onChange={handleInputChange}
            placeholder="Enter chords (e.g., C, Am, G7)"
            className="flex-grow px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          />
          <button
            onClick={generateChordImages}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Generate
          </button>
        </div>
        
        <div ref={containerRef} className="mt-8 flex flex-wrap justify-center gap-4">
          {chordImages.length > 0 ? (
            chordImages.map((src, index) => (
              <img key={index} src={src} alt={`Chord ${index + 1}`} className="w-32 h-32 object-contain" />
            ))
          ) : (
            <p className="text-gray-600">Enter chords and click "Generate" to see diagrams</p>
          )}
        </div>

        {chordImages.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={exportToPDF}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Export to PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChordImageGenerator;
