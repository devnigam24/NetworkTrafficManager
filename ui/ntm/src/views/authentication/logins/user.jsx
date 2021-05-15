import React from 'react';
import Form from 'react-bootstrap/Form';
import UserRoles from '../../../constants/roles';
import Button from '../../components/button';

export default React.memo(() => {
  const onSubmit = React.useCallback(() => {
    console.log(12345);
  }, []);

  return (
    <Form>
      <div className="form-container">
        <Form.Group>
          <Form.Label>User Id:</Form.Label>
          <Form.Control type="email" placeholder="Enter User Id" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Roles:</Form.Label>
          <Form.Check type="checkbox" key={UserRoles.length + 1} label={'All'} />
          <section className={'roles-checks'}>
            {
              UserRoles.map((roles, index) => {
                return (
                  <Form.Check type="checkbox" key={index} label={roles} />
                )
              })
            }
          </section>
        </Form.Group>
      </div>
      <div className="button-container">
        <Form.Group>
          <Button onClick={onSubmit} label={'Submit'} />
        </Form.Group>
      </div>
    </Form>
  );
});
