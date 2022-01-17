import React, { useContext } from "react"
import { Token } from "./utils"
import { ethereum } from "./web3Instance"

export interface TokenById {
  [key: string]: Token & {
    balance: number
    totalSupply: number
  }
}

export interface GlobalContextState {
  isConnected: boolean
  isMetaMaskLinked: boolean
  hasMetaMask: boolean
  address?: string
  chainId?: string
  tokensById: TokenById
  tokenIds: string[]
  error?: string
}

export interface ContextProvider {
  state: GlobalContextState
  setState: React.Dispatch<React.SetStateAction<GlobalContextState>>
}

export const initialState: GlobalContextState = {
  isConnected: false,
  isMetaMaskLinked: false,
  hasMetaMask: Boolean(ethereum && ethereum.isMetaMask),
  address: undefined,
  chainId: undefined,
  tokenIds: [],
  tokensById: {},
}

const GlobalContext = React.createContext<ContextProvider>({
  state: initialState,
  setState: () => {},
})

export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalContext
