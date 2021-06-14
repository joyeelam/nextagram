import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

import LoginForm from "../containers/LoginForm"

const LoginModal = ({buttonLabel, setCurrentUser}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="link" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <LoginForm toggle={toggle} setCurrentUser={setCurrentUser} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;
