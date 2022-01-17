import { MetaMaskInpageProvider } from "@metamask/providers"
import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

/**
 * TODO:
 * (from task) Bonus: Add support for other Wallets as well.
 * (from task) Automatically detect any Tokens that the User has and showcase them as well and the Balance of them
 * Add css variables or even SASS
 * Write tests using RTL
 * Dockerize
 */

ReactDOM.render(<App />, document.getElementById("root"))
