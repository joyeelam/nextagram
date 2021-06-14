import {useState, useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"
import Image from "react-graceful-image"

import UserImages from "../containers/UserImages"

const UserProfilePage = () => {

  const [userDetails, setUserDetails] = useState({})

  let {id} = useParams()

  useEffect(()=>{
    axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
    .then(result=>{
      setUserDetails(result.data)
    })
  }, [id])

  return (
    <>
      <div className="container-fluid">
        <div className="userContainer">
          <Image src={userDetails.profileImage} width="20%" alt="profile"/>
          <h3>@{userDetails.username}</h3>
        </div>
        <div className="userImagesContainer">
          <UserImages userID={userDetails.id} width="250px" height="250px"/>
        </div>
      </div>
    </>
  )
}

export default UserProfilePage
