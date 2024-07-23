import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiContact, ApiContacts, Contact } from "../types";
import { AppDispatch } from "../app/store";
import axiosApi from "../axiosApi";

export const fetchContacts = createAsyncThunk<
Contact[],
undefined,
{ dispatch: AppDispatch }
>('contact/fetchContacts', async () => {
    const contactsResponse = await axiosApi.get<ApiContacts | null>('/phoneBook.json');
    const contacts = contactsResponse.data;
    
    let newContacts: Contact[] = [];
    
    if (contacts) {
        newContacts = Object.keys(contacts).map((key: string) => {
            const dish = contacts[key];
            return {
                id: key,
                ...dish,
            };
        });
    }
    
    
    return newContacts;
});

export const deleteContact = createAsyncThunk<void, string>(
    'contact/deleteContacts',
    async (contactId) => {
      await axiosApi.delete('/phoneBook/' + contactId + '.json');
    },
  );
  
export const createContacts = createAsyncThunk<void, ApiContact>(
    'contact/createContacts',
    async (apiContact) => {
      await axiosApi.post('/phoneBook.json', apiContact);
    },
  );

  export interface EditContact {
    id: string;
    apiContact: ApiContact;
  }
export const editContact = createAsyncThunk<void, EditContact>(
    'dishes/update',
    async ({ id, apiContact }) => {
      await axiosApi.put(`/phoneBook/${id}.json`, apiContact);
    },
  );