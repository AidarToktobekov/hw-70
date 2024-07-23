import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartContact, Contact } from '../types';
import { fetchContacts } from './contactsThunk';

interface Contacts{
    contacts: Contact[];
    fetchLoading: boolean;
    modal: {modalState: string, index: number | null}
}

const initialState: Contacts = {
    contacts: [],
    modal: {modalState: 'none', index: null},
    fetchLoading: false,
  };
  

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        showModal: (state, {payload})=>{
            state.modal.modalState = payload.modalState;
            state.modal.index = payload.index;

        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchContacts.pending, (state) => {
            state.fetchLoading = true;
          })
          .addCase(fetchContacts.fulfilled, (state, { payload: contacts }) => {
            state.fetchLoading = false;
            state.contacts = contacts;
          })
          .addCase(fetchContacts.rejected, (state) => {
            state.fetchLoading = false;
          });
    }
});
  
  export const contactsReducer = contactSlice.reducer;
  export const { showModal } = contactSlice.actions;
  
  