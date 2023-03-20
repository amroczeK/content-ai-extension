import axios, { AxiosError } from "axios"

export interface Response {
  statusCode: string
  message: string
  stackTrace?: string
}

type QueryChatGptProps = {
  prompt: string
  text: string
}
export function queryChatGPT({
  prompt,
  text
}: QueryChatGptProps): Promise<Response> {
  return new Promise((resolve, reject) => {
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
        resolve({
          statusCode: "200",
          message: result.data.choices[0].message.content
        })
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          reject({
            statusCode: error.status,
            message: error.message,
            stackTrace: error.stack
          })
        } else {
          reject({
            statusCode: "400",
            message: error.message,
            stackTrace: error.stack
          })
        }
      })
  })
}
