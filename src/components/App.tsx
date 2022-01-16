import { MetaMaskInpageProvider } from "@metamask/providers"
import { Maybe } from "@metamask/providers/dist/utils"
import React, { useEffect, useState } from "react"

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

const { ethereum } = window

function connect() {}

function handleAccountsChanged(acc: any) {
  console.log(acc)
}

const App = () => {
  const [connection, setConnection] = useState<Maybe<unknown>>()

  useEffect(() => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        setConnection(result)
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.")
        } else {
          console.error(error)
        }
      })
  }, [])
  console.log(connection)
  return <div>App</div>
}

export default App
