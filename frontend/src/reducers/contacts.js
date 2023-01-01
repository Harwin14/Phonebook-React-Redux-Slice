//hasil lemparan data dari actions/contacts masuk ke reducer diterima sebagai action( action.type, action.name dsb)
const contacts = (state = {
    data: [],
    params: {
        page: 1,
        totalPages: 0
    }
}, action) => {
    switch (action.type) {
        case 'LOAD_CONTACT_SUCCESS':
            // console.log(state.params, "state.params load data")
            // console.log(action, "action.data load data")

            return {
                data: action.data.map(item => {
                    item.sent = true
                    return item
                }),
                params: {
                    page: action.page,
                    totalPages: action.totalPages
                }
            }
        case 'LOAD_MORE_SUCCESS':
            // console.log(state, "state load more")
            return {
                data: [...state.data, ...action.data.value.map(item => {
                    item.sent = true
                    return item
                })],
                params: action.data.params
            }

        case 'SEARCH_CONTACT_SUCCESS':
            //  console.log(action.data,'reducer search')
            return {
                data: action.data.value.map(item => {
                    item.sent = true
                    return item
                }),
                params: action.data.params
            }
        case 'ADD_CONTACT':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        name: action.name,
                        phone: action.phone,
                        sent: true
                    }
                ]
            }

        case 'ADD_CONTACT_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.data.id,
                            name: action.data.name,
                            phone: action.data.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        case 'ADD_CONTACT_FAILURE':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            sent: false
                        }
                    }
                    return item
                })]
            }

        case 'RESEND_CONTACT_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.data.id,
                            name: action.data.name,
                            phone: action.data.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        case 'UPDATE_CONTACT_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.data.id,
                            name: action.data.name,
                            phone: action.data.phone,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        // case 'REMOVE_CONTACT_SUCCESS':
        //     return state.filter(item => item.id !== action.id)
        case 'REMOVE_CONTACT_SUCCESS':
            return {
                ...state,
                data: [...state.data.filter(item => item.id !== action.id)]
            }
        case 'RESEND_CONTACT_FAILURE':
        case 'UPDATE_CONTACT_FAILURE':
        case 'SEARCH_CONTACT_FAILURE':
        case 'REMOVE_CONTACT_FAILURE':
        case 'LOAD_MORE_FAILURE':
        case 'LOAD_CONTACT_FAILURE':
        default:
            return state
    }
}

export default contacts 
  
    