import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function Contact() {
  const position = [51.505, -0.09]; // Default map position (London)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="p-8 bg-gray-100 min-h-screen"
    >
      <motion.h1 variants={fadeIn} className="text-4xl font-bold text-center mb-8">
        Contact Us
      </motion.h1>

      <motion.p variants={fadeIn} className="text-lg text-center mb-12">
        Have questions or feedback? Reach out to us! We'd love to hear from you.
      </motion.p>

      <motion.div variants={stagger} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={fadeIn} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              Email: support@taskmanager.com<br />
              Phone: +1 (123) 456-7890
            </p>
            <p className="text-gray-700">
              Address: 123 Task Manager St, Suite 456, London, UK
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="h-96">
            <MapContainer center={position} zoom={13} className="h-full rounded-lg shadow-md">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>We are here!</Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Contact;