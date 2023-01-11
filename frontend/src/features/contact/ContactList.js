import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../../components/ContactItem"
import {
    readContactAsync,
    selectContact,
    deleteContactAsync,
    createContactAsync,
    updateContactAsync,
    pagination
} from './contactSlice'


export default function ContactList(props) {
    const contacts = useSelector(selectContact)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readContactAsync())
    }, [dispatch])

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(pagination())
        }
    }


    return (
        <div
             onScroll={scrolling}
            style={{ overflowY: "scroll", height: 350 }}
            className="card-b shadow  mt-5 mx-auto d-flex justify-content-evenly d-flex flex-wrap " >
            {
                contacts.map(user => (
                    <ContactItem
                        key={user.id}
                        contact={user}
                        sent={user.sent}
                        remove={() => dispatch(deleteContactAsync(user.id))}
                        resend={() => dispatch(createContactAsync({ id: user.id, name: user.name, phone: user.phone }))}
                        update={(name, phone) => dispatch(updateContactAsync({ id: user.id, name, phone}))}
                    />
                ))
            }
        </div>
    )
}



