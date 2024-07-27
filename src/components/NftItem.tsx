import type { Nft } from 'queries/useNftsQuery';

type Props = {
    nft: Nft;
    size: number;
};

export function NftItem({ nft, size }: Props) {
    return <img src={nft.display_image_url} alt={nft.description} width={size} height={size} />;
}
