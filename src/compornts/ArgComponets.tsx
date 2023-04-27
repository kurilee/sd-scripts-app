import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Switch, Input, Typography, Space, Select, InputNumber } from '@arco-design/web-react'
import { open } from '@tauri-apps/api/dialog'

const titleWidth = "124px";
const fullTitleWidth = "172px";
const valueWidth = "500px";
const componentSize = 'small';

export interface CmpBase<T> {
    title: string,
    value: T,
    enable: boolean,
    isOptional: boolean,
    defaultValue: T,
}
export interface CmpFileProps extends CmpBase<string> {
    filters: Array<{ name: string, extensions: Array<string> }>
}
export interface CmpFolderProps extends CmpBase<string> {
    defaultPath: string
}
export interface CmpTextProps extends CmpBase<string> {
}
export interface CmpSwitchProps extends CmpBase<boolean> {    
}
export interface CmpComboxProps extends CmpBase<string> {
    options: Array<string>
}
export interface CmpNumProps extends CmpBase<number> {
    min: number,
    max: number,
    step: number,
    precision: number    
}

const CmpFile: React.FC<CmpFileProps> = (props: CmpFileProps) => {
    const [title, setTitle] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [enable, setEnable] = useState<boolean>(true);
    const [isOptional, setIsOptional] = useState<boolean>(false);
    useEffect(() => { 
        setTitle(props.title);
        setValue(props.defaultValue);
        setEnable(props.enable);
        setIsOptional(props.isOptional);
    }, [])

    function showOptional() {
        if (isOptional) {
            return (<Switch size={componentSize} type="round" checked={enable} onClick={()=> {
                setEnable(!enable);
            }}></Switch>);
        }
    }

    function onValueChanged(value: string, e: any) {

    }

    async function onOpenClicked() {
        const select = await open({
            filters: props.filters
        })

        if (typeof(select) == 'string') setValue(select);
    }

    return (<div>
        <Space style={{margin: '2px'}}>
        {showOptional()}
        <Typography style={isOptional ? { width: titleWidth } : { width: fullTitleWidth }}>{title}</Typography>
        <Input size='mini' type='text' style={{ width: valueWidth }} disabled={!enable} value={value} onChange={ (value: string, e: any) => { onValueChanged(value, e) } }></Input>
        <Button size='mini' disabled={!enable} onClick={ async (e) => { await onOpenClicked() }}>Open</Button>
        </Space>
    </div>)
};

const CmpFolder: React.FC<CmpFolderProps> = (props: CmpFolderProps) => {
    const [title, setTitle] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [enable, setEnable] = useState<boolean>(true);
    const [isOptional, setIsOptional] = useState<boolean>(false);
    useEffect(() => { 
        setTitle(props.title);
        setValue(props.defaultValue);
        setEnable(props.enable);
        setIsOptional(props.isOptional);
    }, [])

    function showOptional() {
        if (isOptional) {
            return (<Switch type="round" checked={enable} onClick={()=> {
                setEnable(!enable);
            }}></Switch>);
        }
    }

    function onValueChanged(value: string, e: any) {

    }

    async function onOpenClicked() {
        const select = await open({
            directory: true,
            defaultPath: props.defaultPath
        })

        if (typeof(select) == 'string') setValue(select);
    }

    return (<div>
        <Space style={{margin: '2px'}}>
        {showOptional()}
        <Typography style={isOptional ? { width: titleWidth } : { width: fullTitleWidth }}>{title}</Typography>
        <Input type='text' style={{ width: valueWidth }} disabled={!enable} value={value} onChange={ (value: string, e: any) => { onValueChanged(value, e) } }></Input>
        <Button disabled={!enable} onClick={ async (e) => { await onOpenClicked() }}>Open</Button>
        </Space>
    </div>)
}

