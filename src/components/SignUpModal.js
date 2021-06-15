// fix CSS styling glassmorphism

import { useState } from 'react';
import { Button, Modal, ModalBody} from 'reactstrap';

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
      <Button outline color="secondary" onClick={toggle}>Sign Up</Button>
      <Modal isOpen={modal} toggle={toggle} className="navbarmodal">
        <ModalBody>
          {
            isSignUp ? <SignUpForm switchLogin={switchSignUp} setCurrentUser={setCurrentUser} toggle={toggle}/> : <LoginForm  setCurrentUser={setCurrentUser} switchLogin={switchSignUp} toggle={toggle}/>
          }
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SignUpModal;
