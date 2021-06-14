// to work on:
// background: show background with transparency on
// glassmorphism css for the modal?

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
    .catch(error => {
      // console.error(error.response)
      toast.error('Invalid username/password, please try again!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
  }

  return(
    <div className="form">
      <h4>Sign In</h4>
      <hr/>
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
          <Button color="success" disabled>Log in with Google</Button>
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
