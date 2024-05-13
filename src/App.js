import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Header from "./components/Header";
import Ai from "./pages/Ai";
function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/profile' element = {<Profile/>}/>
            <Route path='/login' element = {<SignIn/>}/>
            <Route path='/forgetpassword' element = {<ForgetPassword/>}/>
            <Route path='/ai' element = {<Ai/>}/>
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
