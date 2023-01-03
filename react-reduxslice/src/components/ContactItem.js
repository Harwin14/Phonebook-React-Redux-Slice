import React, { Component } from 'react';
//ContactItem berupa tag yg memiliki atribut no, name, phone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'

export default class ContactItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            name: props.contact.name,
            phone: props.contact.phone
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdate = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({ isEdit: false })
    }
    render() {
        if (this.state.isEdit) {
            return (
                <div className="w-5 my-3 mx-3 shadow py-3 px-4 cardlist">
                    <div className='card-body h-500 w-500' >
                        <div className="card">
                            <input type='text' name='name' value={this.state.name} onChange={this.handleInputChange}
                                className='px-2 py-1 border border-blue-400/75 rounded-lg w-full form-control' required />
                        </div>
                        <div className=''>
                            <input type='tel' pattern='[08][0-9]{11}' name='phone' id='phone' value={this.state.phone} onChange={this.handleInputChange}
                                className='px-2 py-1 border border-blue-400/75 rounded-lg w-full form-control' required />
                        </div>
                        <div className='d-flex justify-content-around align-items-stretch py-2'>
                            <button onClick={this.handleUpdate}
                                className='button-87'> Update</button>

                            <button type='button' onClick={() => this.setState({ isEdit: false })}
                                className='button-85'> Cancel</button>
                        </div>

                    </div>

                </div>
            )
        } else {
            // console.log("sent", this.props.contact.sent)
            return (

                <div className="w-5 my-3 mx-3 shadow py-3 px-4 cardlist" >
                    <div className='' >
                        <div className="">
                            <div className=''><FontAwesomeIcon icon={faIdBadge} /> <span className='font'> Name : </span><span>{this.state.name}</span>
                            </div>
                            <div className=''>
                                <FontAwesomeIcon icon={faPhoneSquare} /><span className='font'> Phone : </span><span>{this.state.phone}</span>
                            </div>
                            <div className='d-flex justify-content-between py-2'>
                                <button onClick={() => this.setState({ isEdit: true })} className='button-29'>
                                    Edit
                                </button>
                                <button onClick={this.props.sent ? this.props.remove : this.props.resend} className={this.props.sent ? 'button-49' : 'btn btn-w'}>
                                    {this.props.sent ? 'Delete' : 'Resend'}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

            )
        }
    }
}
    

//   import React, { Component } from 'react';
    //     //ContactItem berupa tag yg memiliki atribut no, name, phone
    //     import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    //     import { faIdBadge, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'
        
    //     export default class ContactItem extends Component {
    //         constructor(props) {
    //             super(props)
    //             this.state = {
    //                 isEdit: false,
    //                 name: props.contact.name,
    //                 phone: props.contact.phone
    //             }
    //         }
        
    //         handleInputChange = (event) => {
    //             const target = event.target;
    //             const value = target.type === 'checkbox' ? target.checked : target.value;
    //             const name = target.name;
        
    //             this.setState({
    //                 [name]: value
    //             });
    //         }
        
    //         handleUpdate = () => {
    //             this.props.update(this.state.name, this.state.phone)
    //             this.setState({ isEdit: false })
    //         }
    //         render() {
    //             if (this.state.isEdit) {
    //                 return (
    //                     <div className="w-5 my-3 mx-3 shadow py-3 px-4 cardlist">
    //                         <div className='card-body h-500 w-500' >
    //                             <div className="card">
    //                                 <input type='text' name='name' value={this.state.name} onChange={this.handleInputChange}
    //                                     className='px-2 py-1 border border-blue-400/75 rounded-lg w-full form-control cardlist' required />
    //                             </div>
    //                             <div className=''>
    //                                 <input type='tel' pattern='[08][0-9]{11}' name='phone' id='phone' value={this.state.phone} onChange={this.handleInputChange}
    //                                     className='px-2 py-1 border border-blue-400/75 rounded-lg w-full form-control cardlist' required />
    //                             </div>
    //                             <div className='d-flex justify-content-around align-items-stretch py-2'>
    //                                 <button onClick={this.handleUpdate}
    //                                     className='button-87'> Update</button>
        
    //                                 <button type='button' onClick={() => this.setState({ isEdit: false })}
    //                                     className='button-85'> Cancel</button>
    //                             </div>
        
    //                         </div>
        
    //                     </div>
    //                 )
    //             } else {
    //                 // console.log("sent", this.props.contact.sent)
    //                 return (
        
    //                     <div className="w-5 my-3 mx-3 shadow py-3 px-4 cardlist" >
    //                         <div className='' >
    //                             <div className="">
    //                                 <div className=''><FontAwesomeIcon icon={faIdBadge} /> <span className='font'> Name : </span><span>{this.state.name}</span>
    //                                 </div>
    //                                 <div className=''>
    //                                     <FontAwesomeIcon icon={faPhoneSquare} /><span className='font'> Phone : </span><span>{this.state.phone}</span>
    //                                 </div>
    //                                 <div className='d-flex justify-content-between py-2'>
    //                                     <button onClick={() => this.setState({ isEdit: true })} className='button-29'>
    //                                         Edit
    //                                     </button>
    //                                     <button onClick={this.props.sent ? this.props.remove : this.props.resend} className={this.props.sent ? 'button-49' : 'btn btn-w'}>
    //                                         {this.props.sent ? 'Delete' : 'Resend'}
    //                                     </button>
    //                                 </div>
        
    //                             </div>
        
    //                         </div>
    //                     </div>
        
    //                 )
    //             }
    //         }
    //     }
            