const CmpText: React.FC<CmpTextProps> = (props: CmpTextProps) => {
    const [title, setTitle] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [enable, setEnable] = useState<boolean>(true);
    const [isOptional, setIsOptional] = useState<boolean>(false);
    useEffect(() => { 
        setTitle(props.title);
        setValue(props.defaultValue);
        setEnable(props.enable);
        setIsOptional(props.isOptional);
    }, [])

    function showOptional() {
        if (isOptional) {
            return (<Switch type="round" checked={enable} onClick={()=> {
                setEnable(!enable);
            }}></Switch>);
        }
    }

    function onValueChanged(value: string, e: any) {

    }

    return (<div>
        <Space style={{margin: '2px'}}>
        {showOptional()}
        <Typography style={isOptional ? { width: titleWidth } : { width: fullTitleWidth }}>{title}</Typography>
        <Input type='text' style={{ width: valueWidth }} disabled={!enable} value={value} onChange={ (value: string, e: any) => { onValueChanged(value, e) } }></Input>
        </Space>
    </div>)
}

const CmpSwitch: React.FC<CmpSwitchProps> = (props: CmpSwitchProps) => {
    const [title, setTitle] = useState<string>("");
    const [value, setValue] = useState<boolean>(false);
    const [enable, setEnable] = useState<boolean>(true);
    const [isOptional, setIsOptional] = useState<boolean>(false);
    useEffect(() => { 
        setTitle(props.title);
        setValue(props.defaultValue);
        setEnable(props.enable);
        setIsOptional(props.isOptional);
    }, [])

    function showOptional() {
        if (isOptional) {
            return (<Switch type="round" checked={enable} onClick={()=> {
                setEnable(!enable);
            }}></Switch>);
        }
    }

    return (<div>
        <Space style={{margin: '2px'}}>
        {showOptional()}
        <Typography style={isOptional ? { width: titleWidth } : { width: fullTitleWidth }}>{title}</Typography>
        </Space>
    </div>)
}

const CmpCombox: React.FC<CmpComboxProps> = (props: CmpComboxProps) => {
    const [title, setTitle] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [enable, setEnable] = useState<boolean>(true);
    const [isOptional, setIsOptional] = useState<boolean>(false);
    const [options, setOptions] = useState<Array<string>>([]);

    useEffect(() => { 
        setTitle(props.title);
        setValue(props.defaultValue);
        setEnable(props.enable);
        setIsOptional(props.isOptional);
        setOptions(props.options);
    }, [])

    function showOptional() {
        if (isOptional) {
            return (<Switch type="round" checked={enable} onClick={()=> {
                setEnable(!enable);
            }}></Switch>);
        }
    }

    function onValueChanged(value: string, e: any) {

    }

    return (<div>
        <Space style={{margin: '2px'}}>
        {showOptional()}
        <Typography style={isOptional ? { width: titleWidth } : { width: fullTitleWidth }}>{title}</Typography>
        <Select style={{ width: valueWidth }} disabled={!enable} value={value} onChange={ (value: string, e: any) => { onValueChanged(value, e) } }>
            {
                options.map((opt,idx) => {
                    return (<Select.Option id={idx.toString()} value={opt}></Select.Option>)
                })
            }
        </Select>
        </Space>
    </div>)
}

const CmpNum: React.FC<CmpNumProps> = (props: CmpNumProps) => {
    const [title, setTitle] = useState<string>("");
    const [value, setValue] = useState<number>(0);
    const [enable, setEnable] = useState<boolean>(true);
    const [isOptional, setIsOptional] = useState<boolean>(false);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(10);
    const [step, setStep] = useState<number>(1);
    const [precision, setPrecision] = useState<number>(1);

    useEffect(() => { 
        setTitle(props.title);
        setValue(props.defaultValue);
        setEnable(props.enable);
        setIsOptional(props.isOptional);
        setMin(props.min);
        setMax(props.max);
        setStep(props.step);
        setPrecision(props.precision);
    }, [])

    function showOptional() {
        if (isOptional) {
            return (<Switch type="round" checked={enable} onClick={()=> {
                setEnable(!enable);
            }}></Switch>);
        }
    }

    function onValueChanged(value: string, e: any) {

    }

    return (<div>
        <Space style={{margin: '2px'}}>
        {showOptional()}
        <Typography style={isOptional ? { width: titleWidth } : { width: fullTitleWidth }}>{title}</Typography>
        <InputNumber style={{ width: valueWidth }} mode='button' defaultValue={props.defaultValue} min={min} max={max} step={step} precision={precision} disabled={!enable}></InputNumber>
        </Space>
    </div>)
}

export { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum };