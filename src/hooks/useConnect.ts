import { useEffect } from "react"
import { initialState, TokenById, useGlobalContext } from "../GlobalContext"
import { ETH, getTokensData, Network } from "../utils"
import { ethereum, web3Instance } from "../web3Instance"

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

      if (chainId !== Network[Network["0x1"]]) {
        setState({
          ...state,
          error: "Please switch to Etherium Mainnet",
        })

        return
      }

      if (walletLinked) {
        const balance = await web3Instance.eth.getBalance(address)
        const { tokenIds: ids, tokensById: byId } = await getTokensData()

        tokenIds.push(ETH.symbol)
        tokensById[ETH.symbol] = {
          ...ETH,
          balance: Number(web3Instance.utils.fromWei(balance)),
          totalSupply: 0,
        }

        setState({
          ...state,
          isConnected: true,
          isMetaMaskLinked: walletLinked,
          chainId,
          address,
          tokenIds: [...tokenIds, ...ids],
          tokensById: {
            ...tokensById,
            ...byId,
          },
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
