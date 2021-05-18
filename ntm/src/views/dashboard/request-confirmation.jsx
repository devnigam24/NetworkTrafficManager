import React from 'react';
import { Overlay, Button, Popover } from 'react-bootstrap';

import { addUserInUserGroup } from '../../view-models/data/admin';
import { UserContext } from '../../view-models/context/user';

export default React.memo(({ account, dispatch }) => {
  const [show, setShow] = React.useState(false);
  const [requested, setRequested] = React.useState(false);
  const [userAdded, setUserAdded] = React.useState(false);
  const [target, setTarget] = React.useState(null);
  const ref = React.useRef(null);
  const userInSession = React.useContext(UserContext);
  let timeout = React.createRef();

  const alreadyHaveAccess = React.useMemo(() => {
    return account.userGroupRequestedToAdd.includes(userInSession.id);
  }, [userInSession.id, account]);

  React.useEffect(() => {
    async function requestAddition() {
      await addUserInUserGroup(account.id);
      dispatch({ type: 'initiateUserRefetch' })
      setUserAdded(true);
    }
    if (requested && !userAdded && !alreadyHaveAccess) {
      requestAddition();
    }
  }, [requested, setUserAdded, dispatch, account.id, alreadyHaveAccess]);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
    setRequested(true);
    timeout.current = setTimeout(() => {
      setShow(!!show);
    }, 1500)
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    }
  }, [timeout.current]);


  return (
    <div ref={ref} className={"card-buttons-buttons"}>
      {
        requested || alreadyHaveAccess ?
          <Button variant="success" onClick={handleClick}>{'Request Access'}</Button>
          :
          <Button variant="primary" onClick={handleClick}>{'Request Access'}</Button>
      }

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Requested</Popover.Title>
          <Popover.Content>
            <strong>Awaiting Confirmation</strong>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  )
});
