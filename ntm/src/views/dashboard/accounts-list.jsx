import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ShowUserGroup from '../components/model';
import RequestConfirmation from './request-confirmation';

export default React.memo(({ accountList, dispatch }) => {
  return (
    <Container fluid>
      {accountList.map((accounts, batchIndex) => {
        return (
          <div key={batchIndex}>
          <Row key={batchIndex}>
            {
              accounts.map((account, index) => {
                return (
                  <Col key={index}>
                    <Card key={index} style={{ width: '18rem' }}>
                      <Card.Body key={index}>
                        <Card.Title>{account.accountName}</Card.Title>
                        <Card.Text>{account.id}</Card.Text>
                        <div className={'card-buttons'}>
                          <RequestConfirmation account={account} dispatch={dispatch} />
                          <ShowUserGroup account={account} />
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
