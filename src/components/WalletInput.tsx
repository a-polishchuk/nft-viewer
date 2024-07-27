import { Input } from 'antd';

const { Search } = Input;

type Props = {
    value: string;
    searching: boolean;
    className?: string;
    onChange: (newValue: string) => void;
};

export function WalletInput({ value, searching, className, onChange }: Props) {
    return (
        <Search
            className={className}
            size="large"
            placeholder="Enter the wallet address"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            enterButton="Search"
            loading={searching}
        />
    );
}
