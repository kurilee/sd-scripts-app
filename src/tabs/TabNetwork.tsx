import { Collapse, Space, Button, Input, Grid, Modal, Form } from '@arco-design/web-react';
import { CmpBaseRef } from '../compornts/ArgumentEditor/ArgComponets';
import { CmpFolder, CmpCombox, createComponent } from '../compornts/ArgumentEditor/Components';
import { useContext, useEffect, useRef, useState } from 'react';
import { clipboard } from '@tauri-apps/api';
import { Command } from '@tauri-apps/api/shell';
import { configs } from '../configs';
import { AppContext, AppContextType } from '../AppContext';
import { RefInputType } from '@arco-design/web-react/es/Input';

//
const script_name = ['train_network.py', 'sdxl_train_network.py'];

const TabNetwork = (props: any) => {
  const [result, setResult] = useState('');
  const sdHomeRef = useRef<CmpBaseRef>(null);
  const sdScriptRef = useRef<CmpBaseRef>(null);
  const refMap: Map<string, React.RefObject<CmpBaseRef>> = new Map();
  const appContext = useContext<AppContextType>(AppContext);
  const [saveTemplateModalVisible, setSaveTemplateModalVisible] = useState(false);
  const saveTemplateNameRef = useRef<RefInputType>(null);
  const saveTemplateDescRef = useRef<RefInputType>(null);
  useEffect(() => {}, []);

  // 创建控件引用
  const createRef = (id: string): React.RefObject<CmpBaseRef> => {
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

  const exportJson = (): string => {
    var result: any = {};
    refMap.forEach((ref, key) => {
      result[key] = { enable: ref.current?.getEnable(), value: ref.current?.getEditorString().trim() };
    });
    return JSON.stringify(result);
  };

  const importJson = (json: string) => {
    var result: any = JSON.parse(json);
    refMap.forEach((ref, key) => {
      var enable = result[key]['enable'];
      var value = result[key]['value'];
      ref.current?.setEnable(enable);
      ref.current?.setValue(value);
    });
  };

  // 执行脚本
  const run = async () => {
    var file_name = refMap.get('output_name')?.current?.getEditorString().trim();
    var file_folder = refMap.get('')?.current?.getEditorString().trim();
    var full_file_path = `${file_folder}\\${file_name}`;
    var copyHistory = [...appContext.history];
    copyHistory.push({ title: file_name, date: new Date(), content: result, json: exportJson(), path: full_file_path });
    appContext.setHistory(copyHistory);

    var json_result = JSON.stringify(copyHistory);
    localStorage.setItem('sd-script-app_history', json_result);

    var args = `/c start cmd /k ${result.trimEnd()} & exit`;
    var cmd = new Command('start cmd', args);
    var output = await cmd.spawn();
  };

  // 创建组
  const createGroup = (group: any) => {
    return (
      <Collapse.Item key={group.id} name={group.id} header={group.title} disabled={group.disabled}>
        {group.args.map((arg: any) => createComponent(arg, createRef))}
      </Collapse.Item>
    );
  };

  // 根据配置创建
  const createByConfig = (config: any) => {
    return <>{config.groups.map((group: any) => createGroup(group))}</>;
  };

  // 保存模板
  const saveToTemplate = () => {
    var name = saveTemplateNameRef.current?.dom.value;
    var desc = saveTemplateDescRef.current?.dom.value;
    var template = { title: name, desc, json: exportJson() };
    var copyTemplates = [...appContext.templates];
    copyTemplates.push(template);
    appContext.setTemplates(copyTemplates);
  };

  // 打开保存面板
  const openSaveTemplateModal = () => {
    setSaveTemplateModalVisible(true);
  };

  return (
    <div>
      <Modal
        title="Save Template"
        visible={saveTemplateModalVisible}
        onOk={() => {
          saveToTemplate();
          setSaveTemplateModalVisible(false);
        }}
        onCancel={() => {
          setSaveTemplateModalVisible(false);
        }}>
        <Form
          labelCol={{
            style: { flexBasis: 80 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 80px)' },
          }}>
          <Form.Item label="模板名称">
            <Input ref={saveTemplateNameRef}></Input>
          </Form.Item>
          <Form.Item label="模板描述">
            <Input ref={saveTemplateDescRef}></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Grid.Row style={{ paddingLeft: '5px', paddingRight: '5px' }}>
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
              <Button
                style={{ width: 100 }}
                type="primary"
                onClick={() => {
                  openSaveTemplateModal();
                }}>
                Save
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
};

export { TabNetwork as TabMain };
