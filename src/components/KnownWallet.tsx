import { Form, Button } from 'antd';

const { useFormInstance } = Form;

type Props = {
    wallet: string;
};

export function KnownWallet({ wallet }: Props) {
    const form = useFormInstance();

    const handleClick = () => {
        form.setFieldValue('address', wallet);
    };

    return (
        <Button size="small" onClick={handleClick}>
            {`${wallet.substring(0, 6)}...`}
        </Button>
    );
}
