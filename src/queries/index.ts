import axios from "axios"

type QueryChatGptProps = {
  prompt: string
  text: string
  callback: (e: string) => void
}
export function queryChatGPT({ prompt, text, callback }: QueryChatGptProps) {
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
      callback(result.data.choices[0].message.content)
    })
    .catch((err) => {
      console.error(err)
      callback("Sorry something wen't wrong with your request.")
    })
}
