import React, { useState } from "react"
import { useGlobalContext } from "../../GlobalContext"
import styles from "./styles.module.css"

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

      setState({ ...state, address })
    } catch (error) {
      setDisabled(false)
    }
  }

  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
      onClick={handleClick}
    >
      Connect MetaMask
    </button>
  )
}

export default ConnectButton
