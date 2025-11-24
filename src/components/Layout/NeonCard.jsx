import React from 'react'
import { motion } from 'framer-motion'

const NeonCard = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  hover = true,
  ...props 
}) => {
  const glowStyles = {
    blue: 'shadow-cyber-blue/20 hover:shadow-cyber-blue/40',
    pink: 'shadow-cyber-pink/20 hover:shadow-cyber-pink/40',
    purple: 'shadow-cyber-purple/20 hover:shadow-cyber-purple/40',
    green: 'shadow-cyber-green/20 hover:shadow-cyber-green/40'
  }

  const borderStyles = {
    blue: 'border-cyber-blue/30 hover:border-cyber-blue/60',
    pink: 'border-cyber-pink/30 hover:border-cyber-pink/60',
    purple: 'border-cyber-purple/30 hover:border-cyber-purple/60',
    green: 'border-cyber-green/30 hover:border-cyber-green/60'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`
        bg-cyber-card backdrop-blur-lg rounded-xl p-6 transition-all duration-300 border
        ${glowStyles[glowColor]} ${borderStyles[glowColor]}
        ${hover ? 'cursor-pointer hover:shadow-lg' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default NeonCard
