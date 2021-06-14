import {useState, useEffect} from "react"
import axios from "axios"
import Image, {onErrorCallback} from "react-graceful-image"
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator"
import {Col, Card} from "reactstrap"

const UserImages = ({userID, width, height}) => {

  const [userImages, setUserImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userID}`)
    .then(result => {
      setIsLoading(false)
      setUserImages(result.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [userID])

  if (isLoading) {
    return <LoadingIndicator width="150px" height="150px"/>
  }

  return (
    <div className="userImages">
      {userImages.map(user => (
        <Col sm="6" md="4" key={user.id}>
          <Card>
            <Image
              width = {width}
              height= {height}
              src={user.url}
              alt=""
              className="cardImage"
              placeholderColor="#d1e0e0"
              onError = {onErrorCallback}
            />
          </Card>
        </Col>
      )).reverse()}
    </div>
  )
}

export default UserImages;
