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

    useEffect(() => {
        fetchTypes().then(data => photo.setTypes(data))
        fetchPhotos(null, null, 1, 8).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)
        })
    },[])

    useEffect(() => {
        fetchPhotos(photo._selectedType.id, photo._page, 8).then(data => {
            //console.log(data.count)
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)
        })
    },[photo._selectedType, photo._page])
    
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