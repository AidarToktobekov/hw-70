import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home/Home'
import Form from './containers/Form/Form'

const App = ()=> {

  return (
    <>
    <Layout>
      <Routes>
        <Route path="/" element={(
          <Home></Home>
        )}/>
        <Route path="/add-new-contact" element={(
          <Form></Form>
        )}/>
        <Route path="/edit/:id" element={(
          <Form></Form>
        )}/>
      </Routes>
    </Layout>
    </>
  )
}

export default App
