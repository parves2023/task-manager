import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const TaskManagerSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex w-full h-full flex-col items-center justify-center text-center py-20 rounded-2xl shadow-lg relative overflow-hidden"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/LXbKPTgb/33700071.jpg'), url('https://i.ibb.co.com/TMyBJ2Mn/42518285.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a dark overlay for better text readability
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