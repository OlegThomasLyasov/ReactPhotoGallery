import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import PhotoItem from './PhotoItem';

const PhotoList = observer(() => {
    const {photo} = useContext(Context)

    return (
        <Row className="d-flex">
            {photo._photo.map(photo =>
                <PhotoItem key={photo.id} photo={photo}/>
            )}
        </Row>
    );
});

export default PhotoList;