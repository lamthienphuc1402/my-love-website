import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

interface OutroAnimationProps {
  onComplete: () => void
}

interface Heart {
  id: number
  x: number
  y: number
  size: string
  delay: number
  duration: number
}

interface FloatingHeartProps {
  size?: string;
}

const OutroOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
`

const MessageText = styled(motion.div)`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  max-width: 800px;
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`

const HeartIcon = styled(FaHeart)`
  color: white;
  font-size: 3rem;
  margin: ${({ theme }) => theme.spacing.md};
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
`

const PhotosGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 4px;
  padding: 20px;
  opacity: 0.2;
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(9, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }
`

const PhotoItem = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SlideShowContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SlideShowImage = styled(motion.img)`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`

const FinalHearts = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;
`

const FloatingHeart = styled(motion.div)<FloatingHeartProps>`
  position: absolute;
  color: white;
  font-size: ${props => props.size || '2rem'};
  opacity: 0.7;
`

const ReturnButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.xl};
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 12px 24px;
  }
`

const OutroAnimation = ({ onComplete }: OutroAnimationProps) => {
  const [showMessage1, setShowMessage1] = useState(true)
  const [showMessage2, setShowMessage2] = useState(false)
  const [showMessage3, setShowMessage3] = useState(false)
  const [showMessage4, setShowMessage4] = useState(false)
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hearts, setHearts] = useState<Heart[]>([])
  const slideshowIntervalRef = useRef<number | null>(null)
  const [showReturnButton, setShowReturnButton] = useState(false)
  
  const images = Array.from({ length: 37 }, (_, i) => `/images/${i + 1}.jpg`)

  // Tạo mảng trái tim ngẫu nhiên
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: `${1 + Math.random() * 2}rem`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 7
    }))
    setHearts(newHearts)
  }, [])

  useEffect(() => {
    const message2Timer = setTimeout(() => {
      setShowMessage1(false)
      setShowMessage2(true)
    }, 3000)
    
    const message3Timer = setTimeout(() => {
      setShowMessage2(false)
      setShowMessage3(true)
      setShowSlideshow(true)
      
      // Bắt đầu trình chiếu ảnh
      slideshowIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length)
      }, 250) // Tốc độ 0.25s
    }, 6000)
    
    const message4Timer = setTimeout(() => {
      setShowMessage3(false)
      setShowMessage4(true)
      
      // Dừng trình chiếu và hiển thị grid
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current)
      }
      setShowSlideshow(false)
      setShowGrid(true)
    }, 15000)
    
    // Thay thế completeTimer bằng timer hiển thị nút
    const returnButtonTimer = setTimeout(() => {
      setShowReturnButton(true)
    }, 20000)
    
    return () => {
      clearTimeout(message2Timer)
      clearTimeout(message3Timer)
      clearTimeout(message4Timer)
      clearTimeout(returnButtonTimer)
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current)
      }
    }
  }, [images.length])

  return (
    <AnimatePresence>
      <OutroOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Hiệu ứng trái tim bay */}
        <FinalHearts>
          {hearts.map(heart => (
            <FloatingHeart
              key={heart.id}
              size={heart.size}
              initial={{ 
                x: `${heart.x}vw`, 
                y: `${heart.y}vh`, 
                opacity: 0 
              }}
              animate={{ 
                y: [`${heart.y}vh`, `${heart.y - 20}vh`],
                opacity: [0, 0.7, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ❤️
            </FloatingHeart>
          ))}
        </FinalHearts>
        
        {/* Grid ảnh */}
        {showGrid && (
          <PhotosGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            {images.map((src, index) => (
              <PhotoItem
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.03
                }}
              >
                <Photo src={src} alt={`Kỷ niệm ${index + 1}`} />
              </PhotoItem>
            ))}
          </PhotosGrid>
        )}
        
        {/* Trình chiếu ảnh */}
        {showSlideshow && (
          <SlideShowContainer>
            <SlideShowImage
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Kỷ niệm ${currentImageIndex + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </SlideShowContainer>
        )}

        <AnimatePresence mode="wait">
          {showMessage1 && (
            <MessageText
              key="message1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              Cảm ơn vợ!
            </MessageText>
          )}
          
          {showMessage2 && (
            <MessageText
              key="message2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              Anh yêu vợ! <HeartIcon />
            </MessageText>
          )}
          
          {showMessage3 && (
            <MessageText
              key="message3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              Hãy đồng hành cùng nhau mãi nhé...
            </MessageText>
          )}
          
          {showMessage4 && (
            <MessageText
              key="message4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              Cưng em nhất! <HeartIcon />
            </MessageText>
          )}
        </AnimatePresence>

        {showReturnButton && (
          <ReturnButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onComplete}
          >
            Coi kỹ lại hong? 💕
          </ReturnButton>
        )}
      </OutroOverlay>
    </AnimatePresence>
  )
}

export default OutroAnimation 