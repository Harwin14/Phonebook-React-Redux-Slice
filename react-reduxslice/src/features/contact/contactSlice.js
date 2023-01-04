import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadContact, addContact, removeContact, updateContact } from './contactAPI';

import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Authorization': 'token' }
});

const initialState = {
    value: {
        data: [],
        params: {
            page: 1,
            totalPage: 0
        }
    },
    status: 'idle',
};

export const loadContactAsync = createAsyncThunk(
    'contact/loadContact',
    async () => {
        const response = await loadContact();
        return { data: response.data.data.result, page: response.data.data.page, totalPage: response.data.data.totalPage };
    }
);

export const addContactAsync = createAsyncThunk(
    'contact/addContact',
    async ({ id, name, phone }) => {
        try {
            const response = await addContact(name, phone);
            return { success: true, id, data: response.data.data }
        } catch (error) {
            return { success: false, id }
        }
    }
);

export const removeContactAsync = createAsyncThunk(
    'contact/removeContact',
    async (id) => {
        const response = await removeContact(id);
        return { id, data: response.data.data }
    }
);

export const updateContactAsync = createAsyncThunk(
    'contact/updateContact',
    async ({ id, name, phone }) => {
        const response = await updateContact(id, name, phone);
        return { id, data: response.data.data }
    }
);



export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value = {
                ...state.value,
                data: [
                    ...state.value.data,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        phone: action.payload.phone,
                        sent: true
                    }
                ]
            }

        },
        loadMore: (state, action) => {
            state.value = {
                data: [...state.value.data, ...action.payload.value.map(item => {
                    item.sent = true
                    return item
                })],
                params: action.payload.params
            }
        },
        searchContact: (state, action) => {
            state.value = {
                data: action.payload.value.map(item => {
                    item.sent = true
                    return item
                }),
                params: action.payload.params
            }
        }
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(loadContactAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadContactAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = {
                    data: action.payload.data.map(item => {
                        item.sent = true
                        return item
                    }),
                    params: {
                        page: action.payload.page,
                        totalPage: action.payload.totalPage
                    }
                }
            })
            .addCase(addContactAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addContactAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.success) {
                    state.value = {
                        ...state.value,
                        data: [...state.value.data.map(item => {

                            if (item.id === action.payload.id) {
                                return {
                                    id: action.payload.data.id,
                                    name: action.payload.data.name,
                                    phone: action.payload.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })]
                    };

                } else {
                    state.value = {
                        ...state.value,
                        data: [...state.value.data.map(item => {
                            if (item.id === action.payload.id) {
                                return {
                                    ...item,
                                    sent: false
                                }
                            }
                            return item
                        })]
                    }
                }
            })
            .addCase(removeContactAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = {
                    ...state.value,
                    data: [...state.value.data.filter(item => item.id !== action.payload.id)]
                }
            })
            .addCase(updateContactAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = {
                    ...state.value,
                    data: [...state.value.data.map(item => {
                        if (item.id === action.payload.id) {
                            return {
                                id: action.payload.data.id,
                                name: action.payload.data.name,
                                phone: action.payload.data.phone,
                                sent: true
                            }
                        }
                        return item
                    })]
                }
            })
    },
});

export const { add, loadMore, searchContact } = contactSlice.actions;

export const selectContact = (state) => state.contact.value.data;

export const create = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    if (!dispatch(search())) {
        dispatch(add({ id, name, phone }))
        dispatch(addContactAsync({ id, name, phone }))
    }
};

export const loadPagination = () => (dispatch, getState) => {
    let state = getState()
    if (state.contact.value.params.page < state.contact.value.params.totalPage) {
        let params = {
            ...state.contact.value.params,
            page: state.contact.value.params.page + 1
        }
        request.get('contacts', { params: params }).then(({ data }) => {
            params = {
                ...params,
                totalPage: data.data.totalPage
            }
            dispatch(loadMore({ value: data.data.result, params }))
        })

    }
};


export const search = (query) => (dispatch, getState) => {
    let state = getState()

    let params = {
        ...state.contact.value.params,
        ...query,
        page: 1
    }
    request.get('contacts', { params: params }).then(({ data }) => {
        params = {
            ...params,
            totalPage: data.data.totalPage
        }
        dispatch(searchContact({ value: data.data.result, params }))
    })


};

export default contactSlice.reducer;