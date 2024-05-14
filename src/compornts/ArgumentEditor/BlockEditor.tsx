import { useRef, useImperativeHandle } from "react";
import { useState, useEffect, forwardRef } from "react";

import { RefInputType } from "@arco-design/web-react/es/Input/interface";
import { Switch, Input, Typography, Space, InputNumber, Modal, Button, Slider } from "@arco-design/web-react";

import { CmpBaseRef, CmpBase, ComponentUtils } from "./ArgComponets";

export interface BlockCellProps {
  lb: string;
  defaultValue: number;
  enable: boolean;
  no: number;
  width: string;
}
export interface BlockCellRef {
  getValue(): number;
  setValue(value: number): void;
}
const BlockCell = forwardRef<BlockCellRef, BlockCellProps>((props, ref) => {
  const [lb, setlb] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(false);
  const [value, setValue] = useState<number>(props.defaultValue);
  const inputRef = useRef<RefInputType>(null);
  useEffect(() => {
    setlb(props.lb);
    setEnable(props.enable);
  });

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (value: number) => {
      setValue(value);
    },
  }));

  // const onValueChange = (value: number): void => { setValue(value) }

  return (
    <Space direction="vertical" style={{ width: props.width }} size={0}>
      <div>{lb}</div>
      <InputNumber
        size="mini"
        ref={inputRef}
        defaultValue={props.defaultValue}
        value={value}
        min={0}
        max={128}
        step={1}
        precision={0}
        disabled={!enable}
        onChange={(val) => {
          setValue(val);
        }}
      ></InputNumber>
    </Space>
  );
});

export interface CmpTextProps extends CmpBase<string> {}

