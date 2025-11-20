import React from 'react'
import { motion } from 'framer-motion'

const NeonButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyber-blue to-cyber-pink text-white shadow-lg hover:shadow-cyber-blue/50',
    secondary: 'bg-cyber-card border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue/60',
    danger: 'bg-gradient-to-r from-cyber-pink to-cyber-purple text-white shadow-lg hover:shadow-cyber-pink/50'
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default NeonButton
