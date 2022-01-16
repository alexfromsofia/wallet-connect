import { MetaMaskInpageProvider } from "@metamask/providers"
import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
