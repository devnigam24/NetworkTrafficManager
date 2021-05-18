import React from 'react';
import Form from 'react-bootstrap/Form';
import UserRoles from '../../../constants/roles';
import { createUser } from '../../../view-models/data/user';
import User from '../../../models/user';

export default React.memo(() => {
  const onFormSubmit = React.useCallback((event) => {
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
    const userObj = new User(formData);
    createUser(userObj);
  }, []);


  return (
    <Form onSubmit={onFormSubmit}>
      <div className="form-container">
        <Form.Group>
          <Form.Label>User Id</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter User Id" />
          <Form.Text className="text-muted">
            {'We will never share your email with anyone else.'}
          </Form.Text>
        </Form.Group>

        <div className={'form-name'}>
          <Form.Group >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" placeholder="First Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" placeholder="Last Name" />
          </Form.Group>
        </div>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Roles:</Form.Label>
          <Form.Check type="checkBox" className={'user-all-roles-checkbox'} label={'All'} onChange={(event) => {
            document.querySelectorAll(".user-register-checkbox").forEach(elm => {
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
                    className={'user-register-checkbox'}
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
