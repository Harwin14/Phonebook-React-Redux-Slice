import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { readContact, createContact, deleteContact } from './contactAPI';

const initialState = {
    value: [],
    status: 'idle',
}

export const readContactAsync = createAsyncThunk(
    'contact/readContact',
    async () => {
        const { data } = await readContact();
        console.log(data, 'ini isi response contactSlice')
        return data.data;
    }
)

export const createContactAsync = createAsyncThunk(
    'contact/createContact',
    async (id, name, phone) => {
        const { data } = await createContact(name, phone);
        return { id, contact: data.data }
    }
)

export const deleteContactAsync = createAsyncThunk(
    'contact/deleteContact',
    async (id) => {
        const { data } = await deleteContact(id);
        return data.data.id
    }
)

export const contactSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action) => {
            console.log(action)
            state.value = [
                ...state.value,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    phone: action.payload.phone,
                    sent: true
                }
            ]
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(readContactAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(readContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = action.payload.map(item => ({
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    sent: true
                }))
            })
            .addCase(createContactAsync.fulfilled, (state, action) => {
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
            .addCase(deleteContactAsync.fulfilled, (state, action) => {
                state.value = state.value.filter(item => item.id !== action.payload)
            })
    },
})
export const { add } = contactSlice.actions

export const selectContact = (state) => state.contact.value

export const create = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    dispatch(add({ id, name, phone }))
    dispatch(createContactAsync(id, name, phone))
};

export default contactSlice.reducer;
