import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

const IntroOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.gradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

const StartButton = styled(motion.button)`
  font-size: 2rem;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary.gradient};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  color: white;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &:hover {
    transform: scale(1.05);
  }
`

const CountdownText = styled(motion.div)`
  font-size: 8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  text-shadow: ${({ theme }) => theme.shadows.glow};
`

const MessageText = styled(motion.div)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text.accent};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const ChatMessage = styled(motion.div)`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: left;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  
  &.me {
    color: ${({ theme }) => theme.colors.primary.main};
    text-align: right;
  }
`

const ChatContainer = styled(motion.div)`
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

interface IntroAnimationProps {
  onComplete: () => void;
  startMusic: () => void;
}

const IntroAnimation = ({ onComplete, startMusic }: IntroAnimationProps) => {
  const [isStarted, setIsStarted] = useState(false)
  const [count, setCount] = useState(5)
  const [showChat, setShowChat] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showLongMessage, setShowLongMessage] = useState(false)
  const [showTomLai, setShowTomLai] = useState(false)
  const [showLove, setShowLove] = useState(false)
  const [chatStep, setChatStep] = useState(0)

  useEffect(() => {
    if (!isStarted) return

    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else if (count === 0) {
      setShowChat(true)
      
      // Hiển thị từng tin nhắn chat
      const chatTimers = [
        setTimeout(() => setChatStep(1), 1000),
        setTimeout(() => setChatStep(2), 3000),
        setTimeout(() => setChatStep(3), 5000),
        setTimeout(() => setChatStep(4), 7000),
        setTimeout(() => setChatStep(5), 9000),
      ]
      
      // Sau khi chat xong, hiển thị các tin nhắn tiếp theo
      const nameTimer = setTimeout(() => {
        setShowChat(false)
        setShowName(true)
      }, 12000)
      
      const longMessageTimer = setTimeout(() => {
        setShowName(false)
        setShowLongMessage(true)
      }, 15000)
      
      const tomLaiTimer = setTimeout(() => {
        setShowLongMessage(false)
        setShowTomLai(true)
      }, 20000)
      
      const loveTimer = setTimeout(() => {
        setShowTomLai(false)
        setShowLove(true)
      }, 22000)
      
      const completeTimer = setTimeout(onComplete, 26000)
      
      return () => {
        chatTimers.forEach(timer => clearTimeout(timer))
        clearTimeout(nameTimer)
        clearTimeout(longMessageTimer)
        clearTimeout(tomLaiTimer)
        clearTimeout(loveTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [count, isStarted, onComplete])

  const handleStart = () => {
    startMusic()
    setIsStarted(true)
  }

  return (
    <AnimatePresence>
      <IntroOverlay>
        {!isStarted ? (
          <StartButton
            onClick={handleStart}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bắt đầu ❤️
          </StartButton>
        ) : (
          <>
            {count > 0 && (
              <CountdownText
                key="countdown"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                {count}
              </CountdownText>
            )}
            
            {showChat && (
              <ChatContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {chatStep >= 1 && (
                  <ChatMessage
                    className="me"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Hi
                  </ChatMessage>
                )}
                {chatStep >= 2 && (
                  <ChatMessage
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Đêm rồi, đi ngủ đi!
                  </ChatMessage>
                )}
                {chatStep >= 3 && (
                  <ChatMessage
                    className="me"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Được người mình siêu thích thích lại mình, không ngủ được!
                  </ChatMessage>
                )}
                {chatStep >= 4 && (
                  <ChatMessage
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Ngủ đi!
                  </ChatMessage>
                )}
                {chatStep >= 5 && (
                  <ChatMessage
                    className="me"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Zzz... Zzz.. Ngủ xong rồi! Chào buổi sáng! :D
                  </ChatMessage>
                )}
              </ChatContainer>
            )}
            
            {showName && (
              <MessageText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Quân Nhi...
              </MessageText>
            )}
            
            {showLongMessage && (
              <MessageText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Anh là anh có rất nhiều điều muốn nói với em đó em có biết không hả?
              </MessageText>
            )}
            
            {showTomLai && (
              <MessageText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Tóm lại...
              </MessageText>
            )}
            
            {showLove && (
              <MessageText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Anh yêu em ❤️
              </MessageText>
            )}
          </>
        )}
      </IntroOverlay>
    </AnimatePresence>
  )
}

export default IntroAnimation 