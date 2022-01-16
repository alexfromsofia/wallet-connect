import { useEffect } from "react"
import { useGlobalContext } from "../GlobalContext"

const { ethereum } = window

const useConnect = () => {
  const { setState, state } = useGlobalContext()

  useEffect(() => {
    async function getWalletData() {
      const chainId: any = await ethereum.request({
        method: "eth_chainId",
      })
      const [address]: any = await ethereum.request({ method: "eth_accounts" })

      setState({
        ...state,
        isConnected: true,
        isMetaMaskLinked: typeof address !== "undefined",
        chainId,
        address,
      })
    }

    window.ethereum.on("chainChanged", () => {
      // We recommend reloading the page, unless you must do otherwise
      window.location.reload()
    })

    window.ethereum.on("accountsChanged", async (accounts: any) => {
      if (!accounts || !accounts.length) {
        setState({
          ...state,
          isConnected: true,
          isMetaMaskLinked: false,
          address: undefined,
        })
      }
    })

    getWalletData()
  }, [])
}

export default useConnect
