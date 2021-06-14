// to work on:
// background: show background with transparency on
// glassmorphism css for the modal?
// validate username (alert if no such account exists)
// validate password (alert if wrong password)
// add login using social media option
// disable submit button when one of the fields is empty
// add react toast "Welcome back!" upon successful login
// add react toast "Failed to login, try again." upon unsuccessful login

import {useState} from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"
import {Button, Form, FormGroup, FormText, Input} from "reactstrap"
import {toast} from "react-toastify"

const LoginForm = ({setCurrentUser, toggle, switchLogin}) => {

  const [username, changeUsername] = useState("")
  const [password, changePassword] = useState("")
  const history = useHistory()

  const login = () => {
    axios.post("https://insta.nextacademy.com/api/v1/login", {username, password})
    .then((resp) => {
      // console.log(resp.data)
      localStorage.setItem("token", resp.data.auth_token)
      // console.log(localStorage.getItem("token"))
      toast.success(`Hi ${username}, we've missed you.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
      history.push("/user/me")
      setCurrentUser(true)
    })
  }

  return(
    <div>
      <Form>
        <FormGroup>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {changeUsername(e.target.value)}}
          />
        </FormGroup>
        <br/>
        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{changePassword(e.target.value)}}
          />
        </FormGroup>
        <hr/>
        <FormGroup>
          <Button color="success">Log in with Google</Button>
        </FormGroup>
        <FormText>
          Don't have an account? <Button color="link" onClick={switchLogin}>Sign Up.</Button>
        </FormText>
      </Form>
      <Button color="primary" onClick={login}>Log In</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </div>
  )
}

export default LoginForm;
