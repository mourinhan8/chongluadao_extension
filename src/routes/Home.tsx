import React, { useEffect, useState } from "react"
import { getCurrentTabUrl } from "../chrome/utils"
import "../assets/styles/tailwind.css"
import logo from "../assets/img/tcu.jpeg"
import axios from "axios"

export const Home = () => {
  const [url, setUrl] = useState<string>("")
  const [warning, setWarning] = useState<string>("")
  const [notFound, setNotFound] = useState(0)

  const fetchAPI = async (link: any) => {
    const { data } = await axios.post("http://localhost:4001/url/detect-url", {
      url: link,
    })
    if (data.data.response.resultDetection === "safe") {
      setWarning("Đây là đường dẫn an toàn")
    }
    if (data.data.response.resultDetection === "malicious") {
      setWarning("Đây là đường dẫn độc hại")
    }
    if (data.data.response.notFound) {
      setNotFound(1)
    } else {
      setNotFound(0)
    }
  }

  /**
   * Get current URL
   */
  useEffect(() => {
    getCurrentTabUrl((url) => {
      const url_split = url?.split("/")
      let urlParam
      if (url_split) {
        urlParam = url_split[2]
      }
      setUrl(urlParam || "undefine")
      fetchAPI(urlParam)
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
            Nhận diện đường dẫn độc hại
          </h1>
          <p className=" text-gray-500 text-[12px]">Made by TCU</p>
        </div>
      </div>
      <div className="pt-4">
        {/* <p>hello</p> */}
        <p>{url}</p>
        {notFound === 1 && <p>Không có dữ liệu về đường dẫn từ whois</p>}
      </div>
      <div className="pt-4">
        {/* <p className="font-bold text-[20px]">Hello</p> */}
        <p className="font-bold text-[20px]">{warning}</p>
      </div>
    </div>
  )
}
