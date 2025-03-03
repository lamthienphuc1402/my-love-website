import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CounterContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.glass};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`

const DaysNumber = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  text-shadow: ${({ theme }) => theme.shadows.glow};
`

const DaysText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

interface DaysCounterProps {
  startDate: string
}

const DaysCounter = ({ startDate }: DaysCounterProps) => {
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
    const timer = setInterval(calculateDays, 1000 * 60 * 60) // Cập nhật mỗi giờ
    return () => clearInterval(timer)
  }, [startDate])

  return (
    <CounterContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DaysNumber>{days}</DaysNumber>
      <DaysText>ngày bên nhau</DaysText>
    </CounterContainer>
  )
}

export default DaysCounter 