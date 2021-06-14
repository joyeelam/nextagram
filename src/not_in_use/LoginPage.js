// login details to test:
// username: blake pw: 12345678
// username/pw: joyeelam
// username/pw: joyee2ndtry

import {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import axios from "axios"
import {
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap"

const LoginPage = () => {

  const [username, changeUsername] = useState("")
  const [password, changePassword] = useState("")
  const history = useHistory()

  const login = () => {
    axios.post("https://insta.nextacademy.com/api/v1/login", {username, password})
    .then((resp) => {
      // console.log(resp.data)
      localStorage.setItem("token", resp.data.auth_token)
      // console.log(localStorage.getItem("token"))
      history.push("/user/me")
    })
  }

  return (
    <div>
      <Form>
        <h1>Login</h1>
        <FormGroup>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>{changeUsername(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{changePassword(e.target.value)}}
          />
        </FormGroup>
        <Button onClick={login}>Log In</Button>{' or '}<Button>Sign in with Google</Button>
        <p>Don't have an account? <Link to={{pathname: "/signup"}}>Create an account here</Link></p>
      </Form>
    </div>
  )
}

export default LoginPage;
