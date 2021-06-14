import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

import SignUpForm from "../containers/SignUpForm"

const SignUpModal = ({buttonLabel, setCurrentUser}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="link" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <SignUpForm toggle={toggle} setCurrentUser={setCurrentUser} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SignUpModal;
