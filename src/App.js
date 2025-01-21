
import './App.css';
import Carousel from './Components/Carousel';
import Connect from './Components/Connect';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import Cart from './Components/Header/Cart';
import CartPage from './Pages/CartPage';
import Login from './Pages/Login';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import ProfilePage from './Pages/ProfilePage';
import ProductPage from './Pages/ProductPage';
import { useEffect } from 'react';
import axios from 'axios';
import { setCartItems } from './Slices/cartSlice';
import { setProductItems } from './Slices/productSlice';
import { setCurrentUser } from './Slices/authSlice';
function Layout(element){
return (
  <>
    <Header />
    <Navbar />
    {element} 
    <Connect />
    <Footer />
  </>
)}
function App() {
  const user  = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (user && user.token) {
    //   console.log(user);
    //   axios.get('http://localhost:4000/cart', {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`
    //     }
    //   })
    //     .then(response => {
    //       const items = response?.data?.cart || [];
    //       console.log(items);
    //       dispatch(setCartItems(items));
    //       console.log('success');
    //     })
    //     .catch(err => console.error(err));
    // }
    const token = localStorage.getItem("token");
    // axios.get("http://localhost:4000/product")
    //       .then(response =>{
    //         const items = response?.data?.products || [];
    //         console.log(items);
    //         dispatch(setProductItems(items));
    //         console.log("success");
    //       }).catch(err => console.log(err.message));




    
    function AuthorizationToken(token){
    
      axios.get("http://localhost:4000/user/userinfo",
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response =>{
      const user = response?.data?.user || {};
      console.log(user);
      dispatch(setCurrentUser(user));
      console.log("Fetch the userInfo succesfully");
    }).catch(err => console.log(err.message));
    }

    if(token){
      AuthorizationToken(token);
    }
    
  },[]);
  return (
    

    <div className="App">
      <Router>
          <Routes>
          <Route path="/" element={Layout(<Home />)}></Route>
          <Route path="/cart" element={Layout(<CartPage />)}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/product" element={Layout(<ProductPage />)}></Route>
          </Routes>
      </Router>
    </div>
  
  );
}

export default App;
