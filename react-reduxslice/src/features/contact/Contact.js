import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ContactSearch from "./ContactSearch"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactBook, faPlus } from '@fortawesome/free-solid-svg-icons'
// import ContactSearch from "../../components/ContactSearch";


export default function Contact() {
    const [user, setUser] = useState({
        isAdd: false
    })
    
    const handleAddForm = () => {
        setUser({
            isAdd: true
        })
    }
    const handleCancelForm = () => {
        setUser({
            isAdd: false
        })
    }
    return (
        <div>
            <div className="container shadow">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center font"><FontAwesomeIcon icon={faContactBook} /> Phone Book Apps</h1>
                    </div>
                    <div className="card-body">
                        {
                            user.isAdd ? <ContactForm cancel={handleCancelForm} />
                                :
                                <button className="button-55" onClick={handleAddForm}><FontAwesomeIcon icon={faPlus} /> Add</button>
                        }
                        <ContactSearch />
                    </div>
                </div>
            </div>
            <div>
                <div className="container px-6" >
                    <ContactList />
                </div>
            </div>
        </div>
    )
}
