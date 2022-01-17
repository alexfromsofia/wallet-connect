import React from "react"
import { useGlobalContext } from "../../GlobalContext"
import Content from "../Content"
import styles from "./styles.module.css"

const Layout = () => {
  const {
    state: { hasMetaMask, error },
  } = useGlobalContext()

  if (!hasMetaMask) {
    return <div className={styles.error}>Please Install MetaMask</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.container}>
      <Content />
    </div>
  )
}

export default Layout
