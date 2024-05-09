import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ForgetPassword from "./pages/ForgetPassword";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/profile' element = {<Profile/>}/>
            <Route path='/signin' element = {<SignIn/>}/>
            <Route path='/forgetpassword' element = {<ForgetPassword/>}/>
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
