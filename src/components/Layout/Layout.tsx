import { NavLink } from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({children})=>{
    return(
        <>
        <header className='bg-dark py-3'>
            <div className="container d-flex justify-content-between">
                <NavLink to="/" className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-3'>Contacts</NavLink>
                <NavLink to="/add-new-contact" className='btn btn-light'>Add new contact</NavLink>
            </div>
        </header>

      <main className="container my-5">
        {children}
      </main>
        </>
    )
}

export default Layout;