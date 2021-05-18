import React from 'react';
import Form from 'react-bootstrap/Form';
import UserRoles from '../../../constants/roles';
import { validateLogin } from '../../../view-models/data/user';

export default React.memo(({ dispatch }) => {
  const onFormSubmit = React.useCallback(async (event) => {
    event.preventDefault();
    const formData = Array.from(event.target.elements).reduce((acc, element) => {
      if (UserRoles.includes(element.name)) {
        if (!acc['roles']) {
          acc['roles'] = [];
        }
        if (element.checked) acc['roles'].push(element.name);
      } else {
        acc[element.name] = element.value.trim();
      }
      return acc;
    }, {});
    const { email, password } = formData;
    const userId = await validateLogin({ email, password });
    if (userId) {
      dispatch({ type: 'setUserId', data: userId });
    }
  }, [dispatch]);

  return (
    <Form onSubmit={onFormSubmit}>
      <div className="form-container">
        <Form.Group>
          <Form.Label>User Id:</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter User Email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Select Roles:</Form.Label>
          <Form.Check type="checkBox" className={'user-all-roles-checkbox'} label={'All'} onChange={(event) => {
            document.querySelectorAll(".user-login-checkbox").forEach(elm => {
              elm.firstChild.checked = true;
            })
          }} />
          <section className={'roles-checks'} name="roles">
            {
              UserRoles.map((roles, index) => {
                return (
                  <Form.Check
                    inline
                    type="checkbox"
                    className={'user-login-checkbox'}
                    name={roles}
                    key={index}
                    label={roles}
                    onChange={(event) => {
                      if (!event.target.checked && document.querySelector('.user-all-roles-checkbox').firstChild.checked) {
                        document.querySelector('.user-all-roles-checkbox').firstChild.checked = false;
                      }
                    }}
                  />
                )
              })
            }
          </section>
        </Form.Group>
      </div>
      <div className="button-container">
        <Form.Group>
          <input className='primary-button' type="submit" name="submit" label={'Submit'} />
        </Form.Group>
      </div>
    </Form>
  );
});
