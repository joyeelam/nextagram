import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

import LoginForm from "../containers/LoginForm"
import SignUpForm from "../containers/SignUpForm"

const SignUpModal = (props) => {
  const {
    setCurrentUser
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [isSignUp, setIsSignUp] = useState(true)
  const switchSignUp = () => setIsSignUp(!isSignUp)

  return (
    <div>
      <Button color="link" onClick={toggle}>Sign Up</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {
            isSignUp ? <SignUpForm switchLogin={switchSignUp} setCurrentUser={setCurrentUser}/> : <LoginForm  setCurrentUser={setCurrentUser} switchLogin={switchSignUp}/>
          }
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SignUpModal;