const BlockEditor = forwardRef<CmpBaseRef, CmpTextProps>((props, ref) => {
  const dim_min = 0;
  const dim_max = 128;
  const dim_default = 64;

  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(true);
  const [defaultValue, setDefaultValue] = useState<string>("");
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const inputRef = useRef<RefInputType>(null);
  const cellRefs: Array<React.RefObject<BlockCellRef>> = [];
  const createBlockCellRef = (): React.RefObject<BlockCellRef> => {
    const ref = useRef<BlockCellRef>(null);
    cellRefs.push(ref);
    return ref;
  };

  for (let i = 0; i < 25; ++i) {
    createBlockCellRef();
  }

  useEffect(() => {
    setTitle(props.title);
    setValue(props.defaultValue ?? "");
    setEnable(props.enable ?? true);
    setDefaultValue(props.defaultValue ?? "");
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
  }));

  const updateValueFromBlockEditor = (): void => {
    let str = "";
    const arr_len = cellRefs.length;
    for (let i = 0; i < arr_len; i++) {
      str += cellRefs[i].current?.getValue() ?? "";
      if (i < arr_len - 1) {
        str += ",";
      }
    }

    setValue(str);
    // if (inputRef.current != null) inputRef.current.dom.value = str;
  };

  const updateBlockEditorValue = (): void => {
    if (value == "") return;

    const vals = value.split(",");
    const val_len = vals.length;
    const ref_len = cellRefs.length;
    const min_len = Math.min(val_len, ref_len);
    for (var i = 0; i < min_len; i++) {
      let cell_val = Number(vals[i]);
      if (!Number.isNaN(cell_val)) {
        cellRefs[i].current?.setValue(cell_val);
      }
    }
  };

  const updateHalfBlockVal = (): void => {
    for (var i = 0; i < cellRefs.length; i++) {
      if (cellRefs[i].current != null && !Number.isNaN(cellRefs[i].current?.getValue())) {
        cellRefs[i].current!.setValue(cellRefs[i].current!.getValue() * 0.5);
      }
    }
  }

  return (
    <div>
      <Modal
        title="Block Editor"
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          updateValueFromBlockEditor();
        }}
        onCancel={() => setModalVisible(false)}
        autoFocus={false}
        focusLock={true}
        style={{ width: "54.5em" }}
      >
        <Space direction="vertical" size={0}>
          <Space direction="horizontal">
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="IN0" defaultValue={0} enable={false} no={0} ref={cellRefs[0]} width="4em" />
                <BlockCell lb="IN1" defaultValue={dim_default} enable={true} no={1} ref={cellRefs[1]} width="4em" />
                <BlockCell lb="IN2" defaultValue={dim_default} enable={true} no={2} ref={cellRefs[2]} width="4em" />
              </Space>
              <Slider
                min={dim_min}
                max={dim_max}
                defaultValue={dim_default}
                onChange={(val) => {
                  cellRefs[1].current?.setValue(Number(val));
                  cellRefs[2].current?.setValue(Number(val));
                }}
              ></Slider>
            </Space>

            <div style={{ width: "26em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="OUT9" defaultValue={dim_default} enable={true} no={22} ref={cellRefs[22]} width="4em" />
                <BlockCell lb="OUT10" defaultValue={dim_default} enable={true} no={23} ref={cellRefs[23]} width="4em" />
                <BlockCell lb="OUT11" defaultValue={dim_default} enable={true} no={24} ref={cellRefs[24]} width="4em" />
              </Space>
              <Slider
                min={dim_min}
                max={dim_max}
                defaultValue={dim_default}
                onChange={(val) => {
                  cellRefs[22].current?.setValue(Number(val));
                  cellRefs[23].current?.setValue(Number(val));
                  cellRefs[24].current?.setValue(Number(val));
                }}
              ></Slider>
            </Space>
          </Space>
          <Space direction="horizontal">
            <div style={{ width: "7.7em" }}></div>
            <BlockCell lb="IN3" defaultValue={0} enable={false} no={3} ref={cellRefs[3]} width="4em" />
          </Space>
          <Space direction="horizontal">
            <div style={{ width: "7.7em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="IN4" defaultValue={dim_default} enable={true} no={4} ref={cellRefs[4]} width="4em" />
                <BlockCell lb="IN5" defaultValue={dim_default} enable={true} no={5} ref={cellRefs[5]} width="4em" />
              </Space>
              <Slider
                min={dim_min}
                max={dim_max}
                defaultValue={dim_default}
                onChange={(val) => {
                  cellRefs[4].current?.setValue(Number(val));
                  cellRefs[5].current?.setValue(Number(val));
                }}
              ></Slider>
            </Space>

            <div style={{ width: "17.7em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="OUT6" defaultValue={dim_default} enable={true} no={19} ref={cellRefs[19]} width="4em" />
                <BlockCell lb="OUT7" defaultValue={dim_default} enable={true} no={20} ref={cellRefs[20]} width="4em" />
                <BlockCell lb="OUT8" defaultValue={dim_default} enable={true} no={21} ref={cellRefs[21]} width="4em" />
              </Space>
              <Slider
                min={dim_min}
                max={dim_max}
                defaultValue={dim_default}
                onChange={(val) => {
                  cellRefs[19].current?.setValue(Number(val));
                  cellRefs[20].current?.setValue(Number(val));
                  cellRefs[21].current?.setValue(Number(val));
                }}
              ></Slider>
            </Space>
          </Space>
          <Space direction="horizontal">
            <div style={{ width: "11.85em" }}></div>
            <BlockCell lb="IN6" defaultValue={0} enable={false} no={6} ref={cellRefs[6]} width="4em" />
          </Space>
          <Space direction="horizontal">
            <div style={{ width: "11.85em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="IN7" defaultValue={dim_default} enable={true} no={7} ref={cellRefs[7]} width="4em" />
                <BlockCell lb="IN8" defaultValue={dim_default} enable={true} no={8} ref={cellRefs[8]} width="4em" />
              </Space>
              <Slider
                min={dim_min}
                max={dim_max}
                defaultValue={dim_default}
                onChange={(val) => {
                  cellRefs[7].current?.setValue(Number(val));
                  cellRefs[8].current?.setValue(Number(val));
                }}
              ></Slider>
            </Space>

            <div style={{ width: "9.4em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="OUT3" defaultValue={dim_default} enable={true} no={16} ref={cellRefs[16]} width="4em" />
                <BlockCell lb="OUT4" defaultValue={dim_default} enable={true} no={17} ref={cellRefs[17]} width="4em" />
                <BlockCell lb="OUT5" defaultValue={dim_default} enable={true} no={18} ref={cellRefs[18]} width="4em" />
              </Space>
              <Slider
                min={dim_min}
                max={dim_max}
                defaultValue={dim_default}
                onChange={(val) => {
                  cellRefs[16].current?.setValue(Number(val));
                  cellRefs[17].current?.setValue(Number(val));
                  cellRefs[18].current?.setValue(Number(val));
                }}
              ></Slider>
            </Space>
          </Space>
          <Space direction="horizontal">
            <div style={{ width: "16em" }}></div>
            <BlockCell lb="IN9" defaultValue={0} enable={false} no={9} ref={cellRefs[9]} width="4em" />
          </Space>
          <Space direction="horizontal">
            <div style={{ width: "16em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="IN10" defaultValue={0} enable={false} no={10} ref={cellRefs[10]} width="4em" />
                <BlockCell lb="IN11" defaultValue={0} enable={false} no={11} ref={cellRefs[11]} width="4em" />
              </Space>
            </Space>

            <div style={{ width: "1em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="OUT0" defaultValue={0} enable={false} no={13} ref={cellRefs[13]} width="4em" />
                <BlockCell lb="OUT1" defaultValue={0} enable={false} no={14} ref={cellRefs[14]} width="4em" />
                <BlockCell lb="OUT2" defaultValue={0} enable={false} no={15} ref={cellRefs[15]} width="4em" />
              </Space>
            </Space>
          </Space>
          <Space direction="horizontal">
            <div style={{ width: "20.2em" }}></div>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal" size={2}>
                <BlockCell lb="MID" defaultValue={dim_default} enable={true} no={12} ref={cellRefs[12]} width="10.1em" />
              </Space>
              <Slider
                min={dim_min}
                max={dim_max}
                defaultValue={dim_default}
                onChange={(val) => {
                  cellRefs[12].current?.setValue(Number(val));
                }}
              ></Slider>
            </Space>
          </Space>
        </Space>
        <Space>
          <Button type="primary" onClick={() => { updateHalfBlockVal() }}>0.5</Button>
        </Space>
      </Modal>
      <Space style={{ margin: "2px" }}>
        {isOptional && <Switch size="small" type="round" checked={enable} onChange={setEnable}></Switch>}
        <Typography style={ComponentUtils.getTypStyle(isOptional)}>{title}</Typography>
        <Input size="mini" ref={inputRef} type="text" style={{ width: ComponentUtils.valueWidth }} disabled={!enable} value={value} defaultValue={defaultValue} onChange={(v) => setValue(v)}></Input>
        <Button
          size="mini"
          disabled={!enable}
          onClick={() => {
            updateBlockEditorValue();
            setModalVisible(true);
          }}
        >
          Editor
        </Button>
      </Space>
    </div>
  );
});

export { BlockEditor };
