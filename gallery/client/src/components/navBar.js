import React, {useContext, useState} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, ADMIN_ROUTE, REGISTRATION_ROUTE, PHOTOGALLERY_ROUTE} from "../utils/consts";
import {Button,Row, Col} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom';


const NavBar = observer(() => {
    
    const {user} = useContext(Context)
    const history = useHistory()

    let data = new Proxy(user,{get(target,email){
    return email;}
    });

    //console.log(data);
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        history.push(PHOTOGALLERY_ROUTE)
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <NavLink style={{color:'white'}} className='text-decoration-none' to={ PHOTOGALLERY_ROUTE}>ФотографииНаПамять</NavLink>   

                {user._isAuth ?
                    <Nav  style={{color: 'white'}}>
                        <Button 
                            size="sm"
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                           Пользователь {user._user.email}
                        </Button>
                        <Button 
                            size="sm"
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav style={{color: 'white'}}>
                        <Button variant={"outline-light"} size="sm" onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                        <Button variant={"outline-light"} size="sm" onClick={() => history.push(REGISTRATION_ROUTE)}>Регистрация</Button>
                    </Nav>
                }
               
  
            </Container>
        </Navbar>

    );
});

export default NavBar;