import { useInfiniteQuery } from '@tanstack/react-query';

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
    next?: string;
};

const LIMIT = 10;
const COLLECTION_SLUG = 'pudgypenguins';
const EMPTY_RESPONSE: NftsResponse = {
    nfts: [],
};

export function useNftsQuery(walletAddress: string, enabled: boolean) {
    return useInfiniteQuery({
        queryKey: ['nfts', walletAddress],
        queryFn: ({ pageParam }) => fetchNfts(walletAddress, LIMIT, pageParam),
        getNextPageParam: (lastPage) => lastPage.next,
        initialPageParam: '',
        enabled: !!walletAddress && enabled,
        retry: false,
        staleTime: 0,
    });
}

async function fetchNfts(
    walletAddress: string,
    limit: number,
    nextCursor: string | undefined
): Promise<NftsResponse> {
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

    if (!response.ok) {
        // some error tracking may be added here
        try {
            const parsed = await response.json();
            console.error(parsed);
        } catch {
            console.error(response.status, response.statusText);
        }
        return EMPTY_RESPONSE;
    }

    return response.json();
}
