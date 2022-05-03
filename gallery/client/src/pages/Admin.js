import React, {useState,useEffect,useContext} from 'react';
import {Button, Container} from "react-bootstrap";
import CreatePhoto from '../components/CreatePhoto';
import {Context} from "../index";
import {Col,Row, Card, Image} from "react-bootstrap";
import PhotoList from "../components/PhotoList";
import Pages from "../components/Pages";
import { fetchPhotos, fetchOnePhoto } from '../http/photoAPI';
import {PHOTO_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom"

const Admin = () => {

    const {user} = useContext(Context)
    const {photo} = useContext(Context)
    const [photoVisible, setphotoVisible] = useState(false)
    const [Photo, setPhoto] = useState({info: []})
    const history = useHistory()
    
    useEffect(() =>{
        fetchPhotos(2,user._user.id,photo._page, 8).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)    
        })
        //console.log(photo)
    },[photo._photo])


    useEffect(() => {
        fetchOnePhoto(photo._photo[photo._photo.length-1].id).then(data => setPhoto(data))
    }, [photo])


    return (

        <Container className="d-flex flex-column">
            <Row>
                <Col md={4} className='gy-4'>
                <h2>Фото профиля</h2>
            <Card style={{width: 250, cursor: 'pointer'}} border={"light"} onClick={() => history.push(PHOTO_ROUTE + '/' + Photo.id)}>
                <Image width={350} height={350} src={'http://localhost:5000/' + Photo.img} />
                <Row className="d-flex flex-column align-items-center">        
                </Row>

            </Card>
            </Col>

               <Col md={8}>
               <Row className="d-flex flex-column align-items-center mt-4">
                        <h2>Галерея фото</h2>
                </Row>
                
               <PhotoList></PhotoList>
               <Pages/>
               </Col>
               
           </Row>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2 mb-4"
                width={500}
                onClick={() => setphotoVisible(true)}
            >
                Добавить фото
            </Button>

            <CreatePhoto show={photoVisible} onHide={() => setphotoVisible(false)}/>

        </Container>
    );
};

export default Admin;