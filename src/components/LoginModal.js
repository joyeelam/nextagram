import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
        <ModalBody>
          {
            isLogin ? <LoginForm switchLogin={switchLogin} setCurrentUser={setCurrentUser}/> : <SignUpForm switchLogin={switchLogin} setCurrentUser={setCurrentUser}/>
          }
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;
