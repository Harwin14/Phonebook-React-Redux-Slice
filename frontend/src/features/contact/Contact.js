import React, { Component } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactBook, faPlus } from '@fortawesome/free-solid-svg-icons'
// import ContactSearch from "../../components/ContactSearch";


export default class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdd: false,
        }
    }

    showAdd = (props) => {
        if (!props.show) {
            return null;
        }
        return (
            < ContactForm cancel={this.handleCancelForm}/>
        )
    }

    handleAddForm = () => {
        this.setState(state => ({
            isAdd: !state.isAdd
        }));
    }
    handleCancelForm = () => {
        this.setState({
            isAdd: false
        });
    }
    render() {
        return (
            <div>
                <div className="container shadow">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center font"><FontAwesomeIcon icon={faContactBook} /> Phone Book Apps</h1>
                        </div>
                        <div className="card-body">
                            {this.state.isAdd ? <this.showAdd show={this.state.isAdd} /> :
                                <button className="button-55 "  onClick={this.handleAddForm}><FontAwesomeIcon icon={faPlus} /> Add</button>}
                            {/* < ContactSearch /> */}
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
}
