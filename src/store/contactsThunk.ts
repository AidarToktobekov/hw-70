import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiContacts, Contact } from "../types";
import { AppDispatch } from "../app/store";
import axiosApi from "../axiosApi";

export const fetchContacts = createAsyncThunk<
  Contact[],
  undefined,
  { dispatch: AppDispatch }
>('dishes/fetchContacts', async () => {
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
