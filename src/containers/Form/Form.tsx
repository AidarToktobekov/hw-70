import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { createContacts, editContact } from "../../store/contactsThunk";
import { ApiContact, ContactMutation } from "../../types";

interface Props{
    existingContact?: ApiContact;
}

const Form:React.FC<Props> = ({existingContact})=>{
    const param = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    
    const emptyState: ContactMutation = {
        name: '',
        phone: '',
        email: '',
        photo: '',
      };

    const initialState: ContactMutation = existingContact
    ? { ...existingContact}
    : emptyState;

    const [contactMutation, setContactMutation] = useState<ContactMutation>(initialState);
    
    const changeContact = (event: React.ChangeEvent<HTMLInputElement>,) => {
        setContactMutation((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      };

    const addContact =(event: FormEvent)=>{
        event.preventDefault();
        if(param.id === undefined){
            dispatch(createContacts(contactMutation));
        }
        else{
            const id = param.id;
            dispatch(editContact({id: id, apiContact: contactMutation}));

        }
        navigate('/')
    }
    return(
        <>
            <form onSubmit={addContact}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" onChange={changeContact} className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" onChange={changeContact} className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" name="phone" onChange={changeContact} className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Photo</label>
                    <input type="text" name="photo" onChange={changeContact} className="form-control" required placeholder="URL image"/>
                </div>
                <div className="mb-3 d-flex align-items-center rounded-2 overflow-hidden border border-2 dorder-dark" style={{width: '100px' , height: '100px'}}>
                    <img src={contactMutation.photo} alt="image" className="w-100" />
                </div>
                <button type="submit" className="btn btn-dark">Add</button>
            </form>
        </>
    )
}

export default Form;