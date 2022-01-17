import React from "react"
import { useGlobalContext } from "../../GlobalContext"
import { networkMap } from "../../utils"
import styles from "./styles.module.css"

const ConnectButtonSuccess = () => {
  const { state } = useGlobalContext()
  const { address, tokensById, chainId } = state

  if (!chainId || !address || Object.keys(tokensById).length === 0) return null

  return (
    <div className={styles.container}>
      <span className={styles.network}>{networkMap[chainId]}</span>
      <span className={styles.button}>{address}</span>
    </div>
  )
}

export default ConnectButtonSuccess
