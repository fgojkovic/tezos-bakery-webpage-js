'use client'

import { motion } from 'framer-motion'

export const Card = ({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-lg transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}