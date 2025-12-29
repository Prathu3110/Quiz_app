import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function TakeQuiz({ quiz, quizzes, onComplete, onCancel }) {
  const [selectedQuiz, setSelectedQuiz] = useState(quiz)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showQuizSelection, setShowQuizSelection] = useState(!quiz)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (quiz) {
      setSelectedQuiz(quiz)
      setShowQuizSelection(false)
      setCurrentQuestionIndex(0)
      setSelectedAnswers({})
    } else {
      setShowQuizSelection(true)
    }
  }, [quiz])

  const handleSelectAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    })
  }

  const handleNext = () => {
    if (!selectedQuiz || !selectedQuiz.questions) return

    setIsTransitioning(true)
    setTimeout(() => {
      if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        handleSubmit()
      }
      setIsTransitioning(false)
    }, 200)
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
        setIsTransitioning(false)
      }, 200)
    }
  }

  const handleSubmit = () => {
    if (!selectedQuiz || !selectedQuiz.questions) return

    let score = 0
    selectedQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctIndex) {
        score++
      }
    })
    onComplete(score, selectedQuiz.questions.length)
  }

  const handleQuizSelect = (selected) => {
    setSelectedQuiz(selected)
    setShowQuizSelection(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
  }

  if (showQuizSelection) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto fade-in">
          <Card>
            <CardHeader className="px-6 sm:px-8 lg:px-10 py-6 sm:py-8">
              <div className="flex items-center gap-4 sm:gap-5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCancel}
                  className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                >
                  <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <CardTitle className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Select Quiz</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
              {quizzes.length === 0 ? (
                <p className="text-center text-lg sm:text-xl lg:text-2xl text-muted-foreground py-10 sm:py-12">
                  No quizzes available. Create one first!
                </p>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {quizzes.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuizSelect(q)}
                      className="w-full text-left p-5 sm:p-6 lg:p-7 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                    >
                      <div className="font-medium text-base sm:text-lg lg:text-xl text-foreground">{q.title}</div>
                      <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-2">
                        {q.questions.length} question{q.questions.length !== 1 ? 's' : ''}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!selectedQuiz || !selectedQuiz.questions || selectedQuiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex]
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const isLastQuestion = currentQuestionIndex === selectedQuiz.questions.length - 1
  const hasAnswer = selectedAnswers[currentQuestionIndex] !== undefined

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <Card className={`fade-in ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
          <CardHeader className="px-6 sm:px-8 lg:px-10 py-6 sm:py-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCancel}
                  className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                >
                  <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl">{selectedQuiz.title}</CardTitle>
              </div>
              <div className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 sm:space-y-10 lg:space-y-12 px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold">{currentQuestion.text}</h2>

              <div className="space-y-3 sm:space-y-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === index
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(currentQuestionIndex, index)}
                      className={`w-full text-left p-5 sm:p-6 lg:p-8 rounded-lg border-2 transition-all duration-200 text-base sm:text-lg lg:text-xl ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-secondary/50 hover:bg-secondary text-foreground'
                      }`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-between pt-6 sm:pt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="text-base sm:text-lg lg:text-xl h-11 sm:h-12 lg:h-14 px-6 sm:px-8 lg:px-10"
              >
                <ArrowLeft className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!hasAnswer}
                className="text-base sm:text-lg lg:text-xl h-11 sm:h-12 lg:h-14 px-6 sm:px-8 lg:px-10"
              >
                {isLastQuestion ? 'Submit' : 'Next'}
                {!isLastQuestion && <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TakeQuiz
