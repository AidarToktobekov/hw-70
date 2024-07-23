import { useAppDispatch } from "../../app/hooks";
import { showModal } from "../../store/contactsSlice";
import { Contact } from "../../types";

interface Props{
    contact: Contact;
    index: number;
}

const OneContact:React.FC<Props> = ({contact, index})=>{
    const dispatch = useAppDispatch();

    const showModalContact =()=>{
        dispatch(showModal({modalState: 'block', index: index,}))
    }

    return(
        <>
            <button onClick={showModalContact} className="list-group-item d-flex align-items-center justify-content-between btn btn-dark border-3" style={{maxWidth: '600px', width: '100%'}}>
                <div className="bg-dark d-flex align-items-center rounded-2 overflow-hidden border border-2 dorder-dark" style={{width: '100px' , height: '100px'}}>
                    <img src={contact.photo} alt="image" className="w-100" />
                </div>
                <h3>{contact.name}</h3>
            </button>
        </>
    )
}

export default OneContact;