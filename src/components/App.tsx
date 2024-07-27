import { useState } from 'react';
import { useNftsQuery } from 'queries/useNftsQuery';
import { NftItem } from './NftItem';
import { WalletInput } from './WalletInput';
import classes from './App.module.css';
import { Col, Empty, Row, Typography } from 'antd';
import { useDebouncedValue } from 'hooks/useDebouncedValue';
import { isValidEthereumAddress } from 'utils/isValidEthereumAddress';

const { Title } = Typography;
const DEBOUNCE_DELAY = 500;

export function App() {
    const [walletAddress, setWalletAddress] = useState('');
    const [walletError, setWalletError] = useState('');
    const debouncedAddress = useDebouncedValue(walletAddress, DEBOUNCE_DELAY);
    const { data, isFetching } = useNftsQuery(debouncedAddress);
    const nfts = data?.nfts ?? [];

    const handleAddressChange = (newAddress: string) => {
        setWalletAddress(newAddress);
        setWalletError(
            isValidEthereumAddress(newAddress) ? '' : 'Please enter a valid Ethereum address'
        );
    };

    return (
        <>
            <header className={classes.header}>
                <Title level={2}>Pudgy Penguins Viewer</Title>
                <WalletInput
                    value={walletAddress}
                    error={walletError}
                    searching={isFetching}
                    className={classes.walletInput}
                    onChange={handleAddressChange}
                />
                {nfts.length ? <Title level={3}>NFTs found: {nfts.length}</Title> : null}
            </header>
            <main>
                {nfts.length ? (
                    <Row gutter={[16, 16]} justify="center" className={classes.grid}>
                        {nfts.map((nft) => (
                            <Col key={nft.display_image_url} className={classes.gridItem}>
                                <NftItem nft={nft} size={256} />
                            </Col>
                        ))}
                    </Row>
                ) : data ? (
                    <Empty className={classes.empty} description="Nothing found for this address" />
                ) : null}
            </main>
        </>
    );
}
