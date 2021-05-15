import React from 'react';
import './index.scss';

export default React.memo((props) => 
  <div
    variant="primary"
    type="submit"
    className={'primary-button'}
    onClick={props.onClick}
  >
    {props.label}
  </div>
);
