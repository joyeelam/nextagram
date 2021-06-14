// to work on:
// disable search button if input is not valid or return to homepage if input is not valid
// filter() search results
// search result return even if it's capitalized or has space at the end - use trim()??

import {useState, useEffect} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import {
  Form,
  Label,
  Input,
  Button
} from "reactstrap"

const UserSearch = () => {

  const [input, setInput] = useState("")
  const [userDetails, setUserDetails] = useState([])
  const history = useHistory()

  useEffect(()=>{
    axios.get(`https://insta.nextacademy.com/api/v1/users`)
    .then(result=>{
      setUserDetails(result.data) // returns array of objects
    })
  }, [])

  const userID = []

  for(let i=0; i<userDetails.length; i++) {
    if(userDetails[i].hasOwnProperty('username') && userDetails[i].username === input) {
      userID.push(userDetails[i].id)
    }
  }

  const handleClick = () => {
    if(input.trim() !== "") {
      history.push(`/users/${userID}`)
      setInput("")
    } else {
      return null
    }
  }

  return (
    <>
      <Form inline className="userSearch">
        <Label for="userSearch" hidden>Type username</Label>
        <Input
          type="text"
          name="username"
          id="userSearch"
          value={input}
          onChange={(e) => {setInput(e.target.value)}} placeholder="Type username"
        />
        <Button size="sm" outline color="secondary" className="searchBtn" onClick={handleClick}>Search</Button>
      </Form>
    </>
  )
}

export default UserSearch;
