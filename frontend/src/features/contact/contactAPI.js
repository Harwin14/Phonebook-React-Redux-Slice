import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
  headers: { 'Authorization': 'token' }
});

export const readContact = () => request.get('users')

export const createContact = (name, phone) => request.post('users', { name, phone})

export const updateContact = (id, name, phone) => request.put(`users/${id}`,{name, phone})

export const deleteContact = (id) => request.delete(`users/${id}`)

// export const search = (query) =>  getState => {
//       let state = getState()
//       let params = {
//           ...state.contacts.params,
//           ...query,
//           page: 1
//       }
//           const { data } = request.get('users', { params })
//           params = {
//               ...params,
//               totalPages: data.data.totalPages
//           }  
// }

