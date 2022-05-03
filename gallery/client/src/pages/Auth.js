import React, {useContext, useEffect, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, PHOTOGALLERY_ROUTE} from "../utils/consts";
import {login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()//использование хука useLocation
    const history = useHistory()//переход на страницу фотогаллереи
    const isLogin = location.pathname === LOGIN_ROUTE //проверка с страницей с логином
    const [email, setEmail] = useState('')
    const [emailDirty,setEmailDirty] = useState(false)
    const [passwordDirty,setpasswordDirty] = useState(false)
    const [password, setPassword] = useState('')
    const [emailError,setEmailError] = useState('Email не может быть пустым')
    const [passwordError,setpasswordError] = useState('Пароль не должен быть пустым')
    const [formValid,setFormValid] = useState(false)

    useEffect(()=>{
        if (emailError||passwordError){
            setFormValid(true)
        }
        else{
            setFormValid(false)
        }

    },[emailError,passwordError]);


    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);//переход на функцию проверки
            } else {
                data = await registration(email, password);//переход на функцию регистрации
                //console.log(data)
                alert (`Пользователь ${data.email} успешно зарегистрирован!`)
            }
            user.setUser(data)
            user.setIsAuth(true)
            history.push(PHOTOGALLERY_ROUTE)

        } 
        catch (e) {
            alert("Ошибка! Заполните верно поля авторизации")
        }
        
    }

    const Blur =(e)=>{
        //console.log(e)
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setpasswordDirty(true)
                break
            default:
                setpasswordDirty(false)
        }
    }

    const emailHandler = (e) =>{
        setEmail(e.target.value)
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase()))
        {
            setEmailError('Некорректный email')
        }
        else{
            setEmailError("")
        }
    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value)
        const uppercaseRegExp   = /(?=.*?[A-ZА-Я])/;
        const lowercaseRegExp   = /(?=.*?[a-zа-я])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-.])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength =      e.target.value.length;
        const uppercasePassword =   uppercaseRegExp.test(e.target.value);
        const lowercasePassword =   lowercaseRegExp.test(e.target.value);
        const digitsPassword =      digitsRegExp.test(e.target.value);
        const specialCharPassword = specialCharRegExp.test(e.target.value);
        const minLengthPassword =   minLengthRegExp.test(e.target.value);
        let errMsg ="";
        if(passwordLength===0){
                errMsg="Пароль не должен быть пустой";
        }else if(!uppercasePassword){
                errMsg="Пароль должен содержать хотя бы символ в верхнем регистре";
        }else if(!lowercasePassword){
                errMsg="Пароль должен содержать хотя бы символ в нижнем регистре";
        }else if(!digitsPassword){
                errMsg="Пароль должен содержать хотя бы 1 цифру";
        }else if(!specialCharPassword){
                errMsg="Пароль должен содержать спец. символ";
        }else if(!minLengthPassword){
                errMsg="Пароль должен иметь длину больше 8 символов";
        }else{
            errMsg="";
        }
        setpasswordError(errMsg);

    }
    

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                {(emailDirty && emailError && !isLogin) && <div className='mt-3' style={{color:'red'}} >{emailError}</div>}
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email"
                        value={email}
                        name = 'email'
                        onChange={e => emailHandler(e)} 
                        onBlur = {e => Blur(e)}
                    />

                    {(passwordDirty && passwordError && !isLogin) && <div className='mt-3' style={{color:'red'}} >{passwordError}</div>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={e => passwordHandler(e)}
                        type="password"
                        name = 'password'
                        onBlur = {e => Blur(e)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            className="mt-3 align-self-end"
                            disabled={isLogin ? !formValid : formValid}
                        >
                            {isLogin ? 'Войти'  : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;