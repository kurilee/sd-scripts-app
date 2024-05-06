import { useRef, useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { Switch, Typography, Space, InputNumber } from '@arco-design/web-react';


import { CmpBaseRef, CmpBase, ComponentUtils } from './ArgComponets';

export interface CmpNumProps extends CmpBase<number> {
  min: number;
  max: number;
  step: number;
  precision: number;
}

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
      return ComponentUtils.getArgString(isOptional, enable, props.id, inputRef.current?.dom.value, props.isExtraArg || false);
    },
    getString:() => inputRef.current == null ? '' : inputRef.current.dom.value,
  }));

  return (
    <div>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={ComponentUtils.getTypStyle(isOptional)}>{title}</Typography>
        <InputNumber size="mini" ref={inputRef} style={{ width: ComponentUtils.valueWidth }} mode="button" defaultValue={props.defaultValue} min={min} max={max} step={step} precision={precision} disabled={!enable}></InputNumber>
      </Space>
    </div>
  );
});

export { CmpNum };
