import { type Nft, useNftsQuery } from 'queries/useNftsQuery';
import { NftItem } from './NftItem';
import { WalletInput } from './WalletInput';
import { KnownWallet } from './KnownWallet';
import classes from './App.module.css';
import { Button, Col, Form, Row, Typography } from 'antd';
import { useDebouncedValue } from 'hooks/useDebouncedValue';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';

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
    const { data, isFetching, hasNextPage, fetchNextPage } = useNftsQuery(
        debouncedAddress,
        noErrors
    );
    const allNfts = data?.pages.reduce<Nft[]>((acc, page) => acc.concat(page.nfts), []) || [];

    return (
        <>
            <header className={classes.header}>
                <Title level={2}>Pudgy Penguins Viewer</Title>
                <Form form={form} layout="vertical">
                    <WalletInput className={classes.walletInput} />
                    <div className={classes.headerRow}>
                        Known wallets:
                        {KNOWN_WALLETS.map((w) => (
                            <KnownWallet key={w} wallet={w} />
                        ))}
                    </div>
                </Form>
                <Title level={3}>
                    NFTs found:{' '}
                    {isFetching ? (
                        <LoadingOutlined />
                    ) : (
                        `${allNfts.length}${hasNextPage ? '+' : ''}`
                    )}
                </Title>
            </header>
            <main>
                {allNfts.length ? (
                    <Row gutter={[16, 16]} justify="center" align="middle">
                        {allNfts.map((nft) => (
                            <Col key={nft.display_image_url} className={classes.gridItem}>
                                <NftItem nft={nft} size={256} />
                            </Col>
                        ))}
                        {hasNextPage && (
                            <Col>
                                <Button
                                    icon={<ReloadOutlined />}
                                    size="large"
                                    onClick={() => fetchNextPage()}
                                    loading={isFetching}
                                >
                                    Show more
                                </Button>
                            </Col>
                        )}
                    </Row>
                ) : null}
            </main>
        </>
    );
}
