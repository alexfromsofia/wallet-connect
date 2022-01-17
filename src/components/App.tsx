import React, { useState } from "react"
import GlobalContext, {
  GlobalContextState,
  initialState,
} from "../GlobalContext"
import styles from "./App.module.css"
import Layout from "./Layout"

const App = () => {
  const [state, setState] = useState<GlobalContextState>(initialState)

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      <div className={styles.gradient} />
      <Layout />
    </GlobalContext.Provider>
  )
}

export default App
