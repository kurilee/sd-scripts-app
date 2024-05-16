import { Collapse, Space, Button, Input, Grid, Modal, Form, Message } from '@arco-design/web-react';
import { CmpBaseRef } from '../compornts/ArgumentEditor/ArgComponets';
import { CmpFolder, CmpCombox, createComponent } from '../compornts/ArgumentEditor/Components';
import { useContext, useEffect, useRef, useState } from 'react';
import { clipboard } from '@tauri-apps/api';
import { Command } from '@tauri-apps/api/shell';
import { configs } from '../configs';
import { AppContext, AppContextType, exportJson } from '../AppContext';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { lang } from '../i18n';

//
const script_name = ['train_network.py', 'sdxl_train_network.py'];

const TabTrain = (props: any) => {
  const [result, setResult] = useState('');
  const sdScriptRef = useRef<CmpBaseRef>(null);
  const appContext = useContext<AppContextType>(AppContext);
  const [saveTemplateModalVisible, setSaveTemplateModalVisible] = useState(false);
  const saveTemplateNameRef = useRef<RefInputType>(null);
  const saveTemplateDescRef = useRef<RefInputType>(null);
  useEffect(() => {}, []);

  // 创建控件引用
  const createRef = (id: string): React.RefObject<CmpBaseRef> => {
    const ref = useRef<CmpBaseRef>(null);
    appContext.refMap.set(id, ref);
    return ref;
  };

  // 预览命令
  const previewCommand = (): void => {
    var cmd = `${appContext.sdHomeRef?.current?.getEditorString()}\\venv\\Scripts\\python.exe -m accelerate.commands.launch --num_cpu_threads_per_process=8 ${appContext.sdHomeRef?.current?.getEditorString()}\\${sdScriptRef.current?.getEditorString()} `;
    appContext.refMap.forEach((ref) => {
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
    var file_name = appContext.refMap.get('output_name')?.current?.getEditorString().trim();
    var file_folder = appContext.refMap.get('output_dir')?.current?.getEditorString().trim();
    var file_ext = appContext.refMap.get('save_model_as')?.current?.getEditorString().trim();
    var full_file_path = `${file_folder}\\${file_name}.${file_ext}`;
    var copyHistory = [...appContext.history];
    copyHistory.push({ title: file_name, date: new Date(), content: result, json: exportJson(appContext.refMap), path: full_file_path });
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
    if (name === null || name === undefined || name === '') {
      Message.error('模板名称不能为空');
      return;
    }
    var desc = saveTemplateDescRef.current?.dom.value;
    var template = { title: name, desc, json: exportJson(appContext.refMap) };
    var idx = appContext.templates.findIndex((item) => item.title === name);
    var copyTemplates: any[] = [];
    if (idx !== -1) {
      var arr_part_1 = appContext.templates.slice(0, idx);
      var arr_part_2 = appContext.templates.splice(idx + 1, appContext.templates.length);
      copyTemplates = [...arr_part_1, template, ...arr_part_2];
      appContext.setTemplates(copyTemplates);
    }
    else {
      copyTemplates = [...appContext.templates, template];
      appContext.setTemplates(copyTemplates);
    }

    localStorage.setItem('sd-script-app_templates', JSON.stringify(copyTemplates));

    setSaveTemplateModalVisible(false);
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
            <Collapse.Item name="0" header={lang('tab.train.script_group')} disabled>
              <CmpCombox ref={sdScriptRef} id="sd_script_name" title={lang('tab.train.script_group.script')} defaultValue={script_name[0]} options={script_name} isOptional={false} enable={true}></CmpCombox>
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

export { TabTrain };
