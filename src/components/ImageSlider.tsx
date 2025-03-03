import React, { useState, useEffect, useRef, useCallback } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { motion, AnimatePresence } from 'framer-motion'
import { FaExpand, FaTimes, FaPlay, FaPause, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background.glass};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
  position: relative;

  .slick-slider {
    width: 100%;
    margin: 0 auto;
  }

  .slick-dots {
    bottom: 20px;
    
    li button:before {
      color: white;
      opacity: 0.5;
      font-size: 8px;
    }

    li.slick-active button:before {
      color: ${({ theme }) => theme.colors.primary.main};
      opacity: 1;
    }
  }

  .slick-prev, .slick-next {
    width: 50px;
    height: 50px;
    z-index: 1;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      transform: scale(1.1);
    }

    &:before {
      color: ${({ theme }) => theme.colors.primary.main};
      font-size: 24px;
      opacity: 1;
    }
  }

  .slick-prev {
    left: 20px;
  }

  .slick-next {
    right: 20px;
  }

  .slick-slide {
    div {
      outline: none;
    }
  }

  .slick-list {
    margin: 0 -${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    max-width: 95%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 90%;
    padding: ${({ theme }) => theme.spacing.sm};
    
    .slick-prev, .slick-next {
      width: 40px;
      height: 40px;
      
      &:before {
        font-size: 20px;
      }
    }
  }
`

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  
  &:hover .expand-icon {
    opacity: 1;
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: block;
  transition: transform 0.3s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.03);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 350px;
  }
`

const ExpandIcon = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.primary.main};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`

const FullscreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const FullscreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`

const ImageCounter = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`

// Thêm nút trình chiếu
const SlideshowButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 12px;
  }
`

// Thêm component cho chế độ trình chiếu
const SlideshowOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SlideshowImage = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
`

const SlideshowControls = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
`

const SlideshowButton2 = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }
`

const SlideshowCounter = styled.div`
  color: white;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
  min-width: 80px;
  text-align: center;
