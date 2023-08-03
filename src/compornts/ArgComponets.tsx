import { useRef, useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';
import { Button, Switch, Input, Typography, Space, Select, InputNumber } from '@arco-design/web-react';
import { open } from '@tauri-apps/api/dialog';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { SelectHandle } from '@arco-design/web-react/es/Select/interface';
import { appConfigDir } from '@tauri-apps/api/path';

function getTypStyle(isOptional: boolean, isSwitch: boolean = false) {
  var fix_style = { fontSize: 8 }
  var width_style = isSwitch ? {} : (isOptional ? { width: titleWidth } : { width: fullTitleWidth })
  return { ...fix_style, ...width_style }
}
// 常量属性
const titleWidth = '124px';
const fullTitleWidth = '160px';
const valueWidth = '420px';

// props
export interface CmpBase<T> {
  id: string;
  title: string;
  // value?: T,
  enable?: boolean;
  isOptional?: boolean;
  defaultValue?: T;
  isExtraArg?: boolean;
}
export interface CmpFileProps extends CmpBase<string> {
  filters: Array<{ name: string; extensions: Array<string> }>;
  defaultPath: string | null;
}
export interface CmpFolderProps extends CmpBase<string> {
  defaultPath: string | null;
}
export interface CmpTextProps extends CmpBase<string> {}
export interface CmpSwitchProps extends CmpBase<boolean> {}
export interface CmpComboxProps extends CmpBase<string> {
  options: Array<string>;
}
export interface CmpNumProps extends CmpBase<number> {
  min: number;
  max: number;
  step: number;
  precision: number;
}

export interface CmpBaseRef {
  getArgumentString: () => string;
}

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
      return isOptional && !enable ? '' : (props.isExtraArg ? `\"${props.id}=${value}\"` : `--${props.id}=${value}`);
    },
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size='small' type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={getTypStyle(isOptional)}>{title}</Typography>
        <Input
          size='mini'
          ref={inputRef}
          type="text"
          style={{ width: valueWidth }}
          disabled={!enable}
          value={value}
          defaultValue={defaultValue}
          onChange={(v) => {
            setValue(v);
          }}></Input>
        <Button
          size='mini'
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

const CmpFolder = forwardRef<CmpBaseRef, CmpFolderProps>((props, ref) => {
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
      return isOptional && !enable ? '' : (props.isExtraArg ? `\"${props.id}=${value}\"` : `--${props.id}=${value}`);
    },
  }));

  async function onOpenClicked() {
    const select = await open({
      directory: true,
      defaultPath: props.defaultPath ?? (await appConfigDir()),
    });

    if (typeof select == 'string') setValue(select);
  }

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size='small' type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={getTypStyle(isOptional)}>{title}</Typography>
        <Input
          size='mini'
          ref={inputRef}
          type="text"
          style={{ width: valueWidth }}
          disabled={!enable}
          value={value}
          defaultValue={defaultValue}
          onChange={(v) => setValue(v)}></Input>
        <Button
          size='mini'
          disabled={!enable}
          onClick={async (e) => {
            await onOpenClicked();
          }}>
          Open
        </Button>
      </Space>
    </div>
  );
});

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
      return isOptional && !enable ? '' : (props.isExtraArg ? `\"${props.id}=${value}\"` : `--${props.id}=${value}`);
    },
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size='small' type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={getTypStyle(isOptional)}>{title}</Typography>
        <Input
          size='mini'
          ref={inputRef}
          type="text"
          style={{ width: valueWidth }}
          disabled={!enable}
          value={value}
          defaultValue={defaultValue}
          onChange={(v) => setValue(v)}></Input>
      </Space>
    </div>
  );
});

const CmpSwitch = forwardRef<CmpBaseRef, CmpSwitchProps>((props, ref) => {
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState<boolean>(false);
  const [enable, setEnable] = useState<boolean>(true);
  const [isOptional, setIsOptional] = useState<boolean>(false);
  useEffect(() => {
    setTitle(props.title);
    setValue(props.defaultValue ?? true);
    setEnable(props.enable ?? true);
    setIsOptional(props.isOptional ?? false);
  }, []);

  useImperativeHandle(ref, () => ({
    getArgumentString: () => {
      return isOptional && !enable ? '' : (props.isExtraArg ? `\"${props.id}=${value}\"` : `--${props.id}`);
    },
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={getTypStyle(isOptional, true)}>{title}</Typography>
      </Space>
    </div>
  );
});

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
      return isOptional && !enable ? '' : (props.isExtraArg ? `\"${props.id}=${value}\"` : `--${props.id}=${value}`);
    },
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size='small' type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={getTypStyle(isOptional)}>{title}</Typography>
        <Select size='mini' ref={selectRef} style={{ width: valueWidth }} disabled={!enable} value={value} defaultValue={defaultValue} onChange={(v) => setValue(v)}>
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

const CmpNum = forwardRef<CmpBaseRef, CmpNumProps>((props, ref) => {
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [enable, setEnable] = useState<boolean>(true);
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10);
  const [step, setStep] = useState<number>(1);
  const [precision, setPrecision] = useState<number>(1);
  const inputRef = useRef<RefInputType>(null);

  useEffect(() => {
    setTitle(props.title);
    setValue(props.defaultValue ?? 0);
    setEnable(props.enable ?? true);
    setIsOptional(props.isOptional ?? false);
    setMin(props.min);
    setMax(props.max);
    setStep(props.step);
    setPrecision(props.precision);
  }, []);

  useImperativeHandle(ref, () => ({
    getArgumentString: () => {
      return isOptional && !enable ? '' : (props.isExtraArg ? `\"${props.id}=${inputRef.current?.dom.value}\"` : `--${props.id}=${inputRef.current?.dom.value}`);
    },
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size='small' type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={getTypStyle(isOptional)}>{title}</Typography>
        <InputNumber
          size='mini'
          ref={inputRef}
          style={{ width: valueWidth }}
          mode="button"
          defaultValue={props.defaultValue}
          min={min}
          max={max}
          step={step}
          precision={precision}
          disabled={!enable}></InputNumber>
      </Space>
    </div>
  );
});

export { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum };
