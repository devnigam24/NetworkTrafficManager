import React from 'react';
import { Alert, Button, Table, Container, Form } from 'react-bootstrap';

import ACL from '../../models/acl';
import { saveACL } from '../../view-models/data/user';

export default React.memo(({ accounts, userInSession, dispatch }) => {
  const onFormSubmit = React.useCallback(async (event) => {
    event.preventDefault();

    const formData = Array.from(event.target.elements).reduce((acc, element) => {
      acc[element.name] = element.value.trim();
      return acc;
    }, {});
    formData.accountName = accounts.find(account => account.id === formData.accountId).accountName;

    await saveACL(userInSession, new ACL(formData));
    dispatch({ type: 'initiateUserRefetch' });
  }, [accounts]);
  return (
    <Container>
      <Alert variant="success">
        <Alert.Heading>Create Access Control Lists</Alert.Heading>
        <hr />
        <div className="mb-0">
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <Form.Label>ACL Id</Form.Label>
              <Form.Control type="text" name="id" placeholder="Enter ACL Name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Account</Form.Label>
              <Form.Control as="select" name="accountId">
                {
                  accounts.map(account => {
                    return (
                      <option key={account.id} value={account.id}>{account.accountName}</option>
                    )
                  })
                }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rules</Form.Label>
              <div className={'rules-div'}>
                <div>
                  <Form.Control type="text" name="sourceIP" placeholder="Source IP" />
                  <Form.Control as="select" name="sourceProtocol">
                    <option value={'TCP'}>{'TCP'}</option>
                    <option value={'UDP'}>{'UDP'}</option>
                  </Form.Control>
                  <Form.Control as="select" name="sourceDecesion">
                    <option value={'Allow'}>{'Allow'}</option>
                    <option value={'Deny'}>{'Deny'}</option>
                  </Form.Control>
                </div>
                <div>
                  <Form.Control type="text" name="destinationIP" placeholder="Destination IP" />
                  <Form.Control as="select" name="destinationeProtocol">
                    <option value={'TCP'}>{'TCP'}</option>
                    <option value={'UDP'}>{'UDP'}</option>
                  </Form.Control>
                  <Form.Control as="select" name="destinationeDecesion">
                    <option value={'Allow'}>{'Allow'}</option>
                    <option value={'Deny'}>{'Deny'}</option>
                  </Form.Control>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">Check</Button>
            </Form.Group>
          </Form>
        </div>
      </Alert>
    </Container>
  )
});
