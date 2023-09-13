import React,{ChangeEvent, useState} from "react";

interface IForm {
    [key: string]: string
}

export function useForm<T extends IForm>(inputValues: T): {
    values: T;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues: React.Dispatch<React.SetStateAction<T>>;
} {
    const [values, setValues] = useState<T>(inputValues);

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };

    return { values, onChange, setValues };
}
