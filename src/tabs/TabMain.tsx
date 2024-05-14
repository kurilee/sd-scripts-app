import { Collapse, Space, Button, Input, Grid } from "@arco-design/web-react";
import { CmpBaseRef } from "../compornts/ArgumentEditor/ArgComponets";
import { CmpFolder, CmpCombox, createComponent } from "../compornts/ArgumentEditor/Components";
import { useEffect, useRef, useState } from "react";
import { clipboard } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";
import { configs } from "../configs";

//
const script_name = ["train_network.py", "sdxl_train_network.py"];

const TabMain = (props: any) => {
  const [result, setResult] = useState("");
  const sdHomeRef = useRef<CmpBaseRef>(null);
  const sdScriptRef = useRef<CmpBaseRef>(null);
  const refMap: Map<string, React.RefObject<CmpBaseRef>> = new Map();
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
          cmd += ref.current.getArgumentString().trimEnd() + " ";
        }
      }
    });
    setResult(cmd);
    clipboard.writeText(cmd);
  };

  // 执行脚本
  const run = async () => {
    var args = `/c start cmd /k ${result.trimEnd()} & exit`;
    var cmd = new Command("start cmd", args);
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

  // 套用XL模板
  const applyXLTemplate = () => {
    sdScriptRef.current?.setValue(script_name[1]);
    refMap.get("cache_latents")?.current?.setEnable(true);
    refMap.get("cache_latents_to_disk")?.current?.setEnable(true);
    refMap.get("cache_text_encoder_outputs")?.current?.setEnable(true);
    refMap.get("cache_text_encoder_outputs_to_disk")?.current?.setEnable(true);
    refMap.get("persistent_data_loader_workers")?.current?.setEnable(false);
    refMap.get("clip_skip")?.current?.setValue(1);
    refMap.get("max_data_loader_n_workers")?.current?.setEnable(true);
    refMap.get("max_data_loader_n_workers")?.current?.setValue(1);
    refMap.get("gradient_checkpointing")?.current?.setEnable(true);
    refMap.get("resolution")?.current?.setValue("1024,1024");
  };

  return (
    <Grid.Row style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <Grid.Col span={14}>
        <Collapse className="comp_list" bordered={true} lazyload={false} style={{ width: "100%", overflow: "hidden" }} defaultActiveKey={["0"]}>
          <Collapse.Item name="0" header="基本数据" disabled>
            <CmpFolder ref={sdHomeRef} id="sd_scripts_path" title="Sd Scripts Path" defaultValue="D:\Projects\sd-scripts" isOptional={false} enable={true} defaultPath={"\\"}></CmpFolder>
            <CmpCombox ref={sdScriptRef} id="sd_script_name" title="Script" defaultValue={script_name[0]} options={script_name} isOptional={false} enable={true}></CmpCombox>
          </Collapse.Item>
          {createByConfig(configs)}
        </Collapse>
      </Grid.Col>
      <Grid.Col span={10}>
        <Space direction="vertical" style={{ padding: "15px", marginTop: "-9px" }}>
          <Space direction="horizontal">
            <Button
              style={{ width: 100 }}
              onClick={() => {
                applyXLTemplate();
              }}
            >
              XL
            </Button>
            <Button
              style={{ width: 100 }}
              onClick={() => {
                previewCommand();
              }}
            >
              Preview
            </Button>
            <Button
              style={{ width: 100 }}
              type="primary"
              onClick={() => {
                run();
              }}
            >
              Run
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
  );
};

export { TabMain };
