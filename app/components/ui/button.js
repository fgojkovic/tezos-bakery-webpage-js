'use client'

import { motion } from 'framer-motion'

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-full transition-all duration-300 flex items-center justify-center space-x-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-tezos-blue to-purple-600 text-white hover:shadow-xl',
    secondary: 'border-2 border-gray-300 text-gray-700 hover:border-tezos-blue hover:text-tezos-blue',
    outline: 'border-2 border-tezos-blue text-tezos-blue hover:bg-tezos-blue hover:text-white'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}