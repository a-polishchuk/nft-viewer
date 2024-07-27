import Web3 from 'web3';

const web3 = new Web3();

export function isValidEthereumAddress(address: string) {
    return web3.utils.isAddress(address);
}
