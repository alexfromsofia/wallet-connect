import React from "react"
import { useGlobalContext } from "../../GlobalContext"
import useConnect from "../../hooks/useConnect"
import ConnectButton from "../ConnectButton"
import ConnectButtonSuccess from "../ConnectButtonSuccess"
import Loader from "../Loader"
import TokensList from "../TokensList"
import styles from "./styles.module.css"

const Content = () => {
  const {
    state: { isConnected, isMetaMaskLinked },
  } = useGlobalContext()

  useConnect()

  if (!isConnected) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      {isMetaMaskLinked ? (
        <div>
          <div>
            <ConnectButtonSuccess />
          </div>
          <TokensList />
        </div>
      ) : (
        <ConnectButton />
      )}
    </div>
  )
}

export default Content
