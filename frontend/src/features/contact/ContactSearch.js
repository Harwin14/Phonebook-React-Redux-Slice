import React, { Component } from 'react';
import { searchContact } from "../actions/contacts";
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

class ContactForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAdd: false,
            name: '',
            phone: ''
        }
    }
    //untuk handle inputan dari form
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault()
        //handle submit jalan , eksekusi props.add datang dari addContact bawah
         this.props.search({name:this.state.name, phone:this.state.phone})
        // console.log(this.state.name,this.state.phone)
    }

    render() {
        return (
            <div className="card mt-3">
                <div className="card-header font"><FontAwesomeIcon icon={faMagnifyingGlass} /> Search Form
                </div>
                <form className="g-3 my-2 px-4" onSubmit={this.handleSubmit} >
                    <div className="d-flex">
                        <div className="d-flex align-items-center me-2">
                            <div className="me-1 fw-bold">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="ms-1">
                                <input type="text" className="form-control" name="name" onChange={this.handleInputChange} value={this.state.name} placeholder="name"></input>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ms-2">
                            <div className="me-1 fw-bold">
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="ms-1">
                                <input type="text" className="form-control" name="phone" onChange={this.handleInputChange} value={this.state.phone} placeholder="name"></input>
                            </div>
                        </div>
                        <button type="submit" id="submit"></button>
                    </div>
                </form>
            </div>
        )
    }


}

// dari action/ addContact


const mapDispatchToProps = (dispatch) => ({
    //add contact dari (import addContact from action/contact)
    search: (query = {}) => dispatch(searchContact(query))
})

export default connect(
    null,
    mapDispatchToProps
)(ContactForm)



// import React, { Component }  from 'react';
// import { addContact } from "../actions/contacts";
// import { connect } from 'react-redux';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBan, faPlus, faCircleCheck, faAddressCard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

// class ContactForm extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             isAdd: false,
//             name: '',
//             phone: ''
//         }
//     }
//     //untuk handle inputan dari form
//     handleInputChange = (event) => {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         });
//     }
//     handleSubmit = (event) => {
//         event.preventDefault()
//         //handle submit jalan , eksekusi props.add datang dari addContact bawah
//         this.props.add(this.state.name, this.state.phone)
//         this.setState({ name: '', phone: '' })
//     }
//     handleSubmitSearch = (event) => {
//         event.preventDefault()
//         this.props.onSearch(this.state.name, this.state.phone);
//         this.setState({ name: '', phone: '' })
//     }
//     render() {
//         if (this.state.isAdd) {
//             return (
//                 <div>
//                     <div className="card mt-3">
//                         <div className="card-header font"><FontAwesomeIcon icon={faAddressCard} size="2x" /> Add Form
//                         </div>
//                         <form className="g-3 my-2 px-4" onSubmit={this.handleSubmit}>
//                             <div className="d-flex">
//                                 <div className="d-flex align-items-center me-2">
//                                     <div className="me-1 fw-bold">
//                                         <label htmlFor="name">Name</label>
//                                     </div>
//                                     <div className="ms-1">
//                                         <input type="text" className="form-control" name="name" onChange={this.handleInputChange} value={this.state.name} placeholder="name"
//                                             onInvalid={F => F.target.setCustomValidity('Enter Contact name here..')} onInput={F => F.target.setCustomValidity('')} required></input>
//                                     </div>
//                                 </div>

//                                 <div className="d-flex align-items-center ms-2">
//                                     <div className="me-1 fw-bold">
//                                         <label htmlFor="phone">Phone</label>
//                                     </div>
//                                     <div className="ms-1">
//                                         <input type="text" className="form-control" name="phone" onChange={this.handleInputChange} value={this.state.phone} placeholder="phone"
//                                             onInvalid={F => F.target.setCustomValidity('Please enter phone number here..')} onInput={F => F.target.setCustomValidity('')} required></input>
//                                     </div>
//                                 </div>

//                                 <div className="d-flex justify-content-around align-items-stretch ">
//                                     <button type="submit" className="button-87 mx-2"><FontAwesomeIcon icon={faCircleCheck} /> Save</button>
//                                     <button className="button-85" onClick={() => this.setState({ isAdd: false })}><FontAwesomeIcon icon={faBan} /> Cancel</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="card mt-3">
//                         <div className="card-header font"><FontAwesomeIcon icon={faMagnifyingGlass} /> Search Form
//                         </div>
//                         <form className="g-3 my-2 px-4" onSubmit={this.handleSubmitSearch} >
//                             <div className="d-flex">
//                                 <div className="d-flex align-items-center me-2">
//                                     <div className="me-1 fw-bold">
//                                         <label htmlFor="name">Name</label>
//                                     </div>
//                                     <div className="ms-1">
//                                         <input type="text" className="form-control" name="name" onChange={this.handleInputChange} placeholder="name"></input>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center ms-2">
//                                     <div className="me-1 fw-bold">
//                                         <label htmlFor="phone">Phone</label>
//                                     </div>
//                                     <div className="ms-1">
//                                         <input type="text" className="form-control" name="phone" onChange={this.handleInputChange} placeholder="name"></input>
//                                     </div>
//                                 </div>
//                                 <button type="submit" id="submit"></button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )
//         } else {
//             return (  
//                 <div>  
//                     <div className="col-md-2">
//                         <button className="button-55 " onClick={() => this.setState({ isAdd: true })}><FontAwesomeIcon icon={faPlus} /> Add</button>
//                     </div>
//                     <div className="card mt-3">
//                         <div className="card-header font"> 
//                             <p>Search Form</p>
//                         </div>
//                         <form className="g-3 my-2 px-4" onSubmit={this.handleSubmitSearch} >
//                             <div className="d-flex">
//                                 <div className="d-flex align-items-center me-2">
//                                     <div className="me-1 fw-bold">
//                                         <label htmlFor="name">Name</label>
//                                     </div>
//                                     <div className="ms-1">
//                                         <input type="text" className="form-control" name="name" onChange={this.handleInputChange} placeholder="name"></input>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center ms-2">
//                                     <div className="me-1 fw-bold">
//                                         <label htmlFor="phone">Phone</label>
//                                     </div>
//                                     <div className="ms-1">
//                                         <input type="text" className="form-control" name="phone" onChange={this.handleInputChange} placeholder="name"></input>
//                                     </div>
//                                 </div>
//                                 <button type="submit" id="submit"></button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )
//         }
//     }
// }

// // dari action/ addContact


// const mapDispatchToProps = (dispatch, ownProps) => ({
//     //add contact dari (import addContact from action/contact)
//     add: (name, phone) => dispatch(addContact(name, phone))
// })

// export default connect(
//     null,
//     mapDispatchToProps
// )(ContactForm)