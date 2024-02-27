import React, {useState, useEffect, useRef} from "react";
import styled, {css} from 'styled-components';
import GlobalStyles from "../components/globalStyles";
import config from "../config";
import {ChakraProvider} from '@chakra-ui/react'
import ConfigurationPanel from "../components/ConfigurationPanel";
import { useClaimNFT, useContract, useTotalCirculatingSupply, useActiveClaimCondition,
  useTotalCount, useAddress, ConnectWallet, Web3Button } from "@thirdweb-dev/react";

const ErrorMessage = styled.div`
    color: #ff0000;
    margin-bottom: 10px;
    font-size: ${props => props.textSizePx * 1.6 + 'px'};
`

const ConnectWalletContainer = styled.div`
    margin: 15px;
`

const MintContainer = styled.div`
    margin: 30px auto;
    text-align: center;
`

const StyledButton = styled.div`
  button {
    padding: 10px 25px;
    border: 0px;
    font-size: ${props => props.textSizePx * 1.6 + 'px'};
    font-weight: 700;
    cursor: pointer;
    background: ${props => props.background};
    color: ${props => props.color};    
    border-radius: ${props => props.borderStyle == 'rounded' ? '20px' : 'none' }    
  }
`

const CurrentPrice = styled.div`
    font-size: ${props => props.textSizePx * 2 + 'px'};
    margin: 30px;
`

const CollectionLogo = styled.img`
    margin: 40px auto 100px;
    ${props => props.width && `
        max-width: ${props.width};
    `};
`

const SelectMintsForUser = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    margin: auto;
    margin-bottom: 20px;
`

const RemoveMint = styled.div`
    height: 32px;
    width: 32px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.background};
    color: ${props => props.color};
    font-size: ${props => props.textSizePx * 1.2 + 'px'};
    cursor: pointer;
`

const AddMint = styled(RemoveMint)`
    
`

const MintsForUser = styled.div`
    font-size: ${props => props.textSizePx * 2.5 + 'px'};
`

const Heading = styled.h1`
    font-size: ${props => props.textSizePx * 2.5 + 'px'};
    margin-top: 20px;
`

const TotalMinted = styled.div`
    margin: 20px 0px 20px 0px;
    font-size: ${props => props.textSizePx * 2.5 + 'px'};
`

const CountdownContainer = styled.div`
    text-align: center;
    font-size: ${props => props.textSizePx * 3 + 'px'};
`

const Index = () => {
    const [currentConfig, setCurrentConfig] = useState(config);
    const [mintsForUser, setMintsForUser] = useState(1);
    const [error, setError] = useState();
    const [mintingEnabled, setMintingEnabled] = useState(currentConfig.isMintingEnabled);

    const { contract } = useContract(config.nftContractAddress);
    const { data: nftMintedCount } = useTotalCirculatingSupply(contract);
    const { data: nftTotalCount } = useTotalCount(contract);
    const { mutate: claimNft, isLoading: claimLoading, error: claimError } = useClaimNFT(contract);
    const { data: activeClaimCondition } = useActiveClaimCondition(contract);
    const connectedAddress = useAddress();

    useEffect(() => {
        setMintingEnabled(currentConfig.isMintingEnabled);
    }, [currentConfig.isMintingEnabled]);

    const decreaseMintsForUser = () => {
        const newMintsForUser = mintsForUser -1;

        if (newMintsForUser >= 1) {
            setMintsForUser(newMintsForUser);
        }
    }

    const increaseMintsForUser = () => {
        const newMintsForUser = mintsForUser + 1;

        if (newMintsForUser <= currentConfig.maxMintsForUser) {
            setMintsForUser(newMintsForUser);
        }
    }

    const updateConfig = (key, value) => {
        const newConfig = {...currentConfig};
        newConfig[key] = value;
        setCurrentConfig(newConfig);
    }

    return (
        <ChakraProvider>
            <MintContainer>
            <GlobalStyles background={currentConfig.backgroundColor} color={currentConfig.textColor} textSizePx={currentConfig.textSize} />
            {error && <ErrorMessage textSizePx={currentConfig.textSizePx}>{error}</ErrorMessage>}
            <Heading textSizePx={currentConfig.textSizePx}>{currentConfig.pageHeading}</Heading>
            <CollectionLogo src={`/images/${currentConfig.logoFilename}`} width={currentConfig.logoMaxWidth} />
            <TotalMinted textSizePx={currentConfig.textSizePx}>{nftMintedCount?.toNumber()} / {nftTotalCount?.toNumber()}</TotalMinted>
            <ConnectWalletContainer textSizePx={currentConfig.textSizePx}>
                <StyledButton borderStyle={currentConfig.mintButtonBorderStyle} textSizePx={currentConfig.textSizePx} background={currentConfig.buttonBackgroundColor} color={currentConfig.buttonColor}>
                  <ConnectWallet />
                </StyledButton>
            </ConnectWalletContainer>
            <CurrentPrice textSizePx={currentConfig.textSizePx}>
              {currentConfig.currentPriceLabel} {activeClaimCondition?.currencyMetadata.displayValue} {activeClaimCondition?.currencyMetadata.symbol}
            </CurrentPrice>
            <SelectMintsForUser>
                <RemoveMint onClick={decreaseMintsForUser} background={currentConfig.buttonBackgroundColor} color={currentConfig.buttonColor} textSizePx={currentConfig.textSizePx}>-</RemoveMint>
                <MintsForUser textSizePx={currentConfig.textSizePx}>{mintsForUser}</MintsForUser>
                <AddMint onClick={increaseMintsForUser} background={currentConfig.buttonBackgroundColor} color={currentConfig.buttonColor}>+</AddMint>
            </SelectMintsForUser>
            {mintingEnabled && contract &&
                    <StyledButton borderStyle={currentConfig.mintButtonBorderStyle} textSizePx={currentConfig.textSizePx} background={currentConfig.buttonBackgroundColor} color={currentConfig.buttonColor}>
                      <Web3Button
                        contractAddress={config.nftContractAddress}
                        action={() =>
                          claimNft({
                            to: connectedAddress, 
                            quantity: 1,
                          })
                        }
                      >
                        {currentConfig.mintButtonLabel}
                    </Web3Button>
                  </StyledButton>
            }
            {config.showConfigurationPanel ?
                <ConfigurationPanel config={currentConfig} updateConfig={updateConfig}/> : null
            }
        </MintContainer>
        </ChakraProvider>
    );
}

export default Index;