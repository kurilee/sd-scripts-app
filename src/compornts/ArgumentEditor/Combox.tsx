import { useRef, useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { Button, Switch, Input, Typography, Space, Select, InputNumber } from '@arco-design/web-react';
import { SelectHandle } from '@arco-design/web-react/es/Select/interface';

import { appConfigDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';

import { CmpBaseRef, CmpBase, ComponentUtils } from './ArgComponets';

export interface CmpComboxProps extends CmpBase<string> {
  options: Array<string>;
}

const CmpCombox = forwardRef<CmpBaseRef, CmpComboxProps>((props, ref) => {
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [enable, setEnable] = useState<boolean>(true);
  const [defaultValue, setDefaultValue] = useState<string>('');
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<string>>([]);
  const selectRef = useRef<SelectHandle>(null);
  useEffect(() => {
    setTitle(props.title);
    setValue(props.defaultValue ?? '');
    setEnable(props.enable ?? true);
    setDefaultValue(props.defaultValue ?? '');
    setIsOptional(props.isOptional ?? false);
    setOptions(props.options);
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
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={ComponentUtils.getTypStyle(isOptional)}>{title}</Typography>
        <Select size="mini" ref={selectRef} style={{ width: ComponentUtils.valueWidth }} disabled={!enable} value={value} defaultValue={defaultValue} onChange={(v) => setValue(v)}>
          {options.map((opt, idx) => {
            return (
              <Select.Option key={idx.toString()} value={opt}>
                {opt}
              </Select.Option>
            );
          })}
        </Select>
      </Space>
    </div>
  );
});

export { CmpCombox };
