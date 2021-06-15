import {useState} from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"
import Image from "react-graceful-image"

import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator"
import UserImages from "../containers/UserImages"
import UploadImageModal from "../containers/UploadImageModal"

const UserPage = ({loggedIn}) => {

  const [currentUser, updateCurrentUser] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  if(loggedIn) {
    axios.get("https://insta.nextacademy.com/api/v1/users/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then((resp) => {
      // console.log(resp)
      updateCurrentUser(resp.data)
      setIsLoading(false)
      // console.log(currentUser)
    })
  } else {
    history.push("/")
  }

  if(isLoading) {
    return <LoadingIndicator/>
  }

  if (currentUser) {
    return (
      <>
        <div className="userContainer">
          <p>Welcome back {currentUser.username}!</p>
          <Image src={currentUser.profile_picture} alt="profile" width="20%"/>
          <UploadImageModal />
        </div>
        <hr/>
        <div className="userImagesContainer">
          <UserImages userID={currentUser.id} width="250px" height="250px"/>
        </div>
      </>
    )
  }
}

export default UserPage
