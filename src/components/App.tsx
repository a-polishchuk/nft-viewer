import { useState } from 'react';
import { useNftsQuery } from 'queries/useNftsQuery';
import { NftItem } from './NftItem';

export function App() {
    const [walletAddress, setWalletAddress] = useState('');
    const { data } = useNftsQuery(walletAddress);

    return (
        <>
            <header>
                <label>Wallet address:</label>
                <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
            </header>
            <main>
                {data?.nfts?.map((nft) => (
                    <NftItem key={nft.display_image_url} nft={nft} size={256} />
                ))}
            </main>
        </>
    );
}
