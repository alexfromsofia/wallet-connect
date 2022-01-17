import { useEffect } from "react"
import abi from "../data/erc20.abi.json"
import allTokens from "../data/tokens.json"
import { initialState, TokenById, useGlobalContext } from "../GlobalContext"
import { ETH, Token } from "../utils"
import { ethereum, web3Instance } from "../web3Instance"

const tokens = allTokens.tokens as Token[]

const useConnect = () => {
  const { setState, state } = useGlobalContext()
  const { isMetaMaskLinked, address } = state
  useEffect(() => {
    const tokenIds: string[] = []
    const tokensById: TokenById = {}

    if (isMetaMaskLinked && address) return

    async function getWalletData() {
      const chainId: any = await ethereum.request({ method: "eth_chainId" })
      const [address]: any = await ethereum.request({ method: "eth_accounts" })
      const walletLinked = typeof address !== "undefined"

      if (walletLinked) {
        tokens.forEach(async (token) => {
          const { address, symbol } = token
          const contract = new web3Instance.eth.Contract(abi as any, address, {
            from: web3Instance.eth.defaultAccount as string,
          })

          const balance = await contract.methods.balanceOf(address).call()

          tokenIds.push(symbol)
          tokensById[symbol] = { ...token, balance }
        })
        const balance = await web3Instance.eth.getBalance(address)

        tokenIds.push(ETH.symbol)
        tokensById[ETH.symbol] = {
          ...ETH,
          balance: Number(web3Instance.utils.fromWei(balance)),
        }

        setState({
          ...state,
          isConnected: true,
          isMetaMaskLinked: walletLinked,
          chainId,
          address,
          tokenIds,
          tokensById,
        })
      } else {
        setState({
          ...state,
          isConnected: true,
        })
      }
    }

    getWalletData()
  }, [isMetaMaskLinked, address])

  useEffect(() => {
    ethereum.on("chainChanged", () => {
      window.location.reload()
    })

    ethereum.on("accountsChanged", async (accounts: any) => {
      if (!accounts || !accounts.length) {
        setState({
          ...initialState,
          isConnected: true,
        })
      }
    })
  }, [])
}

export default useConnect
