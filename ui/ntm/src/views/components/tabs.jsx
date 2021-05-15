import React, { useState, memo } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

function ControlledTabs({ tabs, defaultTab }) {
  const [key, setKey] = useState(defaultTab);

  const setTabSpace = React.useCallback((k) => {
    setKey(k)
  }, [setKey]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={setTabSpace}
    >
      {
        tabs.map((tab, index) => {
          return (
            <Tab key={index} eventKey={tab.name} title={tab.name}>{tab.children}</Tab>
          )
        })
      }
    </Tabs>
  );
}

export default memo(ControlledTabs);
