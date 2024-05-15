import { useRef, useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { Switch, Input, Typography, Space } from '@arco-design/web-react';

import { CmpBaseRef, CmpBase, ComponentUtils } from './ArgComponets';


export interface CmpTextProps extends CmpBase<string> {}


const CmpText = forwardRef<CmpBaseRef, CmpTextProps>((props, ref) => {
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [enable, setEnable] = useState<boolean>(true);
  const [defaultValue, setDefaultValue] = useState<string>('');
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const inputRef = useRef<RefInputType>(null);
  useEffect(() => {
    setTitle(props.title);
    setValue(props.defaultValue ?? '');
    setEnable(props.enable ?? true);
    setDefaultValue(props.defaultValue ?? '');
    setIsOptional(props.isOptional ?? false);
  }, []);

  useImperativeHandle(ref, () => ({
    getArgumentString: () => {
      return ComponentUtils.getArgString(isOptional, enable, props.id, value, props.isExtraArg || false);
    },
    getEditorString:() => value,
    setValue:(str) => {
      setValue(str);
    },
    setEnable(v) {
      setEnable(v);
    },
    getEnable: () => enable
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={ComponentUtils.getTypStyle(isOptional)}>{title}</Typography>
        <Input size="mini" ref={inputRef} type="text" style={{ width: ComponentUtils.valueWidth }} disabled={!enable} value={value} defaultValue={defaultValue} onChange={(v) => setValue(v)}></Input>
      </Space>
    </div>
  );
});

export { CmpText };
