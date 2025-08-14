import Input from './Input';
import Button from './Button';
import { useState } from 'react';

export default function Form({ dataConfig, errorConfig = [], submit }) {
    const [data, setData] = useState(
        dataConfig.reduce((acc, input) => {
            acc[input.name] = input.default ?? '';
            return acc;
        }, {})
    );
    const [error, setError] = useState(null);
    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            {dataConfig.map((input) => {
                const { name, options, ...rest } = input;
                return (
                    <Input
                        key={name}
                        value={data[name]}
                        onChange={(value) =>
                            setData((prev) => ({ ...prev, [name]: value }))
                        }
                        {...rest}
                    >
                        {options &&
                            options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                    </Input>
                );
            })}
            <Button
                width="20"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    for (const error of errorConfig) {
                        if (error.condition(data)) {
                            console.log('error', error.message);
                            setError(error.message);
                            return;
                        }
                    }
                    setError(null);
                    submit(data);
                }}
            >
                Submit
            </Button>
            <p className={'text-red-500 ' + (!error && 'hidden')}>{error}</p>
        </form>
    );
}
