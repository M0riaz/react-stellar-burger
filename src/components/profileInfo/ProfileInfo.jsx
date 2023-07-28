import style from "../../pages/profile/profile.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {updateUserData} from "../../services/actions/regestrationUser";
import {useDispatch, useSelector} from "react-redux";


export const ProfileInfo =() => {
    const dispatch = useDispatch();
    const {email, name, isAuth} = useSelector(state => state.regNewUser);
    const [form, setForm] = React.useState({email: email, name: name, password: ''});

    const inputRef = React.useRef(null);

    const onChange = (e) => {
        e.preventDefault()
        setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
    };

    const onReset = (e) => {
        e.preventDefault()
        setForm({ name: name, email: email, password: '' })
    };

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);

    }
    const saveUserChange = (e) => {
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
                <Button onClick={onReset} htmlType="reset" type= "primary" size="large">Отменить</Button>
            </div>
        </form>
    </div>
}