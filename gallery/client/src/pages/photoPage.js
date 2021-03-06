import React, {useEffect, useState, useContext} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOnePhoto} from "../http/photoAPI";
import { getOne } from '../http/UserApi';
import {Context} from "../index";

const PhotoPage = () => {

    const [Photo, setPhoto] = useState({info: []})
    const {user} = useContext(Context)
    const [User, setUser] = useState('')

    const {id} = useParams()

    useEffect(() => {
        
        fetchOnePhoto(id).then(data => setPhoto(data))
    }, [])

    

    useEffect(() => {
        //fetchOnePhoto(id).then(data => setPhoto(data))
        if (Photo.userId!=undefined || Photo.userId!=null){
                getOne(Photo.userId).then(data => setUser(data))
               }
    }, [])


    return (
        <Container className="mt-5">
            <Row >
                <Col md={7} >
                    <Image width={350} height={350} src={'http://localhost:5000/' + Photo.img}/>
                </Col>
                <Col md={5} >
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{Photo.name}</h2>
                        <Row className="ml-3">Владелец фотографии: {User.email}</Row>
                    </Row>
                    
                <Row >
                    <h4 className='d-flex flex-column align-items-center mt-4'>Описание фотографии</h4>
                    <div>{Photo.textPhoto}</div>
                </Row>
                </Col>
            </Row>
            
        </Container>
    );
    
};


export default PhotoPage;