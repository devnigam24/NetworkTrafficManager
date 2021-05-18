import React from 'react';
import Form from 'react-bootstrap/Form';

export default React.memo(() => {
  const onFormSubmit = React.useCallback((event) => {
    event.preventDefault();

    const formData = Array.from(event.target.elements).reduce((acc, element) => {
      acc[element.name] = element.value.trim();
      return acc;
    }, {});

  }, []);

  return (
    <Form onSubmit={onFormSubmit}>
      <div className="form-container">
        <Form.Group>
          <Form.Label>Enter Account Name</Form.Label>
          <Form.Control type="text" name="accountName" placeholder="Account Name" />
          <Form.Text className="text-muted">
            {'Choose a unique system account name to request account'}
          </Form.Text>
        </Form.Group>
      </div>
      <div className="button-container">
        <Form.Group>
          <input className='primary-button' type="submit" label={'Request'} />
        </Form.Group>
      </div>
    </Form>
  );
});