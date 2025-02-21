import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { useState, useEffect } from 'react';

const TaskManagerSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'https://i.ibb.co.com/LXbKPTgb/33700071.jpg',
    'https://i.ibb.co.com/TMyBJ2Mn/42518285.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Switch images every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex w-full h-full flex-col items-center justify-center text-center py-20 rounded-2xl shadow-lg relative overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out', // Smooth transition
      }}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-white">
        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-3"
        >
          Task Manager
        </motion.h1>
        <p className="text-lg font-medium">
          <Typewriter
            options={{
              strings: [
                'Easily organize your tasks.',
                'Stay productive and focused.',
                'Achieve your goals effortlessly.'
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 30,
            }}
          />
        </p>
      </div>
    </motion.div>
  );
};

export default TaskManagerSection;