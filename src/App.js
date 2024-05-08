import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ForgetPassword from "./pages/ForgetPassword";
function App() {
  return (
    <>
      <Router>
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
