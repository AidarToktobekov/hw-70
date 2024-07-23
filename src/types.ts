export interface Contact{
    name: string;
    phone: string;
    email: string;
    photo: string;
    id: string;
}

export type ApiContact = Omit<Contact, 'id'>;

export interface ApiContacts{
    [id: string]: ApiContact;
}

export interface ContactMutation {
    name: string;
    phone: string;
    email: string;
    photo: string;
  }

export interface CartContact {
    contact: Contact;
  }