import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreatePhoto from '../components/CreatePhoto';

const Admin = () => {

    const [photoVisible, setphotoVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setphotoVisible(true)}
            >
                Добавить фото
            </Button>

            <CreatePhoto show={photoVisible} onHide={() => setphotoVisible(false)}/>

        </Container>
    );
};

export default Admin;