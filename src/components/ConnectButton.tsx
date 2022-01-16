import React, { useState } from "react"
import { useGlobalContext } from "../GlobalContext"

const { ethereum } = window

const ConnectButton = () => {
  const [disabled, setDisabled] = useState(false)
  const { state, setState } = useGlobalContext()

  const handleClick = async () => {
    setDisabled(true)
    try {
      const [address]: any = await ethereum.request({
        method: "eth_requestAccounts",
      })

      setState({
        ...state,
        address,
        isMetaMaskLinked: true,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <button disabled={disabled} onClick={handleClick}>
      Connect MetaMask
    </button>
  )
}

export default ConnectButton
