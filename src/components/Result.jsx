import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Home, CheckCircle2, XCircle } from 'lucide-react'

function Result({ score, total, onBack }) {
  if (score === undefined || total === undefined || total === 0) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto fade-in">
          <Card>
            <CardContent className="pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 px-6 sm:px-8 lg:px-10 text-center space-y-6">
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">No results available</p>
              <Button onClick={onBack} className="text-base sm:text-lg lg:text-xl h-11 sm:h-12 lg:h-14 px-8 sm:px-10 lg:px-12">
                <Home className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const percentage = Math.round((score / total) * 100)

  let feedback = ''
  let icon = null
  let colorClass = 'text-primary'

  if (percentage >= 80) {
    feedback = 'Excellent work! You really know your stuff!'
    icon = <CheckCircle2 className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 text-green-500" />
    colorClass = 'text-green-500'
  } else if (percentage >= 60) {
    feedback = 'Good job! You did well!'
    icon = <CheckCircle2 className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 text-yellow-500" />
    colorClass = 'text-yellow-500'
  } else {
    feedback = 'Keep practicing! You can do better next time!'
    icon = <XCircle className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 text-red-500" />
    colorClass = 'text-red-500'
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto fade-in">
        <Card>
          <CardContent className="pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 lg:pb-16 px-6 sm:px-8 lg:px-10">
            <div className="text-center space-y-8 sm:space-y-10 lg:space-y-12">
              <div className="flex justify-center">
                {icon}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">Quiz Complete!</h1>

              <div className="inline-block p-8 sm:p-10 lg:p-12 rounded-lg bg-secondary/50 border border-border">
                <div className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold ${colorClass} mb-3`}>
                  {score} / {total}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground">
                  {percentage}%
                </div>
              </div>

              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto">
                {feedback}
              </p>

              <Button
                size="lg"
                onClick={onBack}
                className="px-10 sm:px-12 lg:px-16 py-7 sm:py-8 lg:py-9 text-lg sm:text-xl lg:text-2xl"
              >
                <Home className="mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Result
