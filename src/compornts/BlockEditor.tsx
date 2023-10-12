import { useRef, useImperativeHandle } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { Switch, Input, Typography, Space, InputNumber, Modal, Button } from '@arco-design/web-react';

import { CmpBaseRef, CmpBase, ComponentUtils } from './ArgComponets';

export interface BlockCellProps {
    lb: string;
    defaultValue: number;
    enable: boolean;
    no: number;
}
export interface BlockCellRef { 
    getValue(): number;
    setValue(value: number): void;
}
const BlockCell = forwardRef<BlockCellRef, BlockCellProps>((props, ref) => {
    const [lb, setlb] = useState<string>('')
    const [enable, setEnable] = useState<boolean>(false)
    const [value, setValue] = useState<number>(props.defaultValue)
    const inputRef = useRef<RefInputType>(null);
    useEffect(() => {
        setlb(props.lb)
        setEnable(props.enable)
    })

    useImperativeHandle(ref, () => ({
        getValue: () => value,
        setValue: (value: number) => {
            setValue(value);
        }
      }));

    // const onValueChange = (value: number): void => { setValue(value) }
      
    return (
        <Space direction='vertical' style={{width: '4em'}}>
            <div>{lb}</div>
            <InputNumber size='mini' ref={inputRef} defaultValue={props.defaultValue} min={0} max={128} step={1} precision={0} disabled={!enable} onChange={(val) => {
                setValue(val)
            }}></InputNumber>
        </Space>
    )
})


export interface CmpTextProps extends CmpBase<string> {}

