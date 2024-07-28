import { useNftsQuery } from 'queries/useNftsQuery';
import { NftItem } from './NftItem';
import { WalletInput } from './WalletInput';
import { KnownWallet } from './KnownWallet';
import classes from './App.module.css';
import { Col, Empty, Form, Row, Space, Spin, Typography } from 'antd';
import { useDebouncedValue } from 'hooks/useDebouncedValue';

const KNOWN_WALLETS = [
    '0x3bB4Fa84B120aC0DBB4A6bb0442fE2c47E324A93',
    '0x29469395eAf6f95920E59F858042f0e28D98a20B',
    '0x24FecC42cb5FEA6c0cFde1E2A274b6D7D1167242',
];

const { Title } = Typography;
const { useForm, useWatch } = Form;
const DEBOUNCE_DELAY = 500;

export function App() {
    const [form] = useForm();
    const walletAddress: string = useWatch('address', form);
    const noErrors = form.getFieldError('address').length === 0;

    const debouncedAddress = useDebouncedValue(walletAddress, DEBOUNCE_DELAY);
    const { data, isFetching } = useNftsQuery(debouncedAddress, noErrors);
    const nfts = data?.nfts ?? [];

    return (
        <>
            <header className={classes.header}>
                <Title level={2}>Pudgy Penguins Viewer</Title>
                <Form form={form}>
                    <WalletInput className={classes.walletInput} />
                    <Space>
                        Known wallets:
                        {KNOWN_WALLETS.map((w) => (
                            <KnownWallet key={w} wallet={w} />
                        ))}
                    </Space>
                </Form>
                {nfts.length ? <Title level={3}>NFTs found: {nfts.length}</Title> : null}
            </header>
            <main>
                <Spin size="large" spinning={isFetching}>
                    {nfts.length ? (
                        <Row gutter={[16, 16]} justify="center" className={classes.grid}>
                            {nfts.map((nft) => (
                                <Col key={nft.display_image_url} className={classes.gridItem}>
                                    <NftItem nft={nft} size={256} />
                                </Col>
                            ))}
                        </Row>
                    ) : data ? (
                        <Empty
                            className={classes.empty}
                            description="Nothing found for this address"
                        />
                    ) : null}
                </Spin>
            </main>
        </>
    );
}
