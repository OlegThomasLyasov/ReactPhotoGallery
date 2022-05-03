import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../index";
import {createPhoto} from "../http/photoAPI";
import {observer} from "mobx-react-lite";

const CreatePhoto = observer(({show, onHide}) => {
    
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const {user} = useContext(Context)
    

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    
    function getRandomInt(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
      }

    const addPhoto = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', file)
        formData.append('typeId', 2)
        formData.append('userId', user._user.id)
        formData.append('textPhoto', info)
        createPhoto(formData).finally(data => onHide())

        /* const formDataSpec = new FormData()
        formDataSpec.append('name', name)
        formDataSpec.append('img', file)
        let rand = getRandomInt(3,6)
        console.log(rand)
        formDataSpec.append('typeId', rand)
        formDataSpec.append('userId', user._user.id)
        formDataSpec.append('textPhoto', info)
        createPhoto(formDataSpec).finally(data => onHide()) */

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