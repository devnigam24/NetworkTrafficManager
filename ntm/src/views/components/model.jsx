import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { fetchListOfAccounts } from '../../view-models/data/user';
import User from '../../models/user';

const MyVerticallyCenteredModal = React.memo(({ show, onHide, usersData }) => {
  if (!usersData || !usersData.length) return <></>;
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Users that have access to this account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              usersData.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.fullName}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default React.memo(({ account }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [usersData, setUsersData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const userGroupData = await fetchListOfAccounts(account.userGroup);
      setUsersData(userGroupData.map(user => new User(user)));
    }

    fetchData();
  }, [account.userGroup, setUsersData]);

  return (
    <div className={"card-buttons-buttons"}>
      <Button variant="primary" onClick={() => setModalShow(true)}>Show User Group</Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        usersData={usersData}
      />
    </div>
  );
});
