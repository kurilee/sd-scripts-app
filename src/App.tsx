import { Collapse, Space, Button, Input, Grid } from "@arco-design/web-react";
import { CmpBaseRef } from "./compornts/ArgComponets";
import { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum, BlockEditor } from "./compornts/Components";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { clipboard } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";

// 模型类型
const loraType = ["networks.lora", "networks.dylora", "networks.lora_fa"];
// 优化器选项
const optTypes = ["AdamW", "AdamW8bit", "Lion", "SGDNesterov", "SGDNesterov8bit", "DAdaptation", "AdaFactor", "Prodigy"];
// 学习策略
const lrSchedulers = ["linear", "cosine", "cosine_with_restarts", "polynomial", "constant", "constant_with_warmup", "adafactor"];
// 预览生成采样器
const samplerTypes = ["ddim", "pndm", "lms", "euler", "euler_a", "heun", "dpm_2", "dpm_2_a", "dpmsolver", "dpmsolver++", "dpmsingle", "k_lms", "k_euler", "k_euler_a", "k_dpm_2", "k_dpm_2_a"];
// 格式
const fomats = ["fp16", "bf16"];
//
const logwithOptions = ["tensorboard", "wandb", "all"];
//
const script_name = ["train_network.py", "train_network_xl.py"];

