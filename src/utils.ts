import abi from "./data/erc20.abi.json"
import allTokens from "./data/tokens.json"
import { TokenById } from "./GlobalContext"
import { web3Instance } from "./web3Instance"

export enum Network {
  "0x1",
}

export const networkMap: {
  [key: string]: string
} = {
  [Network[Network["0x1"]]]: "Mainnet",
}

export const errors = {
  network: "Please switch to Etherium Mainnet",
  general: "Hello, this is our error message!",
}

export interface Token {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export const ETH: Token = {
  address: "",
  chainId: 1,
  decimals: 18,
  logoURI:
    "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
  name: "Etherium",
  symbol: "ETH",
}

export async function getTokensData() {
  return await allTokens.tokens.reduce(
    async (acc, token) => {
      const { address, symbol } = token
      const contract = new web3Instance.eth.Contract(abi as any, address, {
        from: web3Instance.eth.defaultAccount as string,
      })
      const memo = await acc

      const balance = await contract.methods.balanceOf(address).call()
      const totalSupply = await contract.methods.totalSupply().call()

      memo.tokenIds.push(symbol)
      memo.tokensById[symbol] = {
        ...token,
        balance: +web3Instance.utils.fromWei(balance),
        totalSupply: Math.floor(+web3Instance.utils.fromWei(totalSupply)),
      }

      return memo
    },
    Promise.resolve({
      tokenIds: [] as string[],
      tokensById: {} as TokenById,
    })
  )
}
