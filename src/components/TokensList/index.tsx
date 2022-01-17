import React, { useState } from "react"
import { useGlobalContext } from "../../GlobalContext"
import styles from "./styles.module.css"

const TokensList = () => {
  const {
    state: { tokenIds, tokensById },
  } = useGlobalContext()
  const [selectedToken, setSelectedToken] = useState("")

  return (
    <div className={styles.container}>
      {tokenIds.map((symbol) => {
        const { address, logoURI, decimals, totalSupply, balance } =
          tokensById[symbol]
        const isSelected = address === selectedToken

        return (
          <div
            key={symbol}
            className={`${styles.box} ${isSelected ? styles.selected : ""}`}
            onClick={() => setSelectedToken(address)}
          >
            <div className={styles.row}>
              <img src={logoURI} /> <span>{balance}</span> <span>{symbol}</span>
            </div>
            <div className={styles.row}>
              Decimals: <span>{decimals}</span>
            </div>
            <div className={styles.row}>
              Total Supply: <span>{totalSupply || "unknown"}</span>
            </div>
          </div>
        )
      })}

      <iframe
        key={selectedToken}
        className={styles.iframe}
        src={`https://app.uniswap.org/#/swap?theme=dark&outputCurrency=${selectedToken}`}
        height="660px"
        width="100%"
        style={{
          border: "0",
          margin: "0 auto",
          display: "block",
        }}
      />
    </div>
  )
}

export default TokensList
