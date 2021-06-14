import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import Image from "react-graceful-image"
import {Button} from "reactstrap"

import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator"
import UserImages from "../containers/UserImages"

const Homepage = () => {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get("https://insta.nextacademy.com/api/v1/users")
    .then(result => {
      setIsLoading(false)
      setUsers(result.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  if (isLoading) {
    return <LoadingIndicator width="400px" height="400px"/>
  }

  return (
    <div>
      {users.map(user => (
        <div className="userProfile" key={user.id}>
          <div className="homeUserSection">
            <Image
              src={user.profileImage}
              alt="profile"
              className="profileImage"
              placeholderColor="#d1e0e0"/>
            <p><strong>{user.username}</strong></p>
            <Button color="secondary" size="sm" className="showButton"><Link to={{pathname: `/users/${user.id}`}}>Show More</Link></Button>
          </div>
          <div className="homeUserImages">
            <UserImages userID = {user.id} width="250px" height="250px"/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Homepage;
