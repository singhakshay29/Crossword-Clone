import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import './App.css';
import AllBooks from './pages/AllBooks'
import {CreateBook} from './pages/CreateBook'
import DeletedBooks from './pages/DeletedBooks'
import UpdateBooks from './pages/UpdateBook'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DataContextProvider from './DataContextProvider';


function App() {

  return (
    <DataContextProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user/signin' element={<SignIn/>}/>
      <Route path='/user/signup' element={<SignUp/>}/>
      <Route path='/book' element={<AllBooks/>}/>
      <Route path='/book/create' element={<CreateBook/>}/>
      <Route path='/book/delete/:_id' element={<DeletedBooks/>}/>
      <Route path='/book/update/:_id' element ={<UpdateBooks/>}/>
    </Routes>
    </DataContextProvider>
)
}

export default App