`

const ImageSlider = () => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [slideshowMode, setSlideshowMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const sliderRef = useRef<Slider>(null)
  const intervalRef = useRef<number | null>(null)
  
  const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.jpg',
    '/images/12.jpg',
    '/images/13.jpg',
    '/images/14.jpg',
    '/images/15.jpg',
    '/images/16.jpg',
    '/images/17.jpg',
    '/images/18.jpg',
    '/images/19.jpg',
    '/images/20.jpg',
    '/images/21.jpg',
    '/images/22.jpg',
    '/images/23.jpg',
    '/images/24.jpg',
    '/images/25.jpg',
    '/images/26.jpg',
    '/images/27.jpg',
    '/images/28.jpg',
    '/images/29.jpg',
    '/images/30.jpg',
    '/images/31.jpg',
    '/images/32.jpg',
    '/images/33.jpg',
    '/images/34.jpg',
    '/images/35.jpg',
    '/images/36.jpg',
    '/images/37.jpg',
  ]
  
  // Hàm để xóa interval hiện tại
  const clearSlideshowInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])
  
  // Hàm để bắt đầu interval mới
  const startSlideshowInterval = useCallback(() => {
    // Đảm bảo xóa interval cũ trước khi tạo mới
    clearSlideshowInterval()
    
    if (slideshowMode && isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length)
      }, 3000)
    }
  }, [slideshowMode, isPlaying, clearSlideshowInterval, images.length])
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
    lazyLoad: "progressive" as const,
    beforeChange: (_: any, next: number) => setCurrentImageIndex(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplaySpeed: 3000
        }
      }
    ],
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "10px" }}>
        <SlideshowCounter>
          {currentImageIndex + 1}/{images.length}
        </SlideshowCounter>
      </div>
    )
  }

  // Preload images
  useEffect(() => {
    // Preload a few images for smoother experience
    const preloadImages = images.slice(0, 5).map(src => {
      const img = new Image()
      img.src = src
      return img
    })
    
    Promise.all(preloadImages.map(img => {
      return new Promise(resolve => {
        img.onload = resolve
        img.onerror = resolve
      })
    })).then(() => {
      setLoaded(true)
    })
  }, [])

  // Quản lý interval cho chế độ trình chiếu
  useEffect(() => {
    startSlideshowInterval()
    
    // Cleanup khi component unmount hoặc dependencies thay đổi
    return clearSlideshowInterval
  }, [slideshowMode, isPlaying, startSlideshowInterval, clearSlideshowInterval])

  // Xử lý phím trong chế độ trình chiếu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!slideshowMode) return
      
      switch (e.key) {
        case 'Escape':
          closeSlideshowMode()
          break
        case 'ArrowRight':
          handleNextSlide()
          break
        case 'ArrowLeft':
          handlePrevSlide()
          break
        case ' ':
          handleTogglePlay()
          e.preventDefault()
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slideshowMode])

  const openFullscreen = (src: string) => {
    setFullscreenImage(src)
    document.body.style.overflow = 'hidden'
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
    document.body.style.overflow = 'auto'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeFullscreen()
    }
  }

  // Cải thiện các hàm xử lý cho chế độ trình chiếu
  const startSlideshowMode = () => {
    setSlideshowMode(true)
    setIsPlaying(true)
    document.body.style.overflow = 'hidden'
  }
  
  const closeSlideshowMode = () => {
    setSlideshowMode(false)
    setIsPlaying(false)
    clearSlideshowInterval()
    document.body.style.overflow = 'auto'
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentImageIndex)
    }
  }
  
  const handleTogglePlay = () => {
    setIsPlaying(prev => !prev)
  }
  
  const handleNextSlide = () => {
    // Xóa interval hiện tại để tránh xung đột
    clearSlideshowInterval()
    setCurrentImageIndex(prev => (prev + 1) % images.length)
    
    // Nếu đang ở chế độ play, tạo interval mới sau khi chuyển ảnh
    if (isPlaying) {
      // Sử dụng setTimeout để tránh việc chuyển ảnh liên tiếp quá nhanh
      setTimeout(startSlideshowInterval, 50)
    }
  }
  
  const handlePrevSlide = () => {
    // Xóa interval hiện tại để tránh xung đột
    clearSlideshowInterval()
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
    
    // Nếu đang ở chế độ play, tạo interval mới sau khi chuyển ảnh
    if (isPlaying) {
      // Sử dụng setTimeout để tránh việc chuyển ảnh liên tiếp quá nhanh
      setTimeout(startSlideshowInterval, 50)
    }
  }

  return (
    <>
      <SliderWrapper>
        {loaded ? (
          <>
            <Slider ref={sliderRef} {...settings}>
              {images.map((url, index) => (
                <div key={index}>
                  <ImageContainer onClick={() => openFullscreen(url)}>
                    <StyledImage 
                      src={url}
                      alt={`Kỷ niệm ${index + 1}`}
                      onError={(e) => {
                        console.error(`Error loading image ${index}:`, e)
                        e.currentTarget.src = 'https://via.placeholder.com/800x500/FF69B4/FFFFFF?text=Ảnh+lỗi'
                      }}
                    />
                    <ExpandIcon className="expand-icon">
                      <FaExpand />
                    </ExpandIcon>
                  </ImageContainer>
                </div>
              ))}
            </Slider>
            <SlideshowButton onClick={startSlideshowMode}>
              <FaPlay /> Trình chiếu
            </SlideshowButton>
          </>
        ) : (
          <StyledImage 
            src={images[0]}
            alt="Loading..."
            style={{ filter: 'blur(5px)' }}
          />
        )}
      </SliderWrapper>

      {fullscreenImage && (
        <FullscreenOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeFullscreen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <FullscreenImage 
            src={fullscreenImage} 
            alt="Fullscreen view"
            onClick={(e) => e.stopPropagation()}
          />
          <CloseButton onClick={closeFullscreen}>
            <FaTimes size={24} />
          </CloseButton>
          <ImageCounter>
            {currentImageIndex + 1} / {images.length}
          </ImageCounter>
        </FullscreenOverlay>
      )}

      {/* Chế độ trình chiếu */}
      {slideshowMode && (
        <SlideshowOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SlideshowImage 
            src={images[currentImageIndex]} 
            alt={`Kỷ niệm ${currentImageIndex + 1}`}
          />
          <SlideshowControls>
            <SlideshowButton2 onClick={handlePrevSlide}>
              <FaArrowLeft size={20} />
            </SlideshowButton2>
            
            <SlideshowButton2 onClick={handleTogglePlay}>
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </SlideshowButton2>
            
            <SlideshowButton2 onClick={handleNextSlide}>
              <FaArrowRight size={20} />
            </SlideshowButton2>
            
            <SlideshowCounter>
              {currentImageIndex + 1}/{images.length}
            </SlideshowCounter>
            
            <SlideshowButton2 onClick={closeSlideshowMode}>
              <FaTimes size={20} />
            </SlideshowButton2>
          </SlideshowControls>
        </SlideshowOverlay>
      )}
    </>
  )
}

export default ImageSlider 