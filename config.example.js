// it is not recommended to edit this configuration directly, use the provided UI instead
export default {
    showConfigurationPanel: true, // set this to false on real deployment
    rpcNetwork: '',  // testnet, mainnet for the specific network, you can find all supported values below
    nftContractAddress: '', // Your NFT token contract address, please note it will be different for Testnet (currently Sepolia) and zkSync Mainnet
    thirdWebClientId: '',
    // frontend configuration
    isMintingEnabled: false,
    backgroundColor: '#200052',
    textColor: '#6BF6F0',
    textSizePx: '12',
    buttonBackgroundColor: '#836ef9',
    buttonColor: '#FFFFFF',
    logoFilename: 'logo.png',
    logoMaxWidth: 'auto',
    pageHeading: 'Public Mint for Demo Collection',
    mintButtonBorderStyle: 'rounded', // rounded, rectangular
    mintButtonLabel: 'MINT',
    currentPriceLabel: 'MINT PRICE:',
    maxMintsForUser: '',
}

// supported rpc networks
// -----------------------------------
// lineaTestnet
// linea
// zksyncTestnet
// zksync