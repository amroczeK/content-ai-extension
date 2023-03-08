import axios from "axios"
import React, { ReactNode, useState } from "react"

import DropdownButton from "./DropdownButton"

type DropdownProps = {
  selectedText: string
  answerHandler: (response: string) => void
}

function Dropdown({ selectedText, answerHandler }: DropdownProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const onOpenHandler = () => setVisible(!visible)

  const onClickHandler = ({
    text,
    prompt
  }: {
    text: string
    prompt: string
  }) => {
    answerHandler(null) // Reset
    axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: "Bearer " + process.env.CRX_PUBLIC_KEY
      },
      data: {
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        temperature: 0,
        messages: [{ role: "user", content: `${prompt} ${text}` }]
      }
    })
      .then((result) => {
        answerHandler(result.data.choices[0].message.content)
      })
      .catch((err) => {
        console.error(err)
        answerHandler("Sorry something wen't wrong with your request.")
      })
  }

  return (
    <div className="relative inline-block text-left font-sans">
      <div>
        <DropdownButton onOpenHandler={onOpenHandler} />
      </div>
      <ul
        className={`absolute ${
          visible ? `visible` : `invisible`
        } list-none left-0 p-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}>
        <div className="py-1" role="none">
          <ListItem
            id="menu-item-0"
            onClickHandler={() => {
              onClickHandler({
                text: selectedText,
                prompt: "Summarize the following text:"
              })
            }}>
            Summarize
          </ListItem>
          <ListItem
            id="menu-item-1"
            onClickHandler={() => {
              onClickHandler({
                text: selectedText,
                prompt: "Rewrite the following text:"
              })
            }}>
            Rewrite
          </ListItem>
          <ListItem
            id="menu-item-2"
            onClickHandler={() => {
              onClickHandler({
                text: selectedText,
                prompt: "Give me keywords for the following text:"
              })
            }}>
            Keywords
          </ListItem>
        </div>
      </ul>
    </div>
  )
}

export default Dropdown

type ListItemProps = {
  id: string
  children: ReactNode
  onClickHandler?: () => void
}
const ListItem = ({ id, children, onClickHandler }: ListItemProps) => (
  <li
    id={id}
    className="list-none text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
    role="menuitem"
    tabIndex={-1}
    onClick={onClickHandler}>
    {children}
  </li>
)
