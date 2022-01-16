import React from "react"
import { useGlobalContext } from "../GlobalContext"
import Content from "./Content"

const Layout = () => {
  const {
    state: { hasMetaMask },
  } = useGlobalContext()

  return (
    <div>{hasMetaMask ? <Content /> : <div>Please Install MetaMask</div>}</div>
  )
}

export default Layout
