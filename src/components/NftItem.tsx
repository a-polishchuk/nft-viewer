import { Card, Descriptions, Modal } from 'antd';
import type { DescriptionsItemType } from 'antd/es/descriptions';
import type { Nft } from 'queries/useNftsQuery';
import { useState } from 'react';

const { Meta } = Card;

const PADDING = 24;

type Props = {
    nft: Nft;
    size: number;
};

export function NftItem({ nft, size }: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Card
                hoverable
                style={{ width: 256 }}
                cover={
                    <img src={nft.display_image_url} alt={nft.name} width={size} height={size} />
                }
                onClick={() => setModalVisible(true)}
            >
                <Meta title={nft.name} description={nft.description} />
            </Card>
            <Modal
                centered
                closable
                width={(size + PADDING) * 2}
                title={nft.name}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <img
                    src={nft.display_image_url}
                    alt={nft.name}
                    width={size * 2}
                    height={size * 2}
                />
                <Descriptions bordered layout="vertical" items={buidlDescriptionItems(nft)} />
            </Modal>
        </>
    );
}

function buidlDescriptionItems(nft: Nft): DescriptionsItemType[] {
    return [
        {
            key: 'id',
            label: 'ID',
            children: nft.identifier,
        },
        {
            key: 'collection',
            label: 'Collection',
            children: nft.collection,
        },
        {
            key: 'token',
            label: 'Token',
            children: nft.token_standard,
        },
        {
            key: 'description',
            label: 'Description',
            children: nft.description,
        },
    ];
}
