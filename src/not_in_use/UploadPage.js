// TO WORK ON:
// move this into a modal
// route user to their feed once image is uploaded

import {useState} from "react"
import axios from "axios"
import {
  Form,
  FormGroup,
  Input,
  FormText,
  Button
} from "reactstrap"

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [message, setMessage] = useState("")

  const handleUpload = (e) => {
    // prevent the default behaviour of the form submitting
    e.preventDefault()
    // Authorization of the user
    let token = localStorage.getItem("token")
    // Formdata object to hold the image file to send to the server
    let formData = new FormData()
    // Append the key:value pair to the formData object
    formData.append("image", imageFile)
    // axios post request
    axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(resp => {
      if(resp.data.success) {
        setMessage("Image Uploaded Successfully")
        setPreviewImage(null)
        setImageFile(null)
      }
    })
    .catch(error => {
      console.log(error.resp)
    })
  }

  return (
    <Form onSubmit={handleUpload}>
      <FormGroup>
        <Input
          type="file"
          name="image-file"
          onChange={(e)=>{
            setImageFile(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
          }}
        />
        <FormText color="muted">
          Make sure the image uploaded is a supported format.
        </FormText>
      </FormGroup>
      <Button type="submit" color="primary">Upload</Button>
      <div className="card">
        {previewImage ? (
          <img
            src={previewImage}
            width="50%"
            height="50%"
            alt=""
          />
        ) : (
          <h3 className="text-center">
            {message ? message : "Live Preview"}
          </h3>
        )}
      </div>
    </Form>
  )
}

export default UploadPage;
