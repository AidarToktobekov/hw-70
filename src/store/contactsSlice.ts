import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartContact, Contact } from '../types';
import { fetchContacts, createContacts, deleteContact } from './contactsThunk';

interface Contacts{
    contacts: Contact[];
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
    photo: string;
    modal: {modalState: string, index: number | null}
}

const initialState: Contacts = {
    contacts: [],
    modal: {modalState: 'none', index: null},
    photo: '',
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
  };
  

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        showModal: (state, {payload})=>{
            state.modal.modalState = payload.modalState;
            state.modal.index = payload.index;
        },
        changePhoto: (state, {payload})=>{
            state.photo = payload;
        },
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
        builder
          .addCase(createContacts.pending, (state) => {
            state.createLoading = true;
          })
          .addCase(createContacts.fulfilled, (state) => {
            state.createLoading = false;
          })
          .addCase(createContacts.rejected, (state) => {
            state.createLoading = false;
          });
        builder
          .addCase(deleteContact.pending, (state) => {
            state.deleteLoading = true;
          })
          .addCase(deleteContact.fulfilled, (state) => {
            state.deleteLoading = false;
          })
          .addCase(deleteContact.rejected, (state) => {
            state.deleteLoading = false;
          });
    }
});
  
  export const contactsReducer = contactSlice.reducer;
  export const { showModal, changePhoto } = contactSlice.actions;

  