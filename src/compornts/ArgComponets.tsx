import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Checkbox, Input, Typography, Space } from '@arco-design/web-react'

export interface CmpProps<T> {
    title: string,
    value: T,
    enable: boolean,
    isOptional: boolean,
    defaultValue: T
}

const CmpPath: React.FC<CmpProps<string>> = (props: CmpProps<string>) => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [enable, setEnable] = useState(true);
    const [isOptional, setIsOptional] = useState(false);
    // const [defaultValue, setDefaultValue] = useState("");

    function showOptional() {
        if (isOptional) {
            return (<Checkbox value={true} disabled={!enable}></Checkbox>);
        }
    }

    function onValueChanged(value: string, e: any) {

    }

    useEffect(() => { 
        setTitle(props.title);
        setValue(props.defaultValue);
        setEnable(props.enable);
        setIsOptional(props.isOptional);
    }, [])
    return (<div>
        <Space style={{margin: '2px'}}>
        {showOptional()}
        <Typography style={isOptional ? { width: '73px' } : { width: '100px'}}>{title}</Typography>
        <Input type='text' style={{ width: '300px' }} disabled={!enable} value={value} onChange={ (value: string, e: any) => { onValueChanged(value, e) } }></Input>
        <Button disabled={!enable}>Open</Button>
        </Space>
    </div>)
};

export { CmpPath };