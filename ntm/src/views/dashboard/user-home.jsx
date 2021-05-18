import React from 'react';
import { Alert, Table, Spinner, Container, Form, FormControl } from 'react-bootstrap';
import sortLogo from '../../assets/sort.png';

export default ({ fullName, acls, accountRequestsPending, onClickId, onClickName, onClickIP, onSearchACLs }) => {
  const tableBody = React.useMemo(() => {
    if (!acls.length) return <></>;

    return (
      acls.map((acl, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{acl.id}</td>
            <td>{acl.name}</td>
            <td>{acl.accountName}</td>
            <td>{acl.type}</td>
            <td>{acl.type === "Source" ? acl.sourceIP : acl.destinationIP}</td>
            <td>{acl.type === "Source" ? acl.sourceProtocol : acl.destinationeProtocol}</td>
            <td>{acl.type === "Source" ? acl.sourceDecesion : acl.destinationeDecesion}</td>
            <td><Spinner animation="grow" variant="success" /></td>
          </tr>
        )
      })
    )
  }, [acls]);

  return (
    <div className={'user-home-container'}>
      <Alert variant="success">
        <Alert.Heading>{`Welcome, ${fullName}`}</Alert.Heading>
        <p>{`You have ${acls?.length} ACLs running`}</p>
        <p>{`You have ${accountRequestsPending?.length} pending requests`}</p>
        <hr />
        <p className="mb-0">
          Below you can see the health of your ACLs
        </p>
      </Alert>

      <Container fluid>
        <Alert variant="success">
          <Alert.Heading>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>{'Acls'}</div>
              <div>
                <Form inline>
                  <FormControl type="text" onChange={(event) => {
                    event.preventDefault();
                    console.log(event.target.value);
                    onSearchACLs(event.target.value);
                  }} placeholder="Search" className="mr-sm-2" />
                </Form>
              </div>
            </div>
          </Alert.Heading>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th className={'acl-th'}>
                  <div onClick={onClickId}>
                    <div>Id</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
                <th className={'acl-th'}>
                  <div onClick={onClickName}>
                    <div>Name</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
                <th className={'acl-th'}>
                  <div onClick={onClickId}>
                    <div>Account Name</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
                <th className={'acl-th'}>
                  <div onClick={onClickId}>
                    <div>Type</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
                <th className={'acl-th'}>
                  <div onClick={onClickIP}>
                    <div>IP</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
                <th className={'acl-th'}>
                  <div onClick={onClickId}>
                    <div>Protocol</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
                <th className={'acl-th'}>
                  <div onClick={onClickId}>
                    <div>Access</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
                <th className={'acl-th'}>
                  <div onClick={onClickId}>
                    <div>Health</div>
                    <div><img src={sortLogo} /></div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </Table>
        </Alert>
      </Container>
    </div>
  );
};
