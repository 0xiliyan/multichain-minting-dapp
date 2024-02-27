import React, {useState, useEffect, useRef} from "react";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay
} from '@chakra-ui/react'
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import styled from "styled-components";
import {useDisclosure} from "@chakra-ui/hooks";
import {FormControl, FormHelperText, FormLabel} from "@chakra-ui/form-control";
import {Flex, SimpleGrid} from "@chakra-ui/layout";
import {Select} from "@chakra-ui/select";
import axios from "axios";
import ColorPicker from "./ui/ColorPIcker";
import Papa from "papaparse";

const StyledDrawer = styled(Drawer)`
    color: #000;
`

const ConfigureButton = styled(Button)`
    position: absolute;
    top: 5px;
    right: 25px;
    border-radius: 20px;
`

const ConfigurationPanel = ({config, updateConfig}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const btnRef = useRef(null);

    const saveConfig = async (closeDialog = true) => {
        setIsLoading(true);
        const response = await axios.post('/api/update-config', {config});

        if (response.data.result) {
            setIsLoading(false);

            if (closeDialog) {
                onClose();
            }
        }
    }

    return (
        <>
            <ConfigureButton onClick={onOpen} colorScheme="messenger" mr={25}>Configure Minting Dapp</ConfigureButton>
            <StyledDrawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size="lg"
            >
                <DrawerContent>
                    <DrawerCloseButton color="#000" />
                    <DrawerHeader color="#000">Configure Minting Dapp</DrawerHeader>

                    <DrawerBody>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">Minting Enabled?</FormLabel>
                                <Select color="#000" onChange={(e) => updateConfig('isMintingEnabled', e.target.value)} value={config.isMintingEnabled}>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel color="#000">Current App Network</FormLabel>
                                <Select color="#000" onChange={(e) => updateConfig('rpcNetwork', e.target.value)} value={config.rpcNetwork}>
                                    <option value="testnet">zkSync Sepolia Testnet</option>
                                    <option value="mainnet">zkSync Era Mainnet</option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">NFT Token Contract Address</FormLabel>
                                <Input color="#000" onChange={(e) => updateConfig('tokenContractAddress', e.target.value)} value={config.tokenContractAddress} />
                                <FormHelperText>Contract address of your deployed NFT collection for testnet or mainnet.</FormHelperText>
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">Page Background Color</FormLabel>
                                <ColorPicker
                                    color={config.backgroundColor}
                                    onChangeComplete={hexColor => updateConfig('backgroundColor', hexColor)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="#000">Page Text Color</FormLabel>
                                <ColorPicker
                                    color={config.textColor}
                                    onChangeComplete={hexColor => updateConfig('textColor', hexColor)}
                                />
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">Button Background Color</FormLabel>
                                <ColorPicker
                                    color={config.buttonBackgroundColor}
                                    onChangeComplete={hexColor => updateConfig('buttonBackgroundColor', hexColor)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="#000">Button Text Color</FormLabel>
                                <ColorPicker
                                    color={config.buttonColor}
                                    onChangeComplete={hexColor => updateConfig('buttonColor', hexColor)}
                                />
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">Base Text Size (px)</FormLabel>
                                <Input type="number" color="#000" onChange={(e) => updateConfig('textSizePx', e.target.value)} value={config.textSizePx} />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="#000">Page Heading</FormLabel>
                                <Input color="#000" onChange={(e) => updateConfig('pageHeading', e.target.value)} value={config.pageHeading} />
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">Logo Filename</FormLabel>
                                <Input color="#000" onChange={(e) => updateConfig('logoFilename', e.target.value)} value={config.logoFilename} />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="#000">Logo Max Width (px)</FormLabel>
                                <Input color="#000" onChange={(e) => updateConfig('logoMaxWidth', e.target.value)} value={config.logoMaxWidth} />
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">Mint Button Text</FormLabel>
                                <Input color="#000" onChange={(e) => updateConfig('mintButtonLabel', e.target.value)} value={config.mintButtonLabel} />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="#000">Current Price Text</FormLabel>
                                <Input color="#000" onChange={(e) => updateConfig('currentPriceLabel', e.target.value)} value={config.currentPriceLabel} />
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacing={10} mb={5}>
                            <FormControl>
                                <FormLabel color="#000">Mint Button Border Style</FormLabel>
                                <Select color="#000" onChange={(e) => updateConfig('mintButtonBorderStyle', e.target.value)} value={config.mintButtonBorderStyle}>
                                    <option value="rounded">Rounded</option>
                                    <option value="rectangular">Rectangular</option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme='messenger' onClick={saveConfig} isLoading={isLoading}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </StyledDrawer>
        </>
    );
}

export default ConfigurationPanel;