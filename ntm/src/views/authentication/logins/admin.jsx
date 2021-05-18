import React from 'react';
import Form from 'react-bootstrap/Form';
import { validateAccount } from '../../../view-models/data/admin';

export default React.memo(({ dispatch }) => {
  const onFormSubmit = React.useCallback(async (event) => {
    event.preventDefault();
    const formData = Array.from(event.target.elements).reduce((acc, element) => {
      acc[element.name] = element.value.trim();
      return acc;
    }, {});
    const accountId = await validateAccount(formData);
    if (accountId) {
      dispatch({ type: 'setAccountId', data: accountId });
    }

  }, []);

  return (
    <Form onSubmit={onFormSubmit}>
      <div className="form-container">
        <Form.Group>
          <Form.Label>Enter Admin Account Id</Form.Label>
          <Form.Control type="text" name="id" placeholder="Account Id" />
          <Form.Text className="text-muted">
            {'Admin Account Id should be the one you got in your email.'}
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
      </div>
      <div className="button-container">
        <Form.Group>
          <input className='primary-button' type="submit" label={'Submit'} />
        </Form.Group>
      </div>
    </Form>
  );
});