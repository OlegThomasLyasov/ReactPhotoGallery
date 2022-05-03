import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import {PHOTO_ROUTE} from "../utils/consts";
import { useEffect,useState } from "react";
import { getOne } from '../http/UserApi';


const PhotoItem = ({photo}) => {
    const history = useHistory()//передвигаться по страницам

    const [User, setUser] = useState('')
    
    useEffect(() => {
        if (photo.userId!=undefined || photo.userId!=null){
                getOne(photo.userId).then(data => setUser(data))
               }
       }, [photo.userId])
    
    return (
        <Col md={3} sm={4} className={"mt-5"} onClick={() => history.push(PHOTO_ROUTE + '/' + photo.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={140} height={140} src={'http://localhost:5000/' + photo.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{User.email}</div>
                </div>
                <div>{photo.name}</div>
            </Card>
        </Col>
    );
};

export default PhotoItem;