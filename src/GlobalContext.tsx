import React, { useContext } from "react"

export interface GlobalContextState {
  isConnected: boolean
  isMetaMaskLinked: boolean
  hasMetaMask: boolean
  address?: string
  chainId?: string
}

export interface ContextProvider {
  state: GlobalContextState
  setState: React.Dispatch<React.SetStateAction<GlobalContextState>>
}
const { ethereum } = window

export const initialState = {
  isConnected: false,
  isMetaMaskLinked: false,
  hasMetaMask: Boolean(ethereum && ethereum.isMetaMask),
  address: undefined,
  chainId: undefined,
}

const GlobalContext = React.createContext<ContextProvider>({
  state: initialState,
  setState: () => {},
})

export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalContext
