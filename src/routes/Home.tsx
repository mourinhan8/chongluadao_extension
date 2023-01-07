import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCurrentTabUrl } from "../chrome/utils"
import "../assets/styles/tailwind.css"
import logo from "../assets/img/tcu.jpeg"
import axios from "axios"

export const Home = () => {
  const [url, setUrl] = useState<string>("")
  const [warning, setWarning] = useState<string>("")

  let { push } = useHistory()

  const fetchAPI = async (link: any) => {
    const { data } = await axios.post("http://localhost:8000/url_check", {
      url: link,
    })
    setWarning(data.msg)
  }

  /**
   * Get current URL
   */
  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || "undefined")
      fetchAPI(url)
    })
  }, [])

  return (
    <div className="App">
      <header className="p-4">
        <div className="flex justify-center">
          <div>
            <img src={logo} alt="" width={100} height={100} />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 pt-4">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-lg font-bold sm:text-3lg">
            Tiện ích phát hiện lừa đảo
          </h1>
          <p className=" text-gray-500 text-[12px]">
            Made by Telecommunication university
          </p>
        </div>
      </div>
      <p>{url.split("/")[2]}</p>
      <p>{warning}</p>
    </div>
  )
}
