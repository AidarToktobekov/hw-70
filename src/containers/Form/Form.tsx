import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { changePhoto } from "../../store/contactsSlice";
import { createContacts } from "../../store/contactsThunk";
import { ApiContact, ContactMutation } from "../../types";

interface Props{
    existingContact?: ApiContact;
}

const Form:React.FC<Props> = ({existingContact})=>{
    const param = useParams();
    console.log(param.id);

    const contacts = useSelector((state: RootState) => state.contacts)
    const dispatch = useAppDispatch();

    
    const changeUrl = (event: ChangeEvent<HTMLInputElement>)=>{
        dispatch(changePhoto(event.target.value))
        
    }
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
        dispatch(createContacts(contactMutation))
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