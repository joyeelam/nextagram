// to work on:
// email validation logic
// password validation logic (min 6 characters)
// confirm password validation logic
// add create account using social media option
// disable submit button when one of the fields is empty
// Add react toast "User successfully created!"

import {useState} from 'react'
import axios from "axios"
import {useHistory} from "react-router-dom"
import {Button, Form, FormGroup, Input, FormText, FormFeedback} from 'reactstrap'

const SignUpForm = ({setCurrentUser, switchLogin}) => {

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, newPassword] = useState("")
  const history = useHistory()

  const [delay, setDelay] = useState(null)
  const [usernameValid, setUsernameValid] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(false)

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
      toggle()
      history.push(`/user/${username}`)
      setCurrentUser(true)
    })
    .catch(error => {
      console.error(error.response)
    })
  }

  const checkUsername = newUsername => {
    // console.log("Making API call to check username!")
    axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`)
      .then(response=>{
        // console.log(response.data)
        if(response.data.valid) {
          setUsernameValid(true)
        } else {
          setUsernameValid(false)
        }
      })
  }

  const handleUsernameInput = e => {
    clearTimeout(delay)
    const newUsername = e.target.value
    setUsername(newUsername)
    const newDelay = setTimeout(()=>{
      checkUsername(newUsername)
    }, 400)
    setDelay(newDelay)
  }

  const getUsernameInputProp = () => {
    if(!username.length) {
      return null
    }
    if(username.length <= 6) {
      return {invalid: true}
    }
    if(usernameValid){
      return {valid: true}
    } else {
      return {invalid: true}
    }
  }

  const getUsernameFormFeedback = () => {
    if(!username.length) {
      return null
    }
    if(username.length <= 6) {
      return <FormFeedback invalid>Must be at least 6 characters.</FormFeedback>
    }
    if(usernameValid) {
      return <FormFeedback valid>Awesome! That username is available.</FormFeedback>
    } else {
      return <FormFeedback invalid>Sorry! Username is already taken, try something else.</FormFeedback>
    }
  }

  return (
    <div>
      <Form>
        <FormGroup>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameInput}
            {...getUsernameInputProp()}
          />
          {getUsernameFormFeedback()}
          <FormText>Enter a username between 6 and 20 characters</FormText>
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{newPassword(e.target.value)}}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
          />
        </FormGroup>
        <FormText>
          Already a member? <Button color="link" onClick={switchLogin}>Login here.</Button>
        </FormText>
      </Form>
      <Button color="primary" onClick={signUp}>Sign Up</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </div>
  );
}

export default SignUpForm;
