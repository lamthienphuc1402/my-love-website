import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { MusicPlayer, ImageSlider, LoveStory, HeartAnimation, DaysCounter, IntroAnimation } from './components'
import OutroAnimation from './components/OutroAnimation'
import { FaChevronDown, FaHeart, FaHeart as FaHeartIcon } from 'react-icons/fa'

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.gradient};
  overflow-x: hidden;
`

const Section = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`

const ContentContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 100);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 192, 203, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
    z-index: -1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
    width: 95%;
  }
`

const HeaderSection = styled(Section)`
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, rgba(255, 192, 203, 0.3) 0%, rgba(255, 182, 193, 0.2) 100%);
  box-shadow: inset 0 0 100px rgba(255, 105, 180, 0.1);
  justify-content: center;
  align-items: center;
`

const Title = styled(motion.h1)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.accent};
  font-size: 4.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(255, 105, 180, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const NameText = styled.span`
  white-space: nowrap;
`

const HeartIcon = styled(FaHeart)`
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 10px 0;
  filter: drop-shadow(0 0 5px rgba(255, 105, 180, 0.5));
  font-size: 2.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin: 5px 0;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 700px;
  line-height: 1.8;
  padding: 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-weight: 500;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const CounterWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.25);
  backdrop-filter: blur(10px);
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 450px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 182, 193, 0.15) 0%,
      rgba(255, 105, 180, 0.05) 30%,
      transparent 70%
    );
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const CounterNumber = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  text-align: center;
  line-height: 1;
  margin-bottom: 5px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 3.5rem;
  }
`

const CounterLabel = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  font-weight: 500;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`

const NavigationDots = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 10px;
  }
`

const NavDot = styled.div<{ $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.5)'};
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ $active, theme }) => 
      $active ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.8)'};
    transform: scale(1.2);
  }
`

const SliderSection = styled(Section)`
  background: ${({ theme }) => theme.colors.background.glass};
  backdrop-filter: blur(10px);
  position: relative;
  
  h2 {
    text-align: center;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.5rem;
    }
  }
`

const ImageDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  max-width: 600px;
  margin: ${({ theme }) => theme.spacing.lg} auto;
  line-height: 1.6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`

const StorySection = styled(Section)`
  padding: 0;
  min-height: auto;
`

const ScrollDownButton = styled(motion.button)`
  position: relative;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4b8b 100%);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 6px 25px rgba(255, 105, 180, 0.5);
  transition: all 0.3s ease;
  z-index: 10;
  width: 240px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.7);
    background: linear-gradient(135deg, #ff4b8b 0%, #ff2d7a 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 1.3rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 14px 28px;
    font-size: 1.1rem;
    width: 220px;
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`

const EndButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4b8b 100%);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 6px 25px rgba(255, 105, 180, 0.5);
  transition: all 0.3s ease;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  width: 240px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.7);
    background: linear-gradient(135deg, #ff4b8b 0%, #ff2d7a 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 1.3rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 14px 28px;
    font-size: 1.1rem;
    width: 220px;
  }
`

const CustomDaysCounter = ({ startDate }: { startDate: string }) => {
  const [days, setDays] = useState(0)
  
  useEffect(() => {
    const calculateDays = () => {
      const start = new Date(startDate)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDays(diffDays)
    }
    
    calculateDays()
    const timer = setInterval(calculateDays, 1000 * 60 * 60) // Update every hour
    
    return () => clearInterval(timer)
  }, [startDate])
  
  return (
    <div>
      <CounterNumber>{days}</CounterNumber>
      <CounterLabel>ngày bên nhau</CounterLabel>
    </div>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [showOutro, setShowOutro] = useState(false)
  const { startMusic } = MusicPlayer()
  const [activeSection, setActiveSection] = useState(0)
  const sections = ['header', 'gallery', 'story']

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(index)
    }
  }

  useEffect(() => {
    // iOS meta tags
    const metaTags = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'theme-color', content: '#FFF5F8' }
    ]
    
    metaTags.forEach(tag => {
      const meta = document.createElement('meta')
      meta.name = tag.name
      meta.content = tag.content
      document.head.appendChild(meta)
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(id => document.getElementById(id))
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sectionElements.forEach((element, index) => {
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (showIntro) {
    return (
      <IntroAnimation 
        onComplete={() => setShowIntro(false)}
        startMusic={startMusic}
      />
    )
  }

  if (showOutro) {
    return (
      <OutroAnimation 
        onComplete={() => setShowOutro(false)}
      />
    )
  }

  return (
    <AppContainer>
      <NavigationDots>
        {sections.map((_, index) => (
          <NavDot
            key={index}
            $active={activeSection === index}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </NavigationDots>

      <HeaderSection
        id="header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ContentContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Title
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Thiên Phúc
            <HeartIcon />
            Quân Nhi
          </Title>
          
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Mỗi ngày bên em là một ngày tràn đầy hạnh phúc và yêu thương
          </Subtitle>
          
          <CounterWrapper
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <CustomDaysCounter startDate="2024-09-29" />
          </CounterWrapper>
          
          <ScrollDownButton
            onClick={() => scrollToSection(1)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            XEM KỶ NIỆM <FaChevronDown />
          </ScrollDownButton>
        </ContentContainer>
      </HeaderSection>

      <SliderSection
        id="gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2>Những khoảnh khắc đáng nhớ</h2>
        <ImageSlider />
        <ImageDescription>
          Mỗi bức ảnh là một kỷ niệm đẹp, một câu chuyện nhỏ trong hành trình tình yêu của chúng mình. 
          Từ những buổi hẹn hò đầu tiên đến những chuyến đi xa, mỗi khoảnh khắc đều thật đặc biệt khi có em ở bên.
        </ImageDescription>
      </SliderSection>

      <StorySection id="story">
        <LoveStory />
        <EndButton
          onClick={() => setShowOutro(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Lời kết <FaHeartIcon />
        </EndButton>
      </StorySection>

      <HeartAnimation />
    </AppContainer>
  )
}

export default App
