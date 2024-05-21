import { Collapse, Space, Button, Input, Grid, Modal, Form, Message, Typography } from "@arco-design/web-react";
import { IconSave, IconPlayArrow, IconCode } from "@arco-design/web-react/icon";
import { CmpBaseRef } from "../compornts/ArgumentEditor/ArgComponets";
import { CmpCombox, createComponent } from "../compornts/ArgumentEditor/Components";
import { useContext, useEffect, useRef, useState } from "react";
import { clipboard } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";
import { configs } from "../configs";
import { AppContext, AppContextType, exportJson } from "../AppContext";
import { lang } from "../i18n";
import { CmdContext, CmdContextObj } from "../utils/CmdContext";

//
const script_name = ["train_network.py", "sdxl_train_network.py"];

const TabTrain = (props: any) => {
  const [result, setResult] = useState("");
  const sdScriptRef = useRef<CmpBaseRef>(null);
  const appContext = useContext<AppContextType>(AppContext);
  const cmdContext = useContext<CmdContextObj>(CmdContext);
  const [saveTemplateModalVisible, setSaveTemplateModalVisible] = useState(false);
  const [saveTemplateName, setSaveTemplateName] = useState("");
  const [saveTemplateDesc, setsaveTemplateDesc] = useState("");
  useEffect(() => {}, []);

  // 创建控件引用
  const createRef = (id: string): React.RefObject<CmpBaseRef> => {
    const ref = useRef<CmpBaseRef>(null);
    appContext.refMap.set(id, ref);
    return ref;
  };

  // 预览命令
  const previewCommand = (): void => {
    var cmd = `${appContext.sdHomePath}\\venv\\Scripts\\python.exe -m accelerate.commands.launch --num_cpu_threads_per_process=8 ${appContext.sdHomePath}\\${sdScriptRef.current?.getEditorString()} `;
    appContext.refMap.forEach((ref) => {
      if (ref.current != null) {
        var arg_str = ref.current.getArgumentString();
        if (arg_str.length > 0) {
          cmd += ref.current.getArgumentString().trimEnd() + " ";
        }
      }
    });
    setResult(cmd);
    clipboard.writeText(cmd);
  };

  // 执行脚本
  const run = async () => {
    var file_name = appContext.refMap.get("output_name")?.current?.getEditorString().trim();
    var file_folder = appContext.refMap.get("output_dir")?.current?.getEditorString().trim();
    var file_ext = appContext.refMap.get("save_model_as")?.current?.getEditorString().trim();
    var full_file_path = `${file_folder}\\${file_name}.${file_ext}`;
    var copyHistory = [...appContext.history];
    copyHistory.push({ title: file_name, date: new Date(), content: result, json: exportJson(appContext.refMap), path: full_file_path, folder: file_folder });
    appContext.setHistory(copyHistory);

    var json_result = JSON.stringify(copyHistory);
    localStorage.setItem("sd-script-app_history", json_result);

    var args = `/c start /c ${result.trimEnd()}`;
    console.log(args);
    var cmd = new Command("start cmd", args);
    cmd.stdout.on('data', (line) => {
      cmdContext.addOutput(line);
    });
    var output = await cmd.execute();
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
    var name = saveTemplateName;
    if (name === null || name === undefined || name === "") {
      Message.error(lang("err.template_name_not_null"));
      return;
    }
    var desc = saveTemplateDesc
    var template = { title: name, desc, json: exportJson(appContext.refMap) };
    var idx = appContext.templates.findIndex((item) => item.title === name);
    var copyTemplates: any[] = [];
    if (idx !== -1) {
      var arr_part_1 = appContext.templates.slice(0, idx);
      var arr_part_2 = appContext.templates.splice(idx + 1, appContext.templates.length);
      copyTemplates = [...arr_part_1, template, ...arr_part_2];
      appContext.setTemplates(copyTemplates);
    } else {
      copyTemplates = [...appContext.templates, template];
      appContext.setTemplates(copyTemplates);
    }

    localStorage.setItem("sd-script-app_templates", JSON.stringify(copyTemplates));
    setSaveTemplateName("");
    setsaveTemplateDesc("");
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
        okText={lang("app.btn.ok")}
        cancelText={lang("app.btn.cancel")}
        onOk={() => {
          saveToTemplate();
        }}
        onCancel={() => {
          setSaveTemplateName("");
          setsaveTemplateDesc("");
          setSaveTemplateModalVisible(false);
        }}
      >
        <Form
          labelCol={{
            style: { flexBasis: 0 },
          }}
          wrapperCol={{
            style: { flexBasis: "calc(100% - 0px)" },
          }}
        >
          <Form.Item>
            <Typography.Text type="secondary" >{lang("modal.form.template_name")}</Typography.Text>
            <Input value={saveTemplateName} onChange={(val) => { setSaveTemplateName(val) }}></Input>
          </Form.Item>
          <Form.Item>
            <Typography.Text type="secondary" >{lang("modal.form.template_desc")}</Typography.Text>
            <Input.TextArea value={saveTemplateDesc} autoSize={{ minRows: 3, maxRows: 3}} onChange={(val) => { setsaveTemplateDesc(val) }}></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
      <Grid.Row style={{ paddingLeft: "5px", paddingRight: "5px" }}>
        <Grid.Col span={14}>
          <Collapse className="comp_list" bordered={true} lazyload={false} style={{ width: "100%", overflow: "hidden" }} defaultActiveKey={["0"]}>
            <Collapse.Item name="0" header={lang("tab.train.script_group")} disabled>
              <CmpCombox ref={sdScriptRef} id="sd_script_name" title={lang("tab.train.script_group.script")} defaultValue={script_name[0]} options={script_name} isOptional={false} enable={true}></CmpCombox>
            </Collapse.Item>
            {createByConfig(configs)}
          </Collapse>
        </Grid.Col>
        <Grid.Col span={10}>
          <Space direction="vertical" style={{ padding: "15px", marginTop: "-9px" }}>
            <Space direction="horizontal">
              <Button
                onClick={() => {
                  previewCommand();
                }}
                icon={<IconCode />}
              >
                {lang("app.btn.preview_cmd")}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  run();
                }}
                icon={<IconPlayArrow />}
                status="success"
              >
                {lang("app.btn.run_cmd")}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  openSaveTemplateModal();
                }}
                icon={<IconSave />}
              >
                {lang("app.btn.save_template")}
              </Button>
            </Space>
            <Space style={{ width: "100%" }}>
              <Input.TextArea
                value={result}
                style={{ width: 500 }}
                autoSize
                onChange={(v, e) => {
                  setResult(v);
                }}
              ></Input.TextArea>
            </Space>
          </Space>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};

export { TabTrain };
