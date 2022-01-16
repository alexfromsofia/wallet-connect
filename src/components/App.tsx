import React, { useState } from "react"
import GlobalContext, {
  GlobalContextState,
  initialState,
} from "../GlobalContext"
import Layout from "./Layout"

const App = () => {
  const [state, setState] = useState<GlobalContextState>(initialState)
  console.log(state)
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      <Layout />
    </GlobalContext.Provider>
  )
}

export default App
