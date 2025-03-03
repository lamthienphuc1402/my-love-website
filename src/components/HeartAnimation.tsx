import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const HeartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`

const Heart = styled(motion.div)`
  position: absolute;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  user-select: none;
`

const HeartAnimation = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(hearts => [
        ...hearts,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth
        }
      ].slice(-15)) // Giới hạn số lượng tim đồng thời
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <HeartContainer>
      <AnimatePresence>
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            initial={{ 
              y: -20, 
              x: heart.x, 
              opacity: 1, 
              scale: 1 
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 6,
              ease: "linear",
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                repeat: Infinity,
                duration: 2
              }
            }}
          >
            ❤️
          </Heart>
        ))}
      </AnimatePresence>
    </HeartContainer>
  )
}

export default HeartAnimation 