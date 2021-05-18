import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

import GrantAccessToUser from './grant-access-user';

export default React.memo(({ userList, dispatch, onAccessGranted }) => {
  return (
    <Container fluid>
      {userList.map((accounts, batchIndex) => {
        return (
          <div key={batchIndex}>
          <Row key={batchIndex}>
            {
              accounts.map((account, index) => {
                return (
                  <Col key={index}>
                    <Card key={index} style={{ width: '18rem' }}>
                      <Card.Body key={index}>
                        <Card.Title>{`${account.firstName} ${account.lastName}`}</Card.Title>
                        <Card.Text>{account.email}</Card.Text>
                        <div className={'card-buttons'}>
                          <GrantAccessToUser onAccessGranted={onAccessGranted} account={account} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
          </div>
        )
      })
      }
    </Container>
  );
});
