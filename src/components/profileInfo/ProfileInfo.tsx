import style from "../../pages/profile/profile.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
// import {useDispatch} from "react-redux";
import {updateUserData} from "../../services/actions/updateUserData";
import {useDispatch, useSelector} from "../../services/store/typesStore";
import {useForm} from "../../hook/Form";

interface IForm {
    email: string,
    password: string,
    name: string
}

export const ProfileInfo:FC =() => {
    const dispatch = useDispatch();
    const {email, name}:IForm = useSelector((state) => state.regNewUser);

    const {values: form, setValues, onChange} = useForm({email, name, password: ''})
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const onReset = ():void => {
        setValues({name,email, password: '' })
    };

    const onIconClick = ():void => {
        setTimeout(() => inputRef.current?.focus(), 0);

    }
    const saveUserChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUserData(form))
    }

    return <div>
        <form onSubmit={saveUserChange} className={`${style.inputs} ml-15`}>
            <div>

                <Input
                    type={'text'}
                    placeholder={'имя'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>
            <div className='mt-6'>
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder="email"
                    isIcon={true}
                    extraClass="mb-2"
                />
            </div>
            <div className='mt-5'>
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    icon="EditIcon"
                />
            </div>
            <div className={`${style.buttonsBox} mt-15`}>
                <Button  htmlType="submit" type= "primary" size="large">Сохранить</Button>
                <Button onClick={onReset}
                        htmlType="reset" type= "primary"
                        size="large">Отменить</Button>
            </div>
        </form>
    </div>
}