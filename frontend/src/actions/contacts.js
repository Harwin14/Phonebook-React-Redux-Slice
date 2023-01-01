import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
  headers: { 'Authorization': 'token' }
});

const loadContactSuccess = (data, page, totalPages) => ({
  type: 'LOAD_CONTACT_SUCCESS',
  data,
  page,
  totalPages
})

const loadContactFailure = (error) => ({
  type: 'LOAD_CONTACT_FAILURE',
  error
})

// export const loadContact = () => (dispatch, getState) => request.get('users', { params: getState().contacts.params })
//   .then(({ data }) => {
//     dispatch(loadContactSuccess(data.data.contacts, data.data.page, data.data.totalPages))
//   }).catch((err) => {
//     dispatch(loadContactFailure())
//   })
export const loadContact = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get('users', { params: getState().contacts.params })
      dispatch(loadContactSuccess(data.data.contacts, data.data.page, data.data.totalPages))
    } catch (error) {
      dispatch(loadContactFailure(error))
    }
  }
}

const loadMoreSuccess = (data) => ({
  type: 'LOAD_MORE_SUCCESS',
  data
})

const loadMoreFailure = (error) => ({
  type: 'LOAD_MORE_FAILURE',
  error
})


// export const loadMore = () => (dispatch, getState) => {
//   let state = getState()
//   if (state.contacts.params.page < state.contacts.params.totalPages) {
//     let params = {
//       ...state.contacts.params,
//       page: state.contacts.params.page + 1
//     }
//     request.get('users', { params }).then(({ data }) => {
//       params = {
//         ...params,
//         totalPages: data.data.totalPages
//       }
//       dispatch(loadMoreSuccess({ value: data.data.contacts, params }))
//     })
//   }
// };

export const loadMore = () => {
  return async (dispatch, getState) => {
    try {
      let state = getState()
      if (state.contacts.params.page < state.contacts.params.totalPages) {
        let params = {
          ...state.contacts.params,
          page: state.contacts.params.page + 1
        }
        const { data } = await request.get('users', { params })
        params = {
          ...params,
          pages: data.data.totalPages
        }
        dispatch(loadMoreSuccess({ value: data.data.contacts, params }))
      }
    } catch (error) {
      dispatch(loadMoreFailure(error))
    }
  }
}

export const addContactSuccess = (id, data) => ({
  type: 'ADD_CONTACT_SUCCESS',
  id,
  data
})

export const addContactFailure = (id) => ({
  type: 'ADD_CONTACT_FAILURE',
  id
})

export const addContactRedux = (id, name, phone) => ({
  type: 'ADD_CONTACT',
  id,
  name,
  phone
  // addContact ngelempar 4 data (type,id,name,phone) dilempar ke reducers/contacts
})
// hasil dari { data } sama dengan response ?
// console log dimana?
// export const addContact = (name, phone) => dispatch => {
//   const id = Date.now()
//   dispatch(addContactRedux(id, name, phone))
//   return request.post('users', { name, phone })
//     .then(({ data }) => {
//       dispatch(addContactSuccess(id, data.data))
//     }).catch((err) => {
//       dispatch(addContactFailure(id))
//     })
// }
export const addContact = (name, phone) => {
  const id = Date.now()
  return async (dispatch, getState) => {
    if (!getState().contacts.params.name && !getState().contacts.params.phone) {
      dispatch(addContactRedux(id, name, phone))
    }
    try {
      const { data } = await request.post('users', { name, phone })

      if (!getState().contacts.params.name && !getState().contacts.params.phone) {
        dispatch(addContactSuccess(id, data.data))
      }
    } catch (error) {
      dispatch(addContactFailure(id))
    }


  }
}


const removeContactSuccess = (id) => ({
  type: 'REMOVE_CONTACT_SUCCESS',
  id
})

const removeContactFailure = (id) => ({
  type: 'REMOVE_CONTACT_FAILURE',
  id
})

export const removeContact = (id) => {
  return async dispatch => {
    try {
      await request.delete(`users/${id}`)
      dispatch(removeContactSuccess(id))
    } catch (err) {
      dispatch(removeContactFailure(err))
    }
  }
}

export const updateContactSuccess = (id, data) => ({
  type: 'ADD_CONTACT_SUCCESS',
  id,
  data
})

export const updateContactFailure = () => ({
  type: 'ADD_CONTACT_FAILURE'
})

export const updateContact = (id, name, phone) => {
  return async dispatch => {
    try {
      const { data } = await request.put(`users/${id}`, { name, phone })
      dispatch(updateContactSuccess(id, data.data))
    } catch (err) {
      dispatch(updateContactFailure(err))
    }
  }
}

const resendContactSuccess = (id, data) => ({
  type: 'RESEND_CONTACT_SUCCESS',
  id,
  data
})

const resendContactFailure = () => ({
  type: 'RESEND_CONTACT_FAILURE'
})

export const resendContact = (id, name, phone) => {
  return async dispatch => {
    try {
      const { data } = await request.post('users', { name, phone })
      dispatch(resendContactSuccess(id, data.data))
    } catch (err) {
      dispatch(resendContactFailure(err))
    }
  }
}

const searchContactSuccess = (data) => ({
  type: 'SEARCH_CONTACT_SUCCESS',
  data
})

const searchContactFailure = () => ({
  type: 'SEARCH_CONTACT_FAILURE'
})


// export const searchContact = (query) => (dispatch, getState) => {
//   let state = getState()
//   let params = {
//     ...state.contacts.params,
//     ...query,
//     page: 1
//   }
//   request.get('users', { params }).then(({ data }) => {
//     params = {
//       ...params,
//       totalPage: data.data.totalPage
//     }
//     dispatch(searchContactSuccess({ value: data.data.contacts, params }))
//   })
// }


export const searchContact = (query) => {
  return async (dispatch, getState) => {
    let state = getState()
    let params = {
      ...state.contacts.params,
      ...query,
      page: 1
    }
    try {
      const { data } = await request.get('users', { params })
      params = {
        ...params,
        totalPages: data.data.totalPages
      }
      dispatch(searchContactSuccess({ value: data.data.contacts, params }))
    } catch (error) {
      dispatch(searchContactFailure())
    }
  }
}
