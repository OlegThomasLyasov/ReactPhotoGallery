import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import {PHOTO_ROUTE} from "../utils/consts";

const PhotoItem = ({photo}) => {
    const history = useHistory()//передвигаться по страницам
    return (
        <Col md={3} sm={4} className={"mt-5"} onClick={() => history.push(PHOTO_ROUTE + '/' + photo.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={'http://localhost:5000/' + photo.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Потрясающее фото</div>
                </div>
                <div>{photo.name}</div>
            </Card>
        </Col>
    );
};

export default PhotoItem;