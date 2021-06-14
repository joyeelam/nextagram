// to work on:
// styling of buttons > space out, consider icons?
// add currentuser thumbnail picture when logged in ?
// react toast > "Goodbye! See you soon!" upon logout

import {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink} from "reactstrap"

import LoginModal from "./LoginModal"
import SignUpModal from "./SignUpModal"
import UserSearch from "../containers/UserSearch"

const NavigationBar = ({logOut}) => {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [currentUser, setCurrentUser] = useState(!!localStorage.getItem("token"))
  const history = useHistory()

  const handleProfile = (e) => {
    history.push("/user/me")
  }

  const handleLogout = (e) => {
    logOut(e)
    setCurrentUser(!currentUser)
  }

  return(
    <div>
      <Navbar light expand="md" className="navbar">
        <Link className="nextagram" to={{pathname: "/"}}>
          <i className="fas fa-camera"></i> Nextagram
        </Link>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <UserSearch/>
            </NavItem>

            {currentUser ?
              <>
                <NavItem><NavLink onClick={handleProfile}>My Profile</NavLink></NavItem>
                <NavItem><NavLink onClick={handleLogout}>Log Out</NavLink></NavItem>
              </>
              :
              <>
                <NavItem>
                  <LoginModal setCurrentUser={setCurrentUser} />
                </NavItem>
                <NavItem>
                  <SignUpModal setCurrentUser={setCurrentUser} />
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavigationBar;
