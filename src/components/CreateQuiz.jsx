import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'

function CreateQuiz({ onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([
    {
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
    },
  ])

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
      },
    ])
  }

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const handleQuestionChange = (index, value) => {
    const updated = [...questions]
    updated[index].text = value
    setQuestions(updated)
  }

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updated = [...questions]
    updated[questionIndex].options[optionIndex] = value
    setQuestions(updated)
  }

  const handleCorrectChange = (questionIndex, correctIndex) => {
    const updated = [...questions]
    updated[questionIndex].correctIndex = parseInt(correctIndex)
    setQuestions(updated)
  }

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a quiz title')
      return
    }

    const validQuestions = questions.filter(
      (q) => q.text.trim() && q.options.every((opt) => opt.trim())
    )

    if (validQuestions.length === 0) {
      alert('Please add at least one complete question')
      return
    }

    onSave({
      title: title.trim(),
      questions: validQuestions,
    })
  }

  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <Card className="fade-in">
          <CardHeader className="sticky top-0 z-10 bg-card border-b border-border pb-5 sm:pb-6 lg:pb-8 px-6 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3 sm:gap-5">
              <Button
                variant="ghost"
                size="icon"
                onClick={onCancel}
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Create Quiz</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 lg:space-y-10 pt-6 sm:pt-8 lg:pt-10 px-6 sm:px-8 lg:px-10">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base sm:text-lg lg:text-xl">Quiz Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title..."
                className="w-full text-base sm:text-lg lg:text-xl h-12 sm:h-14 lg:h-16"
              />
            </div>

            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-4 sm:space-y-5 lg:space-y-6 p-5 sm:p-6 lg:p-8 border border-border rounded-lg bg-secondary/20">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold">Question {qIndex + 1}</h3>
                    {questions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveQuestion(qIndex)}
                        className="h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-destructive hover:text-destructive flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor={`question-${qIndex}`} className="text-base sm:text-lg lg:text-xl">Question Text</Label>
                    <Input
                      id={`question-${qIndex}`}
                      value={question.text}
                      onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                      placeholder="Enter your question..."
                      className="w-full text-base sm:text-lg lg:text-xl h-12 sm:h-14 lg:h-16"
                    />
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <Label className="text-base sm:text-lg lg:text-xl">Options</Label>
                    <RadioGroup
                      value={question.correctIndex.toString()}
                      onValueChange={(value) => handleCorrectChange(qIndex, value)}
                      className="space-y-3"
                    >
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3 sm:gap-4">
                          <RadioGroupItem 
                            value={oIndex.toString()} 
                            id={`option-${qIndex}-${oIndex}`}
                            className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                          />
                          <Label
                            htmlFor={`option-${qIndex}-${oIndex}`}
                            className="flex-1 cursor-pointer"
                          >
                            <Input
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              placeholder={`Option ${oIndex + 1}...`}
                              className="w-full text-base sm:text-lg lg:text-xl h-11 sm:h-12 lg:h-14"
                            />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-6 justify-between pt-6 sm:pt-8 lg:pt-10 border-t border-border">
              <Button
                variant="outline"
                onClick={handleAddQuestion}
                className="w-full sm:w-auto text-base sm:text-lg lg:text-xl h-11 sm:h-12 lg:h-14 px-6 sm:px-8 lg:px-10"
              >
                <Plus className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Add Question
              </Button>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-6 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="w-full sm:w-auto text-base sm:text-lg lg:text-xl h-11 sm:h-12 lg:h-14 px-6 sm:px-8 lg:px-10"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="w-full sm:w-auto text-base sm:text-lg lg:text-xl h-11 sm:h-12 lg:h-14 px-6 sm:px-8 lg:px-10"
                >
                  <Save className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Save Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreateQuiz
