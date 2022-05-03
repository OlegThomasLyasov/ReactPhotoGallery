import React, {useContext} from 'react';
import {Context} from "../index";
import { ListGroup } from 'react-bootstrap';
import {observer} from "mobx-react-lite";


const TypePic = observer(() => {
    
    const {photo}=useContext(Context);
    const {user} = useContext(Context)   

    return (
        <ListGroup className='mt-5'>
            {photo._types.map(type=>
                <ListGroup.Item key={type.id} action variant="secondary" active={type.id === photo._selectedType.id} onClick={()=>photo.setSelectedType(type,user)}>
                    {type.name} 
                </ListGroup.Item>
            )}
  
    </ListGroup>
    );

});

export default TypePic;