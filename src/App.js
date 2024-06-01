import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import SignIn from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Header from './components/Header';
import Ai from './pages/Ai';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';
import SignUp from './pages/SignUp';
import CourseList from './pages/Course';
import News from './pages/News';
import Footer from './components/Footer';
import CourseRecommendation from './pages/SelfAccessment';
import AboutUs from './pages/AboutUs';


function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/ai" element={<Ai />} />
            <Route path="/course" element={<CourseList />} />
            <Route path="/news" element={<News />} />
            <Route path="/selfaccessment" element={<CourseRecommendation />} />
            <Route path='/aboutus' element={<AboutUs/>}/>
          </Routes>
        </div>
        <Footer />
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
    </div>
  );
}

export default App;
