import React from "react"
import { useGlobalContext } from "../../GlobalContext"
import Content from "../Content"
import styles from "./styles.module.css"

const Layout = () => {
  const {
    state: { hasMetaMask },
  } = useGlobalContext()

  return (
    <div className={styles.container}>
      {hasMetaMask ? <Content /> : <div>Please Install MetaMask</div>}
    </div>
  )
}

export default Layout
