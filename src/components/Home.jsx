import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Plus, Play } from 'lucide-react'

function Home({ onCreateQuiz, onTakeQuiz, quizzes, onStartQuiz }) {
  return (
    <div className="animated-background min-h-screen">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl fade-in">
          <Card className="bg-card/95 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center space-y-6 py-8 sm:py-10 lg:py-12">
              <CardTitle className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Quiz App
              </CardTitle>
              <CardDescription className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground">
                Create and take quizzes with ease
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-6 sm:px-8 lg:px-12 pb-8 sm:pb-10 lg:pb-12">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center">
                <Button
                  onClick={onCreateQuiz}
                  size="lg"
                  className="w-full sm:w-auto px-10 sm:px-12 lg:px-16 py-7 sm:py-8 lg:py-9 text-lg sm:text-xl lg:text-2xl"
                >
                  <Plus className="mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                  Create Quiz
                </Button>
                <Button
                  onClick={onTakeQuiz}
                  disabled={quizzes.length === 0}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-10 sm:px-12 lg:px-16 py-7 sm:py-8 lg:py-9 text-lg sm:text-xl lg:text-2xl"
                >
                  <Play className="mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                  Take Quiz
                </Button>
              </div>

              {quizzes.length > 0 && (
                <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-border">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8">
                    Your Quizzes ({quizzes.length})
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {quizzes.map((quiz, index) => (
                      <button
                        key={quiz.id}
                        onClick={() => onStartQuiz(quiz)}
                        className="w-full text-left p-5 sm:p-6 lg:p-7 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                      >
                        <div className="font-medium text-base sm:text-lg lg:text-xl text-foreground">{quiz.title}</div>
                        <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-2">
                          {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
