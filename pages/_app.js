import '../styles/globals.css';
import { ZksyncSepoliaTestnet, Zksync, LineaTestnet, Linea } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import config from "../config";

function MyApp({ Component, pageProps }) {
  let activeChain = '';

  switch (config.rpcNetwork) {
    case('linea'):
      activeChain = Linea;
      break;
    case('lineaTestnet'):
      activeChain = LineaTestnet;
      break;   
    case('zksync'):
      activeChain = Zksync;
      break;   
    case('zksyncTestnet'):
      activeChain = ZksyncSepoliaTestnet;
      break;          
    default:
      throw new Error('Unsupported rpc network');
  }

  return <ThirdwebProvider
          activeChain={ activeChain }
          clientId={config.thirdWebClientId}
        >
          <Component {...pageProps} />
        </ThirdwebProvider>   
}

export default MyApp
