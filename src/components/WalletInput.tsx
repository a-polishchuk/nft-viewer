import { AutoComplete, Input } from 'antd';

const { Search } = Input;

type Props = {
    value: string;
    error: string;
    searching: boolean;
    className?: string;
    onChange: (newValue: string) => void;
};

const KNOWN_WALLETS = [{ value: '0x3bB4Fa84B120aC0DBB4A6bb0442fE2c47E324A93' }];

export function WalletInput({ value, error, searching, className, onChange }: Props) {
    return (
        <AutoComplete options={KNOWN_WALLETS} onSelect={onChange}>
            <Search
                className={className}
                size="large"
                placeholder="Enter the wallet address"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                enterButton="Search"
                loading={searching}
                status={error ? 'error' : undefined}
            />
        </AutoComplete>
    );
}
