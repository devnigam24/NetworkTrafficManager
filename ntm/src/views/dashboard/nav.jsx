import React from 'react';
import { Nav, Navbar, Button, FormControl, Form } from 'react-bootstrap';

import { invalidate } from '../../view-models/data/session';

export default React.memo(({ dispatch, userInSession, setTextSearch }) => {
  return (
    <div className={'dashboard-nav'}>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => dispatch({ type: 'home' })}>Home</Nav.Link>
          <Nav.Link onClick={() => dispatch({ type: 'manageAccess' })}>Manage Access</Nav.Link>
          {userInSession && <Nav.Link onClick={() => dispatch({ type: 'createACL' })}>Manage ACL</Nav.Link>}
        </Nav>
        <Form inline>
          <FormControl type="text" onChange={(event) => {
            event.preventDefault();
            setTextSearch(event.target.value);
          }} placeholder="Search" className="mr-sm-2" />
        </Form>
        <Form inline className={'logout-nav'}>
          <Button variant="danger" onClick={() => invalidate()}>Log Out</Button>
        </Form>
      </Navbar>
    </div>
  )
});
