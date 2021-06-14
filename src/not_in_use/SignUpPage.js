import {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import axios from "axios"

import {
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap"

const SignUpPage = () => {

  const [username, newUsername] = useState("")
  const [email, newEmail] = useState("")
  const [password, newPassword] = useState("")
  const history = useHistory()

  const signUp = () => {
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/users/",
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    .then(resp => {
      // console.log(resp)
      localStorage.setItem("token", resp.data.auth_token)
      history.push(`/user/${username}`)
    })
    .catch(error => {
      console.error(error.response)
    })
  }

  return (
    <>
      <h1>Sign Up</h1>
      <Form>
        <Button>Log in with Google</Button>
        <p>or create a new account</p>
        <FormGroup>
          <Input
            type="text"
            placeholder="Username"
            value={username} onChange={(e)=>{newUsername(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{newEmail(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{newPassword(e.target.value)}}
          />
        </FormGroup>
        <Button onClick={signUp}>Create Account</Button>
        <p>Already have an account? <Link to={{pathname: "/login"}}>Log in here</Link></p>
      </Form>
    </>
  )
}

export default SignUpPage
