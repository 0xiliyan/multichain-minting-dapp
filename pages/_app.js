import '../styles/globals.css';
import { ZksyncSepoliaTestnet } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import config from "../config";

function MyApp({ Component, pageProps }) {
  return <ThirdwebProvider
          activeChain={ ZksyncSepoliaTestnet }
          clientId={config.thirdWebClientId}
        >
          <Component {...pageProps} />
        </ThirdwebProvider>   
}

export default MyApp
