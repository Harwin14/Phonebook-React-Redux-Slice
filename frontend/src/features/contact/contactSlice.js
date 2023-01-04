import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { readContact, createContact, deleteContact, updateContact } from './contactAPI';

const initialState = {
    value: {
        data: [],
        params: {
            page: 1,
            totalPages: 0
        }
    },
    status: 'idle'
}

export const readContactAsync = createAsyncThunk(
    'contact/readContact',
    async () => {
        const { data } = await readContact();
        return { contact: data.data.contact, page: data.data.page, totalPages: data.data.totalPages };
    }
)

export const createContactAsync = createAsyncThunk(
    'contact/createContact',
    async ({ id, name, phone }) => {
        try {
            const { data } = await createContact(name, phone);
            return { success: true, id, contact: data.data }
        } catch (err) {
            console.log('ggal add', err)
            return { success: false, id }
        }
    }
)

export const deleteContactAsync = createAsyncThunk(
    'contact/deleteContact',
    async (id) => {
        const { data } = await deleteContact(id);
        console.log(data, 'data delete')
        return { id, contact: data.data }
    }
)
export const updateContactAsync = createAsyncThunk(
    'contact/updateContact',
    async (id, name, phone) => {
        const { data } = await updateContact(id, name, phone);
        return { id, contact: data.data }
    }
)


export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        add: (state, action) => {
            console.log('action',action)
            state.value = [
                ...state.value,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    phone: action.payload.phone,
                    sent: true
                }
            ]
        },
        searchContact: (state, action) => {
            console.log('state', state);

        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(readContactAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(readContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = action.payload.contact.map(item => ({
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    sent: true
                }))
            })
            .addCase(createContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.success) {
                    state.value = state.value.map(item => {
                        if (item.id === action.payload.id) {
                            return {
                                id: action.payload.contact.id,
                                name: action.payload.contact.name,
                                phone: action.payload.contact.phone,
                                sent: true
                            }
                        }
                        return item
                    })
                } else {
                    state.value = state.value.map(item => {
                        if (item.id === action.payload.id) {
                            item.sent = false
                        }
                        return item
                    })
                }
            })
            .addCase(deleteContactAsync.fulfilled, (state, action) => {
                state.value = state.value.filter(item => item.id !== action.payload)
            })
            .addCase(updateContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            id: action.payload.data.id,
                            name: action.payload.data.name,
                            phone: action.payload.data.phone,
                            sent: true
                        }
                    }
                    return item
                })
            })
    },
})
export const { add } = contactSlice.actions

export const selectContact = (state) => state.contact.value

export const create = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    dispatch(add({ id, name, phone }))
    dispatch(createContactAsync({ id, name, phone }))
};

export const search = (query) => {
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
  


export default contactSlice.reducer;