function App() {
  const [result, setResult] = useState("");
  const sdHomeRef = useRef<CmpBaseRef>(null);
  const sdScriptRef = useRef<CmpBaseRef>(null);
  // const refs: Array<React.RefObject<CmpBaseRef>> = [];
  const refMap: Map<string, React.RefObject<CmpBaseRef>> = new Map();
  useEffect(() => {}, []);

  // 创建控件引用
  const getRef = (id:string): React.RefObject<CmpBaseRef> => {
    const ref = useRef<CmpBaseRef>(null);
    refMap.set(id, ref);
    return ref;
  };

  // 预览命令
  const previewCommand = (): void => {
    var cmd = `${sdHomeRef.current?.getString()}\\venv\\Scripts\\python.exe -m accelerate.commands.launch --num_cpu_threads_per_process=8 ${sdHomeRef.current?.getString()}\\${sdScriptRef.current?.getString()} `;
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

  const run = async () => {
    var cmd = new Command("start cmd", `/c start cmd /k ${result.trimEnd()}`);
    var output = await cmd.execute();
  };

  // 生成随机数
  const randInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const createComponent = (config: any) => {
    switch (config.type) {
      case "combox":
        return <CmpCombox key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} options={config.options}></CmpCombox>;
      case "file":
        return <CmpFile key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} defaultPath={config.defaultPath} filters={config.filters}></CmpFile>;
      case "folder":
        return <CmpFolder key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} defaultPath={config.defaultPath}></CmpFolder>;
      case "text":
        return <CmpText key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable}></CmpText>;
      case "switch":
        return <CmpSwitch key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable}></CmpSwitch>;
      case "num":
        return <CmpNum key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} min={config.min} max={config.max} precision={config.precision} step={config.step}></CmpNum>;
      case "block_editor":
        return <BlockEditor key={config.id} ref={getRef(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable}></BlockEditor>;
    }
  };

  const createGroup = (group: any) => {
    return (
      <Collapse.Item key={group.id} name={group.id} header={group.title} disabled={group.disabled}>
        {group.args.map((arg: any) => createComponent(arg))}
      </Collapse.Item>
    );
  };

  const createByConfig = (config: any) => {
    return (
    <>
    { config.groups.map((group: any) => createGroup(group)) }
    </>);
  };

  const configs = {
    groups: [
      {
        id: "1",
        title: "基本数据",
        args: [
          { type: "file", id: "pretrained_model_name_or_path", title: "Model", defaultValue: "", isOptional: false, enable: true, filters: [{ name: "Checkpoint", extensions: ["safetensors", "ckpt", "pt"] }], defaultPath: "D:\\Projects\\stable-diffusion-webui\\models\\Stable-diffusion\\"},
          { type: "file", id: "vae", title: "VAE", defaultValue: "", isOptional: true, enable: false, filters: [{ name: "VAE", extensions: ["safetensors", "ckpt", "pt"] }], defaultPath: "D:\\Projects\\stable-diffusion-webui\\models\\VAE\\" },
          { type: "folder", id: "train_data_dir", title: "Train Data Dir", defaultValue: "", isOptional: false, enable: true, defaultPath: "D:\\LoraTrainData\\trains\\" },
          { type: "folder", id: "reg_data_dir", title: "Reg Data Dir", defaultValue: "", isOptional: true, enable: false, defaultPath: "D:\\LoraTrainData\\trains\\" },
          { type: "folder", id: "output_dir", title: "Output Dir", defaultValue: "", isOptional: false, enable: true, defaultPath: "D:\\LoraTrainData\\output\\" },
          { type: "text", id: "output_name", title: "Output Name", defaultValue: "", isOptional: false, enable: true },
        ],
      },
      {
        id: "2",
        title: "输出&日志",
        args: [
          { type: "text", id: "save_model_as", title: "Save Model As", defaultValue: "safetensors", isOptional: false, enable: true },
          { type: "num", id: "save_every_n_epochs", title: "Save Every N Epochs", defaultValue: 1, isOptional: true, enable: false, min: 1, max: 30, step: 1, precision: 0 },
          { type: "switch", id: "no_metadata", title: "No Metadata", defaultValue: "", isOptional: true, enable: true },
          { type: "combox", id: "log_with", title: "Log With", defaultValue: "wandb", isOptional: true, enable: false, options: logwithOptions },
          { type: "text", id: "wandb_api_key", title: "Wandb API Key", defaultValue: "", isOptional: true, enable: false },
          { type: "folder", id: "logging_dir", title: "Logging Dir", defaultValue: "", isOptional: true, enable: false, defaultPath: "D:\\LoraTrainData\\output\\" },        
        ]
      },
      {
        id: "3",
        title: "训练设置",
        args: [
          { type: "switch", id: "xformers", title: "Xformers", defaultValue: "", isOptional: true, enable: true },
          { type: "switch", id: "enable_bucket", title: "Enable Bucket", defaultValue: "", isOptional: true, enable: true },
          { type: "switch", id: "cache_latents", title: "Cache Latents", defaultValue: "", isOptional: true, enable: false },
          { type: "", id: "cache_latents_to_disk", title: "Cache Latents To Disk", defaultValue: "", isOptional: true, enable: false },
          { type: "", id: "cache_text_encoder_outputs", title: "Cache Text Encoder Outputs", defaultValue: "", isOptional: true, enable: false },
          { type: "", id: "cache_text_encoder_outputs_to_disk", title: "Cache Text Encoder Outputs To Disk", defaultValue: "", isOptional: true, enable: false },
          { type: "", id: "persistent_data_loader_workers", title: "Persistent Data Loader Workers", defaultValue: "", isOptional: true, enable: true },
          { type: "", id: "network_train_text_encoder_only", title: "Train Text Encoder Only", defaultValue: "", isOptional: true, enable: false },
          { type: "", id: "network_train_unet_only", title: "Train UNet Only", defaultValue: "", isOptional: true, enable: true },
          { type: "", id: "no_half_vae", title: "No Half VAE", defaultValue: "", isOptional: false, enable: false },
          // { type: "", id: "", title: "", defaultValue: "", isOptional: false, enable: false },
          // { type: "", id: "", title: "", defaultValue: "", isOptional: false, enable: false },
          // { type: "", id: "", title: "", defaultValue: "", isOptional: false, enable: false },
          // { type: "", id: "", title: "", defaultValue: "", isOptional: false, enable: false },
          // { type: "", id: "", title: "", defaultValue: "", isOptional: false, enable: false },
          // { type: "", id: "", title: "", defaultValue: "", isOptional: false, enable: false },
        ]
      }
    ],
  };

  return (
    <div style={{ padding: "5px" }}>
      <Grid.Row>
        <Grid.Col span={14}>
          <Collapse className="comp_list" bordered={true} lazyload={false} style={{ width: "100%", overflow: "hidden" }} defaultActiveKey={["0"]}>
            <Collapse.Item name="0" header="基本数据" disabled>
              <CmpFolder ref={sdHomeRef} id="sd_script_path" title="Sd Script Path" defaultValue="D:\Projects\sd-scripts" isOptional={false} enable={true}  defaultPath={"\\"}></CmpFolder>
              <CmpCombox ref={sdScriptRef} id="sd_script_name" title="Script" defaultValue={script_name[0]} options={script_name} isOptional={false} enable={true}></CmpCombox>
            </Collapse.Item>
            { createByConfig(configs) }

            <Collapse.Item name="2" header="">
              <CmpSwitch ref={getRef()} id="" title="" isOptional={} enable={false}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="" title="" isOptional={true} enable={false}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="" title="" enable={false} isOptional={true}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="" title="" enable={false} isOptional={true}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="" title="" defaultValue={true} isOptional={true}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="" title="" enable={false} isOptional={true}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="" title="" enable={true} isOptional={true}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="" title="" enable={true} isOptional={true}></CmpSwitch>
              <CmpText ref={getRef()} id="" title="" defaultValue="" enable={false}></CmpText>
              <CmpCombox ref={getRef()} id="mixed_precision" title="Mixed Precision" defaultValue="bf16" enable={true} options={fomats}></CmpCombox>
              <CmpCombox ref={getRef()} id="save_precision" title="Save Precision" defaultValue="bf16" enable={true} options={fomats}></CmpCombox>
              <CmpText ref={getRef()} id="seed" title="seed" defaultValue={randInt(1, 10000).toString()} isOptional={true}></CmpText>
              <CmpNum ref={getRef()} id="clip_skip" title="Clip Skip" defaultValue={2} min={0} max={10} step={1} precision={0}></CmpNum>
              <CmpSwitch ref={getRef()} id="full_bf16" title="Full bf16" enable={true} isOptional={true}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="full_fp16" title="Full fp16" enable={false} isOptional={true}></CmpSwitch>
              <CmpSwitch ref={getRef()} id="fp8_base" title="FP8 Base" enable={false} isOptional={true}></CmpSwitch>
              <CmpText ref={getRef()} id="max_data_loader_n_workers" title="Max Data Loader" defaultValue="0" enable={false} isOptional={true}></CmpText>
              <CmpSwitch ref={getRef()} id="gradient_checkpointing" title="Gradient Checkpointing" enable={false} isOptional={true}></CmpSwitch>
            </Collapse.Item>

            <Collapse.Item name="3" header="结构参数">
              <CmpText ref={getRef()} id="resolution" title="Resolution" defaultValue="512,512"></CmpText>
              <CmpCombox ref={getRef()} id="network_module" title="Network Module" defaultValue={loraType[0]} options={loraType}></CmpCombox>
              <CmpNum ref={getRef()} id="network_dim" title="Network Dim" defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
              <CmpNum ref={getRef()} id="network_alpha" title="Network Alpha" defaultValue={16} min={0} max={128} step={1} precision={0}></CmpNum>
              <CmpSwitch ref={getRef()} id="dim_from_weights" title="Dim From Weights" enable={false} isOptional={true}></CmpSwitch>
              <CmpFile ref={getRef()} id="network_weights" title="Network Weights" defaultPath={"D:\\LoraTrainData\\output\\"} isOptional={true} enable={false} filters={[{ name: "Checkpoint", extensions: ["safetensors", "ckpt", "pt"] }]}></CmpFile>
              <CmpNum ref={getRef()} id="network_dropout" title="NetworkDropout" defaultValue={0.1} min={0.1} max={0.5} step={0.01} precision={2} isOptional={true} enable={false}></CmpNum>
              <CmpNum ref={getRef()} id="scale_weight_norms" title="Scale Weigth Norms" defaultValue={1.0} min={0.01} max={2.0} step={0.01} precision={2} isOptional={true} enable={false}></CmpNum>
            </Collapse.Item>

            <Collapse.Item name="4" header="学习参数">
              <CmpCombox ref={getRef()} id="optimizer_type" title="Optimizer Type" defaultValue="Prodigy" options={optTypes}></CmpCombox>
              <CmpNum ref={getRef()} id="max_train_epochs" title="Max Train Epochs" defaultValue={10} min={1} max={1000} step={1} precision={0}></CmpNum>
              <CmpNum ref={getRef()} id="train_batch_size" title="Train Batch Size" defaultValue={1} min={1} max={5} step={1} precision={0}></CmpNum>
              <CmpNum ref={getRef()} id="learning_rate" title="Learning Rate" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5} isOptional={true} enable={true}></CmpNum>
              <CmpNum ref={getRef()} id="unet_lr" title="UNet Lr" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5} isOptional={true} enable={false}></CmpNum>
              <CmpNum ref={getRef()} id="text_encoder_lr" title="Text Encord Lr" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5} isOptional={true} enable={false}></CmpNum>
              <CmpCombox ref={getRef()} id="lr_scheduler" title="Lr Scheduler" defaultValue="constant" options={lrSchedulers} isOptional={true} enable={false}></CmpCombox>
              <CmpNum ref={getRef()} id="lr_warmup_steps" title="lr Warmup Steps" defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0} enable={false}></CmpNum>
              <CmpNum ref={getRef()} id="lr_scheduler_num_cycles" title="Lr Scheduler Num Cycles" defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0} enable={false}></CmpNum>
            </Collapse.Item>

            <Collapse.Item name="5" header="Tag处理">
              <CmpText ref={getRef()} id="caption_extension" title="Caption Extension" defaultValue=".txt"></CmpText>
              <CmpNum ref={getRef()} id="max_token_length" title="Max Token Length" defaultValue={225} min={75} max={225} step={1} precision={0}></CmpNum>
              <CmpSwitch ref={getRef()} id="shuffle_caption" title="Shuffle Caption" defaultValue={true} isOptional={true} enable={false}></CmpSwitch>
              <CmpNum ref={getRef()} id="keep_tokens" title="Keep Tokens" defaultValue={1} isOptional={true} enable={false} min={1} max={225} step={1} precision={0} />
              <CmpNum ref={getRef()} id="caption_dropout_rate" title="Caption Dropout Rate" defaultValue={1} isOptional={true} enable={false} min={0} max={1} step={0.01} precision={2} />
            </Collapse.Item>

            <Collapse.Item name="6" header="预览">
              <CmpNum ref={getRef()} id="sample_every_n_epochs" title="Sample Every N Epochs" enable={false} defaultValue={1} isOptional={true} min={0} max={300} step={1} precision={0}></CmpNum>
              <CmpFile ref={getRef()} id="sample_prompts" title="Sample Prompts" enable={false} defaultValue="" isOptional={true} filters={[{ name: "Prompt", extensions: ["txt"] }]} defaultPath={"D:\\LoraTrainData\\trains\\"}></CmpFile>
              <CmpCombox ref={getRef()} id="sample_sampler" title="Sample Sampler" enable={false} defaultValue="k_euler_a" isOptional={true} options={samplerTypes}></CmpCombox>
            </Collapse.Item>

            <Collapse.Item name="7" header="噪声处理">
              <CmpNum ref={getRef()} id="noise_offset" title="Noise Offset" enable={false} defaultValue={0.0357} isOptional={true} min={0} max={1} step={0.001} precision={3}></CmpNum>
              <CmpNum ref={getRef()} id="multires_noise_iterations" title="Multires Noise Iterations" enable={false} defaultValue={6} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
              <CmpNum ref={getRef()} id="multires_noise_discount" title="Multires Noise Discount" enable={false} defaultValue={0.3} isOptional={true} min={0.1} max={0.8} step={0.1} precision={1}></CmpNum>
              <CmpNum ref={getRef()} id="prior_loss_weight" title="Prior Loss Weight" enable={false} defaultValue={1} isOptional={true} min={0} max={1} step={0.01} precision={2}></CmpNum>
              <CmpNum ref={getRef()} id="min_snr_gamma" title="Min Snr Gamma" enable={false} defaultValue={5} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
            </Collapse.Item>

            <Collapse.Item name="8" header="分层训练">
              <CmpSwitch ref={getRef()} id="network_args" title="Network Args" isOptional={true} enable={false} />
              <BlockEditor ref={getRef()} id="block_dims" title="block_dims" defaultValue="0,64,64,0,64,64,0,64,64,0,0,0,64,0,0,0,64,64,64,64,64,64,64,64,64" isOptional={true} enable={false} isExtraArg={true} />
              <BlockEditor ref={getRef()} id="block_alphas" title="block_alphas" defaultValue="0,32,32,0,32,32,0,32,32,0,0,0,32,0,0,0,32,32,32,32,32,32,32,32,32" isOptional={true} enable={false} isExtraArg={true} />
            </Collapse.Item>

            <Collapse.Item name="9" header="Lycoris">
              <CmpSwitch ref={getRef()} id="network_args" title="Network Args" isOptional={true} enable={false} />
              <CmpNum ref={getRef()} id="conv_dim" title="Conv Dim" defaultValue={32} min={1} max={32} step={1} precision={0} isOptional={true} enable={false} isExtraArg={true} />
              <CmpNum ref={getRef()} id="conv_alpha" title="Conv Alpha" defaultValue={32} min={1} max={32} step={1} precision={0} isOptional={true} enable={false} isExtraArg={true} />
              <CmpNum ref={getRef()} id="unit" title="Unit" defaultValue={8} min={1} max={8} step={1} precision={0} isOptional={true} enable={false} isExtraArg={true} />
            </Collapse.Item> */}
          </Collapse>
        </Grid.Col>
        <Grid.Col span={10}>
          <Space direction="vertical" style={{ padding: "15px", marginTop: "-9px" }}>
            <Space direction="horizontal">
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
                {" "}
                Run{" "}
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
}

export default App;
