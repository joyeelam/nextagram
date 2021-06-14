// src/pages > homepage, my profile, user profile
// src/containers (non-page components that contain logic)
// > UserImages, UserSearch, Login API + validation, Signup API + validation, UploadImage API & validation
// src/components (dumb components - presentational and UI purposes)
// > LoadingIndicator, Navbar, Login Modal, SignUp Modal, UploadImage Modal

import {useState} from "react"
import {Route, useHistory} from "react-router-dom"
import {ToastContainer, toast} from "react-toastify"

import Homepage from "./pages/Homepage"
import UserProfilePage from "./pages/UserProfilePage"
import UserPage from "./pages/UserPage"

import NavigationBar from "./components/Navbar"

import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"))
  const history = useHistory()

  const logOut = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setLoggedIn(!loggedIn)
    history.push("/")
    toast.success('Logout successful, see you soon!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <div className="App">
      <ToastContainer />
      <NavigationBar logOut={logOut} />
      <Route exact path="/" component={Homepage} />
      <Route path="/user/:username" component={UserPage} />
      <Route path="/users/:id" component={UserProfilePage}/>
    </div>
  );
}

export default App;
