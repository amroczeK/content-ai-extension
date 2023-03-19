import React, { ReactNode, useState } from "react"

import { queryChatGPT } from "~queries"

type Props = {
  selectedText: string
  closeHandler: () => void
  answerHandler: (response: string) => void
}

const Form = ({ selectedText, closeHandler, answerHandler }: Props) => {
  const [questionInput, setQuestionInput] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const queryHandler = async ({
    text,
    prompt
  }: {
    text: string
    prompt: string
  }) => {
    answerHandler(null) // Reset
    setLoading(true)
    await queryChatGPT({ text, prompt, callback: answerHandler })
    setLoading(false)
  }

  return (
    <div
      id="form-container"
      className="relative w-[28rem] rounded bg-white p-4 shadow">
      <div className="absolute top-0 right-0 mt-1 mr-1">
        <button
          type="button"
          onClick={closeHandler}
          className="bg-white rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <label
        className="block text-sm font-bold text-gray-700"
        htmlFor="custom-prompt">
        Selected text
      </label>
      <p className="mb-2 text-xs text-gray-500 line-clamp-1">{selectedText}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          queryHandler({
            text: selectedText,
            prompt: questionInput
          })
        }}>
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="custom-prompt">
            Custom prompt
          </label>
          <p className="mb-2 text-xs text-gray-500">
            Send a custom prompt for selected content.
          </p>
          <div className="flex gap-1">
            <textarea
              className="bg-white focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow outline-none focus:border-blue-400 min-h-[4rem]"
              id="custom-prompt"
              placeholder="Ask a question"
              wrap="soft"
              value={questionInput}
              onChange={(event) => setQuestionInput(event.target.value)}
            />
            <button
              className="w-20 flex justify-center items-center focus:shadow-outline h-16 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
              disabled={loading}>
              {!loading ? (
                `Send`
              ) : (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">
            Predefined prompts
          </label>
          <p className="mb-2 text-xs text-gray-500">
            Select an optimized predefined prompt for selected content.
          </p>
          <div className="flex gap-2 overflow-x-scroll">
            <Prompt
              label="Summarize"
              onClickHandler={() => {
                queryHandler({
                  text: selectedText,
                  prompt: "Summarize the following text:"
                })
              }}
            />
            <Prompt
              label="Keywords"
              onClickHandler={() => {
                queryHandler({
                  text: selectedText,
                  prompt: "Give me keywords for the following text:"
                })
              }}
            />
            <Prompt
              label="Grammar"
              onClickHandler={() => {
                queryHandler({
                  text: selectedText,
                  prompt: "Check for grammar issues in the following text:"
                })
              }}
            />
            <Prompt
              label="Spellcheck"
              onClickHandler={() => {
                queryHandler({
                  text: selectedText,
                  prompt: "Find spelling errors in the following text:"
                })
              }}
            />
            <Prompt
              label="Rewrite"
              onClickHandler={() => {
                queryHandler({
                  text: selectedText,
                  prompt: "Rewrite the following text:"
                })
              }}
            />
            <Prompt
              label="Blog"
              onClickHandler={() => {
                queryHandler({
                  text: selectedText,
                  prompt: "Write me a short blog using the following text:"
                })
              }}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

type PromptProps = {
  label: string
  onClickHandler: () => void
}
const Prompt = ({ label, onClickHandler }: PromptProps) => (
  <button
    className="rounded-full bg-blue-500 py-2 px-4 text-xs text-white"
    type="button"
    onClick={onClickHandler}>
    {label}
  </button>
)

export default Form
