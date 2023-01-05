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
    // [dispatch] itu watcher / penonton yg []
    //klo variable berubah ngerender /jalan ulang

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
                contacts.map((user, index) => (
                    <ContactItem
                        key={user.id}
                        no={index + 1}
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



