import React from "react"
import { useGlobalContext } from "../../GlobalContext"
import styles from "./styles.module.css"

const formatAddress = (address: string) => {
  const symbolCount = 5
  const array = address.split("")

  return `${array.slice(0, symbolCount).join("")}...${array
    .slice(symbolCount * -1)
    .join("")}`
}

const ConnectButtonSuccess = () => {
  const { state } = useGlobalContext()
  const { address, tokensById } = state

  if (!address || Object.keys(tokensById).length === 0) return null

  const { balance, symbol } = tokensById["ETH"]

  return (
    <div className={styles.container}>
      <span className={styles["eth-balance"]}>
        {balance} {symbol}
      </span>
      <button className={styles.button}>{formatAddress(address)}</button>
    </div>
  )
}

export default ConnectButtonSuccess
