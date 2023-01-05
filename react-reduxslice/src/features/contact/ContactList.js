import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";


import ContactItem from "../../components/ContactItem"
import {
    loadContactAsync, loadPagination, addContactAsync, removeContactAsync, updateContactAsync, selectContact
}from './contactSlice'


export default function ContactList(props) {

    const contacts = useSelector(selectContact) 

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadContactAsync())
    }, [dispatch])
    // [dispatch] itu watcher / penonton yg []
    //klo variable berubah ngerender /jalan ulang

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(loadPagination())
        }
    }

 
        return (
            <div
                onScroll={scrolling}
                style={{ overflowY: "scroll", height: 350 }}
                className="card-b shadow  mt-5 mx-auto d-flex justify-content-evenly d-flex flex-wrap " >
                {
                    contacts.map((user, index) => (
                        <ContactItem
                            key={user.id}
                            no={index + 1}
                            contact={user}
                            sent={user.sent}
                            remove={() => dispatch(removeContactAsync(user.id))}
                            resend={() => dispatch(addContactAsync(user.id, user.name, user.phone))}
                            update={(name, phone) => dispatch(updateContactAsync(user.id, name, phone))}
                        />
                    ))
                }
            </div>
        )
    }



