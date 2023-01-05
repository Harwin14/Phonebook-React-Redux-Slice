import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { search } from './contactSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function ContactForm() {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        isAdd: false,
        name: '',
        phone: ''
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(search({ name: user.name, phone: user.phone }))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])



    return (
        <div className="card mt-3">
            <div className="card-header font"><FontAwesomeIcon icon={faMagnifyingGlass} /> Search Form
            </div>
            <form className="g-3 my-2 px-4"
                onSubmit={handleSubmit}
            >
                <div className="d-flex">
                    <div className="d-flex align-items-center me-2">
                        <div className="me-1 fw-bold">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="ms-1">
                            <input type="text" className="form-control" name="name" onChange={handleInputChange} value={user.name} placeholder="name"></input>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ms-2">
                        <div className="me-1 fw-bold">
                            <label htmlFor="phone">Phone</label>
                        </div>
                        <div className="ms-1">
                            <input type="text" className="form-control" name="phone" onChange={handleInputChange} value={user.phone} placeholder="name"></input>
                        </div>
                    </div>
                    <button type="submit" id="submit"></button>
                </div>
            </form>
        </div>
    )
}
