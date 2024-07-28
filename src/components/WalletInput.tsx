import { Form, Input } from 'antd';
import { isValidEthereumAddress } from 'utils/isValidEthereumAddress';

const { Item } = Form;

type Props = {
    className?: string;
};

export function WalletInput({ className }: Props) {
    return (
        <Item
            name="address"
            rules={[
                { required: true, message: 'Please enter Ethereum wallet address' },
                { validator: validateEthereumAddress },
            ]}
        >
            <Input
                autoComplete="off"
                className={className}
                size="large"
                placeholder="Enter the wallet address"
            />
        </Item>
    );
}

function validateEthereumAddress(_: unknown, value: string) {
    if (value && !isValidEthereumAddress(value)) {
        return Promise.reject(new Error('Invalid Ethereum address'));
    }
    return Promise.resolve();
}
