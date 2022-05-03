import React  from "react";
import {Col, Container, Row} from "react-bootstrap";
import PhotoList from "../components/PhotoList";
import TypePic from "../components/typebar";
import { useContext, useEffect } from "react";
import { Context } from "../index";
import { fetchTypes, fetchPhotos } from "../http/photoAPI";
import Pages from "../components/Pages";

const Photogallery =()=>{

    const {photo} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => photo.setTypes(data))
        console.log(user)
        fetchPhotos(null, null, 1, 8).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)
        })
    },[user._isAuth])
    
    return (
       <Container>
           <Row>
               <Col md={3}>
               <TypePic></TypePic>
               </Col>
               <Col md={9}>
               <PhotoList></PhotoList>
               <Pages/>
               </Col>
           </Row>
        </Container>
    )
};

export default Photogallery;