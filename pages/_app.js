import '../styles/globals.css';
import { ZksyncSepoliaTestnet, Zksync, LineaTestnet, Linea, BaseSepoliaTestnet, Base, ArbitrumSepolia, Arbitrum, 
  OptimismGoerli, Optimism, ScrollSepoliaTestnet, Scroll, Sepolia, Ethereum } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import config from "../config";

function MyApp({ Component, pageProps }) {
  let activeChain = '';

  switch (config.rpcNetwork) {
    case('ethTestnet'):
      activeChain = Sepolia;
      break;
    case('eth'):
      activeChain = Ethereum;
      break;    
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
    case('baseTestnet'):
      activeChain = BaseSepoliaTestnet;
      break;     
    case('base'):
      activeChain = Base;
      break;      
    case('arbitrumTestnet'):
      activeChain = ArbitrumSepolia;
      break;
    case('arbitrum'):
      activeChain = Arbitrum;
      break;  
    case('optimismTestnet'):
      activeChain = OptimismGoerli;
      break;
    case('optimism'):
      activeChain = Optimism;
      break;
    case('scrollTestnet'):
      activeChain = ScrollSepoliaTestnet;
      break;
    case('scroll'):
      activeChain = Scroll;
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
