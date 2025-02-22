import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function Aboutus() {
  const faqs = [
    {
      question: 'What is Task Manager App?',
      answer: 'Task Manager App is a powerful tool to help you organize and manage your tasks efficiently.',
    },
    {
      question: 'How do I get started?',
      answer: 'Simply sign up, create tasks, and start managing them with drag-and-drop functionality.',
    },
    {
      question: 'Is it free to use?',
      answer: 'Yes, Task Manager App is completely free to use!',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="p-8 bg-gray-100 min-h-screen"
    >
      <motion.h1 variants={fadeIn} className="text-4xl font-bold text-center mb-8">
        About Us
      </motion.h1>

      <motion.p variants={fadeIn} className="text-lg text-center mb-12">
        Welcome to Task Manager App! We are dedicated to helping you manage your tasks efficiently and
        effectively.
      </motion.p>

      <motion.div variants={stagger} className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="mb-6 p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Aboutus;