import { Collapse, Space, Button, Input, Grid } from '@arco-design/web-react';
import { CmpBaseRef } from './compornts/ArgComponets';
import { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum, BlockEditor } from './compornts/Components';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { clipboard } from '@tauri-apps/api';
import { Command } from '@tauri-apps/api/shell';
import { configs } from './configs';

//
const script_name = ['train_network.py', 'train_network_xl.py'];

function App() {
  const [result, setResult] = useState('');
  const sdHomeRef = useRef<CmpBaseRef>(null);
  const sdScriptRef = useRef<CmpBaseRef>(null);
  const refMap: Map<string, React.RefObject<CmpBaseRef>> = new Map();
  useEffect(() => {}, []);

  // 创建控件引用
  const getRef = (id: string): React.RefObject<CmpBaseRef> => {
    const ref = useRef<CmpBaseRef>(null);
    refMap.set(id, ref);
    return ref;
  };

  // 预览命令
  const previewCommand = (): void => {
    var cmd = `${sdHomeRef.current?.getEditorString()}\\venv\\Scripts\\python.exe -m accelerate.commands.launch --num_cpu_threads_per_process=8 ${sdHomeRef.current?.getEditorString()}\\${sdScriptRef.current?.getEditorString()} `;
    refMap.forEach((ref) => {
      if (ref.current != null) {
        var arg_str = ref.current.getArgumentString();
        if (arg_str.length > 0) {
          cmd += ref.current.getArgumentString().trimEnd() + ' ';
        }
      }
    });
    setResult(cmd);
    clipboard.writeText(cmd);
  };

  // 执行脚本
  const run = async () => {
    var cmd = new Command('start cmd', `/c start cmd /k ${result.trimEnd()}`);
    var output = await cmd.execute();
  };

  // 创建组件
  const createComponent = (config: any) => {
    if (config.visible === false) return <></>;
    switch (config.type) {
      case 'combox':
        return <CmpCombox key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} options={config.options}></CmpCombox>;
      case 'file':
        return <CmpFile key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} defaultPath={config.defaultPath} filters={config.filters}></CmpFile>;
      case 'folder':
        return <CmpFolder key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} defaultPath={config.defaultPath}></CmpFolder>;
      case 'text':
        return <CmpText key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable}></CmpText>;
      case 'switch':
        return <CmpSwitch key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable}></CmpSwitch>;
      case 'num':
        return <CmpNum key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} min={config.min} max={config.max} precision={config.precision} step={config.step}></CmpNum>;
      case 'block_editor':
        return <BlockEditor key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} isExtraArg={true}></BlockEditor>;
    }
  };

  // 创建组
  const createGroup = (group: any) => {
    return (
      <Collapse.Item key={group.id} name={group.id} header={group.title} disabled={group.disabled}>
        {group.args.map((arg: any) => createComponent(arg))}
      </Collapse.Item>
    );
  };

  // 根据配置创建
  const createByConfig = (config: any) => {
    return <>{config.groups.map((group: any) => createGroup(group))}</>;
  };

  // 套用XL模板
  const applyXLTemplate = () => {
    sdScriptRef.current?.setValue(script_name[1]);
    refMap.get('cache_latents')?.current?.setEnable(true);
    refMap.get('cache_latents_to_disk')?.current?.setEnable(true);
    refMap.get('cache_text_encoder_outputs')?.current?.setEnable(true);
    refMap.get('cache_text_encoder_outputs_to_disk')?.current?.setEnable(true);
    refMap.get('persistent_data_loader_workers')?.current?.setEnable(false);
    refMap.get('clip_skip')?.current?.setValue(1);
    refMap.get('max_data_loader_n_workers')?.current?.setEnable(true);
    refMap.get('max_data_loader_n_workers')?.current?.setValue(1);
    refMap.get('gradient_checkpointing')?.current?.setEnable(true);
  }

  return (
    <div style={{ padding: '5px' }}>
      <Grid.Row>
        <Grid.Col span={14}>
          <Collapse className="comp_list" bordered={true} lazyload={false} style={{ width: '100%', overflow: 'hidden' }} defaultActiveKey={['0']}>
            <Collapse.Item name="0" header="基本数据" disabled>
              <CmpFolder ref={sdHomeRef} id="sd_scripts_path" title="Sd Scripts Path" defaultValue="D:\Projects\sd-scripts" isOptional={false} enable={true} defaultPath={'\\'}></CmpFolder>
              <CmpCombox ref={sdScriptRef} id="sd_script_name" title="Script" defaultValue={script_name[0]} options={script_name} isOptional={false} enable={true}></CmpCombox>
            </Collapse.Item>
            {createByConfig(configs)}
          </Collapse>
        </Grid.Col>
        <Grid.Col span={10}>
          <Space direction="vertical" style={{ padding: '15px', marginTop: '-9px' }}>
            <Space direction="horizontal">
              <Button
                style={{ width: 100 }}
                onClick={() => {
                  applyXLTemplate();
                }}>
                XL
              </Button>
              <Button
                style={{ width: 100 }}
                onClick={() => {
                  previewCommand();
                }}>
                Preview
              </Button>
              <Button
                style={{ width: 100 }}
                type="primary"
                onClick={() => {
                  run();
                }}>
                Run
              </Button>
            </Space>
            <Space style={{ width: '100%' }}>
              <Input.TextArea
                value={result}
                style={{ width: 500 }}
                autoSize
                onChange={(v, e) => {
                  setResult(v);
                }}></Input.TextArea>
            </Space>
          </Space>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}

export default App;
