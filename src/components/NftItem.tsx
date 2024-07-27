import { Popover, Typography } from 'antd';
import type { Nft } from 'queries/useNftsQuery';

const { Text } = Typography;

type Props = {
    nft: Nft;
    size: number;
};

export function NftItem({ nft, size }: Props) {
    const content = (
        <table>
            <tbody>
                <tr>
                    <td>
                        <Text type="secondary">ID</Text>
                    </td>
                    <td>
                        <Text strong>{nft.identifier}</Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text type="secondary">Collection</Text>
                    </td>
                    <td>
                        <Text strong>{nft.collection}</Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text type="secondary">Token</Text>
                    </td>
                    <td>
                        <Text code>{nft.token_standard}</Text>
                    </td>
                </tr>
                {nft.description && (
                    <tr>
                        <td style={{ verticalAlign: 'top' }}>
                            <Text type="secondary">Description</Text>
                        </td>
                        <td style={{ maxWidth: 150 }}>{nft.description}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    return (
        <Popover title={nft.name} content={content} trigger={['click']}>
            <img src={nft.display_image_url} alt={nft.name} width={size} height={size} />
        </Popover>
    );
}
