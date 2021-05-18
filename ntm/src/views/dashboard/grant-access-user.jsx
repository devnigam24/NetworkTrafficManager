import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserRoles from '../../constants/roles';

const MyVerticallyCenteredModal = React.memo(({
  show,
  onHide,
  account,
  onAccessGranted
}) => {
  const roleseSelected = React.useRef([]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {'Select Roles For Access'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{'Roles'}</h4>
        <Form.Group>
          <Form.Label>Select Roles:</Form.Label>
          <Form.Check type="checkBox" className={'user-all-roles-checkbox'} label={'All'} onChange={(event) => {
            document.querySelectorAll(".user-register-checkbox").forEach(elm => {
              elm.firstChild.checked = true;
            })
          }} />
          <section className={'roles-checks'} name="roles">
            {
              UserRoles.map((roles, index) => {
                return (
                  <Form.Check
                    inline
                    type="checkbox"
                    className={'user-register-checkbox'}
                    name={roles}
                    key={index}
                    label={roles}
                    onChange={(event) => {
                      if (!event.target.checked && document.querySelector('.user-all-roles-checkbox').firstChild.checked) {
                        document.querySelector('.user-all-roles-checkbox').firstChild.checked = false;
                      }
                    }}
                  />
                )
              })
            }
          </section>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={() => {
          document.querySelectorAll(".user-register-checkbox").forEach(elm => {
            if (elm.firstChild.checked) {
              roleseSelected.current.push(elm.firstChild.name);
            }
          });
          onAccessGranted(roleseSelected.current);
        }}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default React.memo(({ account, onAccessGranted }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [accessGranted, setAccessGranted] = React.useState(false);

  const handleAccessGrant = React.useCallback((roles) => {
    setAccessGranted(true);
    setModalShow(false);
    onAccessGranted({account, roles });
  }, [onAccessGranted]);

  return (
    <div>
      {
        accessGranted ?
          <Button variant="success">{'Access Granted'}</Button>
          :
          <Button variant="primary" onClick={() => setModalShow(true)}>{'Grant Access'}</Button>
      }

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        account={account}
        onAccessGranted={handleAccessGrant}
      />
    </div>
  );
});
