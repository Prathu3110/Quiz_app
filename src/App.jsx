import { useState } from 'react'
import Home from './components/Home'
import CreateQuiz from './components/CreateQuiz'
import TakeQuiz from './components/TakeQuiz'
import Result from './components/Result'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [quizzes, setQuizzes] = useState([])
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [quizResults, setQuizResults] = useState(null)

  const handleCreateQuiz = (quiz) => {
    const newQuiz = {
      ...quiz,
      id: Date.now().toString(),
    }
    setQuizzes([...quizzes, newQuiz])
    setCurrentView('home')
  }

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz)
    setCurrentView('take')
  }

  const handleQuizComplete = (score, total) => {
    setQuizResults({ score, total })
    setCurrentView('result')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setCurrentQuiz(null)
    setQuizResults(null)
  }

  return (
    <div className="min-h-screen">
      {currentView === 'home' && (
        <Home
          onCreateQuiz={() => setCurrentView('create')}
          onTakeQuiz={() => setCurrentView('take')}
          quizzes={quizzes}
          onStartQuiz={handleStartQuiz}
        />
      )}
      {currentView === 'create' && (
        <CreateQuiz
          onSave={handleCreateQuiz}
          onCancel={handleBackToHome}
        />
      )}
      {currentView === 'take' && (
        <TakeQuiz
          quiz={currentQuiz}
          quizzes={quizzes}
          onComplete={handleQuizComplete}
          onCancel={handleBackToHome}
        />
      )}
      {currentView === 'result' && (
        <Result
          score={quizResults?.score}
          total={quizResults?.total}
          onBack={handleBackToHome}
        />
      )}
    </div>
  )
}

export default App
