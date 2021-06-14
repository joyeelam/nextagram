// to work on:
// styling of choose file / input field
// styling of live preview > use placeholder instead?
// uploading progress bar/spinner
// validation if wrong type of file input

import {useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"
import Image from "react-graceful-image"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Input} from "reactstrap"

const UploadImageModal = () => {

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

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
        toggle()
        toast.success("Image uploaded successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        window.location.reload()
      }
    })
    .catch(error => {
      console.log(error.resp)
    })
  }

  return (
    <div>
      <br/>
      <Button color="success" onClick={toggle}>Upload</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upload Image</ModalHeader>
        <Form onSubmit={handleUpload}>
          <ModalBody>
            <FormGroup>
              <Input
                className="inputfile"
                type="file"
                name="image-file"
                onChange={(e)=>{
                  setImageFile(e.target.files[0])
                  setPreviewImage(URL.createObjectURL(e.target.files[0]))
                }}
              />
              <br/>
              <FormText color="muted">
                Make sure the image uploaded is a supported format.
              </FormText>
            </FormGroup>
            <div className="uploadCard">
              {previewImage ? (
                <Image
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
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Upload</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}

export default UploadImageModal;
