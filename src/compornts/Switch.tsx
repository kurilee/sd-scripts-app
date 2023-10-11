import { useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { Switch, Typography, Space } from '@arco-design/web-react';


import { CmpBaseRef, CmpBase, ComponentUtils } from './ArgComponets';

export interface CmpSwitchProps extends CmpBase<boolean> {}

const CmpSwitch = forwardRef<CmpBaseRef, CmpSwitchProps>((props, ref) => {
  const [title, setTitle] = useState<string>('');
  // const [value, setValue] = useState<boolean>(false);
  const [enable, setEnable] = useState<boolean>(true);
  const [isOptional, setIsOptional] = useState<boolean>(false);
  useEffect(() => {
    setTitle(props.title);
    // setValue(props.defaultValue ?? true);
    setEnable(props.enable ?? true);
    setIsOptional(props.isOptional ?? false);
  }, []);

  useImperativeHandle(ref, () => ({
    getArgumentString: () => {
      return ComponentUtils.getArgString(isOptional, enable, props.id, undefined, props.isExtraArg || false);
    },
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={ComponentUtils.getTypStyle(isOptional, true)}>{title}</Typography>
      </Space>
    </div>
  );
});

export { CmpSwitch };
