import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import {ToastContainer} from "react-toastify"
import Profile from "./pages/Profile";
import SignIn from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Header from "./components/Header";
import Ai from "./pages/Ai";
import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
            
            <Route path='/' element = {<Home/>}/>
            <Route path="/profile" element={<PrivateRoute />}>
            <Route path='/profile' element = {<Profile/>}/>
            </Route>
            
            <Route path='/login' element = {<SignIn/>}/>
            <Route path='/forgetpassword' element = {<ForgetPassword/>}/>
            <Route path='/ai' element = {<Ai/>}/>
            <Route path='/register' element = {<Register />}/>
        </Routes>
      </Router>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  );
}

export default App;
