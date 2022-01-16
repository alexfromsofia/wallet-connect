import Web3 from "web3"

export const { ethereum } = window
export const web3Instance = new Web3(ethereum as any)
