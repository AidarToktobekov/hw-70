import { useEffect } from "react";
import { fetchContacts } from "../../store/contactsThunk";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import OneContact from "../../components/Contact/OneContact";
import { showModal } from "../../store/contactsSlice";

const Home = ()=>{
    const dispatch = useAppDispatch();

    const contacts = useSelector((state: RootState) => state.contacts)

    useEffect(() => {
        dispatch(fetchContacts());
        
      }, [dispatch]);

      const hideModal = ()=>{
        dispatch(showModal({modalState: 'none', index: null}))
      }
      let contact;
      if(contacts.modal.index !== null){
        contact = contacts.contacts[contacts.modal.index];
      }
      

    return(
        <>

        <div className="modal" style={{display: contacts.modal.modalState, background: 'rgb(0 0 0 / 50%)'}}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="btn-close" onClick={hideModal}></button>
            </div>
            <div className="modal-body d-flex gap-3">
                <div className="bg-dark d-flex align-items-center rounded-2 overflow-hidden border border-2 dorder-dark" style={{width: '100px' , height: '100px'}}>
                    <img src={contact?.photo} alt="image" className="w-100" />
                </div>
                <div>
                    <h5 className="modal-title">{contact?.name}</h5>
                    <div className="">Phone: {contact?.phone}</div>
                    <div className="">Email: {contact?.email}</div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        <div className="list-group flex-row flex-wrap justify-content-center gap-4" >
            {contacts.contacts.map((contact, index)=>{
                return(
                    <OneContact key={index} index={index} contact={contact}></OneContact>
                )
            })}
        </div>
        </>
    )
}

export default Home;