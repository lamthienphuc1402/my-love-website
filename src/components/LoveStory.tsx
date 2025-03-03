import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TimelineContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
  min-height: 100vh;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`

const TimelineItem = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.glass};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} auto;
  max-width: 800px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  h3 {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  h4 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1rem;
    line-height: 1.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`

const memories = [
  {
    date: '29/9/2024',
    title: 'Ngày đầu tiên bên nhau',
    description: 'Ngày định mệnh khi chúng mình chính thức trở thành một nửa của nhau...'
  },
  {
    date: '29/10/2024',
    title: 'Tròn 1 tháng bên nhau',
    description: 'Một tháng trôi qua thật nhanh, nhưng đủ để anh biết em là người con gái anh muốn cùng đi hết cuộc đời này'
  },
  {
    date: '29/11/2024',
    title: 'Kỉ niệm 2 tháng',
    description: 'Mỗi ngày trôi qua, tình yêu của chúng mình lại càng lớn thêm'
  },
  {
    date: '29/12/2024',
    title: 'Ba tháng yêu thương',
    description: 'Ba tháng - 90 ngày bên nhau với biết bao kỷ niệm đẹp'
  },
  {
    date: '29/1/2025',
    title: 'Bốn tháng bên nhau',
    description: 'Tháng đầu tiên của năm mới 2025, hạnh phúc vì vẫn được nắm tay nhau'
  },
  {
    date: '10/2/2025',
    title: 'Tết đầu tiên bên nhau',
    description: 'Tết này thật đặc biệt vì có em. Chúc người yêu của anh năm mới thật nhiều niềm vui và hạnh phúc ❤️'
  },
  {
    date: '15/2/2025',
    title: 'Chuyến đi Vũng Tàu',
    description: 'Kỷ niệm khó quên với chuyến đi biển cùng nhau, ngắm hoàng hôn và cùng nhau có 3 ngày tuyệt nhất đời này anh có'
  },
  {
    date: '8/3/2025',
    title: 'Ngày của em',
    description: 'Chúc tình yêu của anh có một ngày 8/3 thật đặc biệt và ý nghĩa. Anh yêu em! ❤️'
  }
]

const LoveStory = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 }
  }

  return (
    <TimelineContainer>
      {memories.map((memory, index) => {
        const [ref, inView] = useInView({
          triggerOnce: true,
          threshold: 0.1
        })

        return (
          <TimelineItem
            key={index}
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3>{memory.date}</h3>
            <h4>{memory.title}</h4>
            <p>{memory.description}</p>
          </TimelineItem>
        )
      })}
    </TimelineContainer>
  )
}

export default LoveStory