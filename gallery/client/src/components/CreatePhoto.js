import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../index";
import {createPhoto} from "../http/photoAPI";
import {observer} from "mobx-react-lite";
import { ADMIN_ROUTE, PHOTOGALLERY_ROUTE } from '../utils/consts';
import { useHistory } from 'react-router-dom';

const CreatePhoto = observer(({show, onHide}) => {
    
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const {user} = useContext(Context)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addPhoto = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', file)
        formData.append('typeId', 4)
        formData.append('userId', user._user.id)
        formData.append('textPhoto', info)
        createPhoto(formData).finally(data => onHide())
        //console.log(info)
        alert(`Фото ${name} успешно добавлено!`)
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить фото
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название фото"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea" rows={3}
                        type="text"
                        onChange={e => setInfo(e.target.value)}
                        placeholder="Введите описание фото"
                    />
                    </Form.Group>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPhoto}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePhoto;