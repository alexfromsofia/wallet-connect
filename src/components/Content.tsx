import React from "react"
import { useGlobalContext } from "../GlobalContext"
import useConnect from "../hooks/useConnect"
import ConnectButton from "./ConnectButton"

const Content = () => {
  const {
    state: { isConnected, isMetaMaskLinked, address },
  } = useGlobalContext()

  useConnect()

  if (!isConnected) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isMetaMaskLinked ? <div>Address: {address}</div> : <ConnectButton />}
    </div>
  )
}

export default Content
