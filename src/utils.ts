export enum Network {
  "0x1",
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
