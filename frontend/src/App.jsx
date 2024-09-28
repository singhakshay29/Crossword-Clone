import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import './App.css';
import AllBooks from './pages/AllBooks'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {AuthContextProvider, DataContextProvider} from './DataContextProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';


function App() {

  return (
    <AuthContextProvider>
    <DataContextProvider>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product' element={<Product />} />
      <Route path='/user/signin' element={<SignIn/>}/>
      <Route path='/user/signup' element={<SignUp/>}/>
      <Route path='/allbook' element={<AllBooks/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    <Footer/>
    </DataContextProvider>
    </AuthContextProvider>
)
}

export default App
