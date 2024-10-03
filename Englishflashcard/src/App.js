import { useState, useEffect } from 'react'
import { Button } from './components/ui/Button'
import { Card, CardContent } from './components/ui/Card'

const wordLists = {
  1: [
    { word: 'Apple', meaning: '苹果', image: '/apple.svg' },
    { word: 'Book', meaning: '书', image: '/book.svg' },
    { word: 'Cat', meaning: '猫', image: '/cat.svg' }
  ],
  2: [
    { word: 'Elephant', meaning: '大象', image: '/elephant.svg' },
    { word: 'Flower', meaning: '花', image: '/flower.svg' },
    { word: 'Guitar', meaning: '吉他', image: '/guitar.svg' }
  ],
  3: [
    { word: 'Helicopter', meaning: '直升机', image: '/helicopter.svg' },
    { word: 'Island', meaning: '岛屿', image: '/island.svg' },
    { word: 'Jungle', meaning: '丛林', image: '/jungle.svg' }
  ]
}

function VocabApp () {
  const [grade, setGrade] = useState('')
  const [words, setWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (grade) {
      setLoading(true)
      setTimeout(() => {
        setWords(wordLists[grade])
        setCurrentIndex(0)
        setScore(0)
        setStartTime(Date.now())
        setEndTime(null)
        setGameOver(false)
        setLoading(false)
      }, 500)
    }
  }, [grade])

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowMeaning(false)
    } else {
      setEndTime(Date.now())
      setGameOver(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowMeaning(false)
    }
  }

  const handleCardClick = () => {
    if (!showMeaning) {
      console.log('Card clicked, showing meaning') // Debug log
      setShowMeaning(true)
      setScore(score + 1)
    }
  }

  const formatTime = ms => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}分${remainingSeconds}秒`
  }

  const reset = (_grade = '') => {
    setGrade(_grade)
    setWords([])
    setCurrentIndex(0)
    setScore(0)
    setShowMeaning(false)
    setStartTime(null)
    setEndTime(null)
    setGameOver(false)
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-8'>
          英语单词记忆卡片
        </h1>
        <div className='mb-8'>
          <select
            value={grade}
            onChange={e => reset(e.target.value)}
            className='border rounded px-2 py-1'
          >
            <option value='' disabled>
              选择年级
            </option>
            <option value='1'>一年级</option>
            <option value='2'>二年级</option>
            <option value='3'>三年级</option>
          </select>
        </div>
        {loading && (
          <div className='text-center'>
            <p>加载中...</p>
          </div>
        )}
        {!loading && grade && words.length > 0 && !gameOver && (
          <>
            <div className='text-right mb-4'>
              <span className='font-bold'>得分: {score}</span>
            </div>
            <Card className='mb-8' onClick={handleCardClick}>
              <CardContent className='p-6 text-center'>
                <div className='mb-4'>
                  <img
                    src={words[currentIndex].image}
                    alt={`Illustration for ${words[currentIndex].word}`}
                    width={200}
                    height={200}
                    className='mx-auto'
                  />
                </div>
                <h2 className='text-2xl font-bold mb-4'>
                  {words[currentIndex].word}
                </h2>
                {showMeaning && (
                  <p className='text-xl'>{words[currentIndex].meaning}</p>
                )}
              </CardContent>
            </Card>
            <div className='flex justify-between'>
              <Button onClick={handlePrevious} disabled={currentIndex === 0}>
                上一个
              </Button>

              <Button onClick={handleNext}>
                {currentIndex === words.length - 1 ? '完成' : '下一个'}
              </Button>
            </div>
          </>
        )}
        {gameOver && (
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-4'>游戏结束！</h2>
            <p className='text-xl mb-2'>总分: {score}</p>
            <p className='text-xl mb-4'>
              用时: {formatTime(endTime - startTime)}
            </p>
            <Button onClick={() => reset()}>重新开始</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VocabApp
