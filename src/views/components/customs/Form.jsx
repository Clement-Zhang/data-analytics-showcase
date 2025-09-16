import Input from './Input';
import Button from './Button';
import { useModal } from '../../../globals/modal';
import { useState } from 'react';

export default function Form({ dataConfig, errorConfig = [], submit }) {
    const [data, setData] = useState(
        dataConfig.reduce((acc, input) => {
            acc[input.name] = input.default || '';
            return acc;
        }, {})
    );
    const { closeModal } = useModal();
    const [error, setError] = useState(null);
    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            {dataConfig.map((input) => {
                const { name, options, label, ...rest } = input;
                return (
                    <>
                        {label && <label htmlFor={name}>{label}</label>}
                        <Input
                            key={name}
                            value={data[name]}
                            onChange={(value) =>
                                setData((prev) => ({ ...prev, [name]: value }))
                            }
                            {...(label && { id: name })}
                            {...rest}
                        >
                            {options &&
                                options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                        </Input>
                    </>
                );
            })}
            <Button
                width="20"
                onClick={(e) => {
                    for (const error of errorConfig) {
                        if (error.condition(data)) {
                            setError(error.message);
                            return;
                        }
                    }
                    setError(null);
                    submit(data);
                    closeModal();
                }}
            >
                Submit
            </Button>
            <p className={'text-red-500 ' + (!error && 'hidden')}>{error}</p>
        </form>
    );
}
