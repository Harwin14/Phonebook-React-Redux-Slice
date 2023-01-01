import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";


import ContactItem from "../../components/ContactItem"
import {
    readContactAsync,
    selectContact,
    deleteContactAsync,
    createContactAsync
}from './contactSlice'


export default function ContactList(props) {

    const contacts = useSelector(selectContact) 

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readContactAsync())
    }, [dispatch])
    // [dispatch] itu watcher / penonton yg []
    //klo variable berubah ngerender /jalan ulang

    // const scrolling = (event) => {
    //     var element = event.target;
    //     if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    //         dispatch(loadMore())
    //     }
    // }

 
        return (
            <div
                // onScroll={scrolling}
                style={{ overflowY: "scroll", height: 350 }}
                className="card-b shadow  mt-5 mx-auto d-flex justify-content-evenly d-flex flex-wrap " >
                {
                    //props.contact dapat dari mapStateToProps
                    contacts.map((user, index) => (
                        <ContactItem
                            key={user.id}
                            no={index + 1}
                            contact={user}
                            sent={user.sent}
                            remove={() => dispatch(deleteContactAsync(user.id))}
                            resend={() => dispatch(createContactAsync(user.id, user.name, user.phone))}
                            // update={(name, phone) => dispatch(updateContact(user.id, name, phone))}
                        />
                    ))
                }
            </div>
        )
    }




// const mapStateToProps = (state, ownProps) => {
//     //state.contacts nya dapet dari reducers (return return nya)
//     return {
//         contacts: state.contacts.data,
//         params: state.contacts.params
//     }
// }





// import React, { Component }  from 'react';
// import { loadContact, removeContact, resendContact, updateContact, searchContact } from "../actions/contacts";
// import ContactItem from "../components/ContactItem"
// import { connect } from "react-redux";

// class ContactList extends Component {

//     componentDidMount() {
//         this.props.load()
//     }
//     render() {
//      console.log("users",this.props.contacts)
//         return (
//             <div
//             onScroll={scrolling} 
//             style={{ overflowY: "scroll", height: 380 }} 
//             className="card-b shadow  mt-5 mx-auto d-flex justify-content-evenly d-flex flex-wrap" >
//                 {
//                     //props.contact dapat dari mapStateToProps
//                     this.props.contacts.map((user, index) => (
//                         <ContactItem
//                             key={user.id}
//                             no={index + 1}
//                             contact={user}
//                             sent={user.sent}
//                             remove={() => this.props.remove(user.id)}
//                             resend={() => this.props.resend(user.id, user.name, user.phone)}
//                             update={(name, phone) => this.props.update(user.id, name, phone)}
//                             search={(name, phone) => this.props.search(user.id, name, phone)}

//                         />
//                     ))
//                 }
//             </div>
//         )
//     }
// }

// const scrolling = (event) => {
//     console.log("ini scroll")
//     var element = event.target;
//     if (element.scrollHeight - element.scrollTop === element.clientHeight) {
//         //  
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => ({
//     load: () => dispatch(loadContact()),
//     remove: (id) => dispatch(removeContact(id)),
//     resend: (id, name, phone) => dispatch(resendContact(id, name, phone)),
//     update: (id, name, phone) => dispatch(updateContact(id, name, phone)),
//     search: (id, name, phone) => dispatch(searchContact(id, name, phone)),
// })


// const mapStateToProps = (state, ownProps) => ({
//     //state.contacts nya dapet dari reducers (return return nya)
//     contacts: state.contacts
// })
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ContactList)
