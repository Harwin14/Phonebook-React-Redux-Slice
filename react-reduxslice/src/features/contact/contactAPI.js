import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
  headers: { 'Authorization': 'token' }
});

export const loadContact = () => request.get('users')

export const addContact = (name, phone) => request.post('users', { name, phone })

export const updateContact = (id, name, phone) => request.put(`users/${id}`, { name, phone })

export const removeContact = (id) => request.delete(`users/${id}`)