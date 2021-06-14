// to work on:
// disable submit button when one of the fields is empty

import {useState} from 'react'
import axios from "axios"
import {useHistory} from "react-router-dom"
import {toast} from "react-toastify"
import {Button, Form, FormGroup, Input, FormText, FormFeedback} from 'reactstrap'

const SignUpForm = ({toggle, setCurrentUser, switchLogin}) => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, newPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const history = useHistory()

  const [delay, setDelay] = useState(null)
  const [usernameValid, setUsernameValid] = useState(true)
  const [emailValid, setEmailValid] = useState(false)
  const emailRegex = /\S+@\S+\.\S+/

  const signUp = () => {
    if (usernameValid && emailValid) {
      if (password === confirmPassword) {
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
          toast.success(`User ${username} successfully created!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          localStorage.setItem("token", resp.data.auth_token)
          toggle()
          history.push(`/user/${username}`)
          setCurrentUser(true)
        })
        .catch(error => {
          console.error(error.response)
        })
      }
    } else {
      return null
    }
  }

  // username validation logic

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

  // email validation logic

  const handleEmailInput = e => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (emailRegex.test(newEmail)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  const getEmailInputProp = () => {
    if (!email.length) {
      return null
    } if(emailValid) {
      return {valid: true}
    } else {
      return {invalid: true}
    }
  }

  const getEmailFormFeedback = () => {
    if(!email.length) {
      return null
    }
    if(emailValid) {
      return <FormFeedback>Your email looks good!</FormFeedback>
    } else {
      return <FormFeedback>Please enter a valid email.</FormFeedback>
    }
  }

  // password validation logic

  const getPasswordInputProp = () => {
    if(!password.length) {
      return null
    }
    if(password.length <= 6) {
      return {invalid: true}
    }
  }

  const getPasswordFormFeedback = () => {
    if(!password.length) {
      return null
    }
    if(password.length <= 6) {
      return <FormFeedback>Must be at least 6 characters.</FormFeedback>
    } else {
      return <FormFeedback>Password lock and loaded.</FormFeedback>
    }
  }

  // confirm password validation logic

  const getConfirmPasswordInputProp = () => {
    if (password === confirmPassword) {
      return {valid: true}
    } else {
      return {invalid: true}
    }
  }

  const getConfirmPasswordFeedback = () => {
    if (!confirmPassword.length) {
      return null
    }
    if (password === confirmPassword) {
      return <FormFeedback valid>Good to go!</FormFeedback>
    }
    if (password !== confirmPassword) {
      return <FormFeedback invalid>Oops, passwords don't match. Try again.</FormFeedback>
    }

  }

  return (
    <div>
      <h4>Sign Up</h4>
      <hr/>
      <Form className="form">
        <FormGroup>
          <Input
            type="text"
            placeholder="Enter a username between 6 and 20 characters"
            value={username}
            onChange={handleUsernameInput}
            {...getUsernameInputProp()}
          />
          {getUsernameFormFeedback()}
        </FormGroup>
        <br/>
        <FormGroup>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailInput}
            {...getEmailInputProp()}
          />
          {getEmailFormFeedback()}
        </FormGroup>
        <br/>
        <FormGroup>
          <Input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e)=>{newPassword(e.target.value)}}
            {...getPasswordInputProp()}
          />
          {getPasswordFormFeedback()}
          <br/>
          <Input
            type="password"
            placeholder="Retype password to confirm"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            {...getConfirmPasswordInputProp()}
          />
          {getConfirmPasswordFeedback()}
        </FormGroup>
        <hr/>
        <FormGroup>
          <Button color="success" disabled>Sign up with Google</Button>
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