const BlockEditor = forwardRef<CmpBaseRef, CmpTextProps>((props, ref) => {
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [enable, setEnable] = useState<boolean>(true);
  const [defaultValue, setDefaultValue] = useState<string>('');
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const inputRef = useRef<RefInputType>(null);
  const cellRefs: Array<React.RefObject<BlockCellRef>> = [];
  const createBlockCellRef = (): React.RefObject<BlockCellRef> => {
    const ref = useRef<BlockCellRef>(null);
    cellRefs.push(ref);
    return ref;
  }

  for (let i = 0; i < 25; ++i) {
    createBlockCellRef();
  }

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
  }));

  const updateValueFromBlockEditor = ():void => {
    let str = '';
    const arr_len = cellRefs.length;
    for (let i = 0; i < arr_len; i++) 
    {
        str += cellRefs[i].current?.getValue() ?? '';
        if (i < arr_len - 1) {
            str += ','
        } 
    }

    setValue(str);
    // if (inputRef.current != null) inputRef.current.dom.value = str;
  };

  const updateBlockEditorValue = ():void => {
    if (value == '') return;

    const vals = value.split(',');
    const val_len = vals.length;
    const ref_len = cellRefs.length;
    const min_len = Math.min(val_len, ref_len);
    for (var i = 0; i < min_len; i++) {
        let cell_val = Number(vals[i]);
        if (!Number.isNaN(cell_val)) {
            cellRefs[i].current?.setValue(cell_val);
        }
    }
  }

  return (
    <div>
      <Modal
        title='Block Editor'
        visible={modalVisible}
        onOk={() => { 
            setModalVisible(false);
            updateValueFromBlockEditor();
        }}
        onCancel={() => setModalVisible(false)}
        autoFocus={false}
        focusLock={true}
        style={{width: '59em'}}
      >
            <Space direction='vertical'>
                <Space direction='horizontal'>
                    <BlockCell lb="IN0" defaultValue={0} enable={false} no={0} ref={cellRefs[0]}/>
                    <BlockCell lb="IN1" defaultValue={128} enable={true} no={1} ref={cellRefs[1]}/>
                    <BlockCell lb="IN2" defaultValue={128} enable={true} no={2} ref={cellRefs[2]}/>

                    <div style={{width: '28em'}}></div>
                    <BlockCell lb="OUT9" defaultValue={128} enable={true} no={22} ref={cellRefs[22]}/>
                    <BlockCell lb="OUT10" defaultValue={128} enable={true} no={23} ref={cellRefs[23]}/>
                    <BlockCell lb="OUT11" defaultValue={128} enable={true} no={24} ref={cellRefs[24]}/>
                </Space>
                <Space direction='horizontal'>
                    <div style={{width: '8.5em'}}></div>
                    <BlockCell lb="IN3" defaultValue={0} enable={false} no={3} ref={cellRefs[3]}/>
                </Space>
                <Space direction='horizontal'>
                    <div style={{width: '8.5em'}}></div>
                    <BlockCell lb="IN4" defaultValue={128} enable={true} no={4} ref={cellRefs[4]}/>
                    <BlockCell lb="IN5" defaultValue={128} enable={true} no={5} ref={cellRefs[5]}/>

                    <div style={{width: '19em'}}></div>
                    <BlockCell lb="OUT6" defaultValue={128} enable={true} no={19} ref={cellRefs[19]}/>
                    <BlockCell lb="OUT7" defaultValue={128} enable={true} no={20} ref={cellRefs[20]}/>
                    <BlockCell lb="OUT8" defaultValue={128} enable={true} no={21} ref={cellRefs[21]}/>
                </Space>
                <Space direction='horizontal'>
                    <div style={{width: '13em'}}></div>
                    <BlockCell lb="IN6" defaultValue={0} enable={false} no={6} ref={cellRefs[6]}/>
                </Space>
                <Space direction='horizontal'>
                    <div style={{width: '13em'}}></div>
                    <BlockCell lb="IN7" defaultValue={128} enable={true} no={7} ref={cellRefs[7]}/>
                    <BlockCell lb="IN8" defaultValue={128} enable={true} no={8} ref={cellRefs[8]}/>

                    <div style={{width: '10em'}}></div>
                    <BlockCell lb="OUT3" defaultValue={128} enable={true} no={16} ref={cellRefs[16]}/>
                    <BlockCell lb="OUT4" defaultValue={128} enable={true} no={17} ref={cellRefs[17]}/>
                    <BlockCell lb="OUT5" defaultValue={128} enable={true} no={18} ref={cellRefs[18]}/>
                </Space>
                <Space direction='horizontal'>
                    <div style={{width: '17.5em'}}></div>
                    <BlockCell lb="IN9" defaultValue={0} enable={false} no={9} ref={cellRefs[9]}/>
                </Space>
                <Space direction='horizontal'>
                    <div style={{width: '17.5em'}}></div>
                    <BlockCell lb="IN10" defaultValue={0} enable={false} no={10} ref={cellRefs[10]}/>
                    <BlockCell lb="IN11" defaultValue={0} enable={false} no={11} ref={cellRefs[11]}/>

                    <div style={{width: '1em'}}></div>
                    <BlockCell lb="OUT0" defaultValue={0} enable={false} no={13} ref={cellRefs[13]}/>
                    <BlockCell lb="OUT1" defaultValue={0} enable={false} no={14} ref={cellRefs[14]}/>
                    <BlockCell lb="OUT2" defaultValue={0} enable={false} no={15} ref={cellRefs[15]}/>
                </Space>
                <Space direction='horizontal'>
                    <div style={{width: '25.5em'}}></div>
                    <BlockCell lb="MID" defaultValue={128} enable={true} no={12} ref={cellRefs[12]}/>
                </Space>
            </Space>
      </Modal>
      <Space style={{ margin: '2px' }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={ComponentUtils.getTypStyle(isOptional)}>{title}</Typography>
        <Input size="mini" readOnly={true} ref={inputRef} type="text" style={{ width: ComponentUtils.valueWidth }} disabled={!enable} value={value} defaultValue={defaultValue} onChange={(v) => setValue(v)}></Input>
        <Button
          size="mini"
          disabled={!enable}
          onClick={() => {
            updateBlockEditorValue()
            setModalVisible(true)
          }}>
          Editor
        </Button>
      </Space>
    </div>
  );
});

export { BlockEditor };
