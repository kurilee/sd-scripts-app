import { useRef, useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { Button, Switch, Input, Typography, Space, Select, InputNumber } from '@arco-design/web-react';

import { appConfigDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';

import { CmpBaseRef, CmpBase, ComponentUtils } from './ArgComponets';

export interface CmpFileProps extends CmpBase<string> {
  filters: Array<{ name: string; extensions: Array<string> }>;
  defaultPath: string | null;
}

/**
 * 文件控件
 */
const CmpFile = forwardRef<CmpBaseRef, CmpFileProps>((props, ref) => {
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

  async function onOpenClicked() {
    const select = await open({
      filters: props.filters,
      defaultPath: props.defaultPath ?? (await appConfigDir()),
    });

    if (typeof select == 'string') setValue(select);
  }

  useImperativeHandle(ref, () => ({
    getArgumentString: () => {
      return ComponentUtils.getArgString(isOptional, enable, props.id, value, props.isExtraArg || false);
    },
    getString:() => value,
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={ComponentUtils.getTypStyle(isOptional)}>{title}</Typography>
        <Input
          size="mini"
          ref={inputRef}
          type="text"
          style={{ width: ComponentUtils.valueWidth }}
          disabled={!enable}
          value={value}
          defaultValue={defaultValue}
          onChange={(v) => {
            setValue(v);
          }}></Input>
        <Button
          size="mini"
          disabled={!enable}
          onClick={async () => {
            await onOpenClicked();
          }}>
          Open
        </Button>
      </Space>
    </div>
  );
});

export { CmpFile };
