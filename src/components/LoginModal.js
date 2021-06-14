// fix CSS styling glassmorphism 

import { useState } from 'react';
import { Button, Modal, ModalBody} from 'reactstrap';

import LoginForm from "../containers/LoginForm"
import SignUpForm from "../containers/SignUpForm"

const LoginModal = (props) => {
  const {
    setCurrentUser
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [isLogin, setIsLogin] = useState(true)
  const switchLogin = () => setIsLogin(!isLogin)

  return (
    <div>
      <Button color="link" onClick={toggle}>Sign In</Button>
      <Modal isOpen={modal} toggle={toggle} className="navbarmodal">
        <ModalBody>
          {
            isLogin ? <LoginForm switchLogin={switchLogin} setCurrentUser={setCurrentUser} toggle={toggle}/> : <SignUpForm switchLogin={switchLogin} setCurrentUser={setCurrentUser} toggle={toggle}/>
          }
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;
