import { useQuery } from '@tanstack/react-query';

export type Nft = {
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    name: string;
    description: string;
    image_url: string;
    display_image_url: string;
    display_animation_url: string | null;
    metadata_url: string;
    opensea_url: string;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
};

export type NftsResponse = {
    nfts: Nft[];
};

const LIMIT = 50;
const COLLECTION_SLUG = 'pudgypenguins';
const EMPTY_RESPONSE: NftsResponse = {
    nfts: [],
};

// address with some Pudgy Penguins: 0x3bB4Fa84B120aC0DBB4A6bb0442fE2c47E324A93
export function useNftsQuery(walletAddress: string) {
    return useQuery<NftsResponse>({
        queryKey: ['nfts', walletAddress],
        queryFn: () => fetchNfts(walletAddress, LIMIT, undefined),
        enabled: !!walletAddress,
        retry: false,
    });
}

async function fetchNfts(walletAddress: string, limit: number, nextCursor: string | undefined) {
    const params = new URLSearchParams();
    params.set('owner', walletAddress);
    params.set('collection', COLLECTION_SLUG);
    params.set('limit', limit.toString());
    if (nextCursor) {
        params.set('next', nextCursor);
    }

    const response = await fetch(
        `https://api.opensea.io/api/v2/chain/ethereum/account/${walletAddress}/nfts?${params}`,
        {
            headers: {
                'X-API-KEY': import.meta.env.VITE_OPENSEA_API_KEY,
            },
        }
    );

    return response.ok ? response.json() : EMPTY_RESPONSE;
}
