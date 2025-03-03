import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const PlayerContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`

const MusicButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(new Audio('/music/EmOi-VuCatTuong-4767367.mp3'))

  useEffect(() => {
    audio.loop = true
    return () => {
      audio.pause()
    }
  }, [audio])

  const startMusic = () => {
    audio.play()
    setIsPlaying(true)
  }

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return {
    PlayerContainer,
    toggleMusic,
    startMusic,
    isPlaying
  }
}

export default MusicPlayer 