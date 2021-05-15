import React from 'react';
import Form from 'react-bootstrap/Form';
import AdminRoles from '../../../constants/roles';
import Button from '../../components/button';

export default React.memo(() => {
  const onSubmit = React.useCallback(() => {
    console.log(12345);
  }, []);

  return (
    <Form>
      <div className="form-container">
        <Form.Group>
          <Form.Label>Enter Admin Account Id</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            {'Choose a Unique Admin Id to request account'}
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Roles:</Form.Label>
          <Form.Check type="checkbox" key={AdminRoles.length + 1} label={'All'} />
          <section className={'roles-checks'}>
            {
              AdminRoles.map((roles, index) => {
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
          <Button onClick={onSubmit} label={'Request'} />
        </Form.Group>
      </div>
    </Form>
  );
});