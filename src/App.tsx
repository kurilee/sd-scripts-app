import { List, Collapse, Space } from '@arco-design/web-react';
import { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum } from './compornts/ArgComponets';
import { appDataDir } from '@tauri-apps/api/path';
import { useEffect, useState } from 'react';
import './App.css'

const optTypes = ["AdamW", "AdamW8bit", "Lion", "SGDNesterov", "SGDNesterov8bit", "DAdaptation", "AdaFactor"];
const lrSchedulers = ["linear", "cosine", "cosine_with_restarts", "polynomial", "constant", "constant_with_warmup", "adafactor"];
const samplerTypes = ["ddim","pndm","lms","euler","euler_a","heun","dpm_2","dpm_2_a","dpmsolver","dpmsolver++","dpmsingle","k_lms","k_euler","k_euler_a","k_dpm_2","k_dpm_2_a"];

function App() {
  const [defaultAppConfigPath, setDefaultAppConfigPath] = useState("");
  useEffect(() => {
    appDataDir().then(setDefaultAppConfigPath);
  }, [])
  return (
    <div style={{ padding: "5px" }}>
      <Collapse className="comp_list">
        <Collapse.Item name='1' header="数据">
          <CmpFile title="基本模型" value="" defaultValue="" enable={true} isOptional={false} filters={[{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt'] }]}></CmpFile>
          <CmpFile title="VAE" value="" defaultValue="" enable={true} isOptional={true} filters={[{ name: 'VAE', extensions: ['safetensors', 'ckpt', 'pt'] }]}></CmpFile>
          <CmpFolder title="训练集" value="" defaultValue="" enable={true} isOptional={false} defaultPath={defaultAppConfigPath} ></CmpFolder>
          <CmpFolder title="输出路径" value="" defaultValue="" enable={true} isOptional={false} defaultPath={defaultAppConfigPath} ></CmpFolder>
          <CmpText title='输出名称' value='' defaultValue='' enable={true} isOptional={false} ></CmpText>
          <CmpNum title='Epoch保存间隔' value={1} defaultValue={1} enable={true} isOptional={false} min={1} max={30} step={0} precision={0} ></CmpNum>
        </Collapse.Item>

        <Collapse.Item name='2' header="不常用的设置">
          <CmpSwitch title="xformers" value={true} defaultValue={true} enable={true} isOptional={true}></CmpSwitch>
          <CmpSwitch title="enable-bucket" value={true} defaultValue={true} enable={true} isOptional={true}></CmpSwitch>
          <CmpSwitch title="cache_latents" value={true} defaultValue={true} enable={true} isOptional={true}></CmpSwitch>
          <CmpSwitch title='persistent_data_loader_workers' value={true} defaultValue={true} enable={true} isOptional={true}></CmpSwitch>
          <CmpText title='SaveModelAs' value='safetensors' defaultValue='safetensors' enable={false} isOptional={false} ></CmpText>
          <CmpText title='mixed_precision' value='fp16' defaultValue='fp16' enable={false} isOptional={false} ></CmpText>
          <CmpText title='save_precision' value='fp16' defaultValue='fp16' enable={false} isOptional={false} ></CmpText>
          <CmpText title='seed' value='' defaultValue='666' enable={true} isOptional={true} ></CmpText>
          <CmpNum title='clip_skip' value={2} defaultValue={2} enable={true} isOptional={false} min={0} max={10} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name='3' header="基本设置">
          <CmpText title="分辨率" value="" defaultValue="512,512" enable={true} isOptional={false}></CmpText>
          <CmpCombox title="优化器" value='Lion' defaultValue='Lion' enable={true} isOptional={false} options={optTypes}></CmpCombox>
          <CmpText title="网格类型" value='' defaultValue='networks.lora' enable={false} isOptional={false}></CmpText>
          <CmpNum title='Epoch' value={10} defaultValue={10} enable={true} isOptional={false} min={1} max={300} step={1} precision={0}></CmpNum>
          <CmpNum title='学习率' value={0.00001} defaultValue={0.00001} enable={true} isOptional={false} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum title='UNetLr' value={0.00001} defaultValue={0.00001} enable={true} isOptional={false} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum title='TextEncordLr' value={0.00001} defaultValue={0.00001} enable={true} isOptional={false} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum title='NetworkDim' value={10} defaultValue={32} enable={true} isOptional={false} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum title='NetworkAlpha' value={10} defaultValue={32} enable={true} isOptional={false} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum title='训练批次' value={1} defaultValue={1} enable={true} isOptional={false} min={1} max={5} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name='4' header="学习策略">
          <CmpCombox title="学习策略" value='cosine_with_restarts' defaultValue='cosine_with_restarts' enable={true} isOptional={false} options={lrSchedulers}></CmpCombox>
          <CmpNum title='学习周期数' value={4} defaultValue={4} enable={true} isOptional={true} min={1} max={30} step={0} precision={0} ></CmpNum>
        </Collapse.Item>
        <Collapse.Item name='5' header="Tag相关参数">
          <CmpText title='caption_extension' value='.txt' defaultValue='.txt' enable={true} isOptional={false} ></CmpText>
          <CmpNum title='max_token_length' value={255} defaultValue={255} enable={true} isOptional={false} min={0} max={225} step={1} precision={0} ></CmpNum>
          <CmpSwitch title="shuffle_caption" value={true} defaultValue={true} enable={true} isOptional={true}></CmpSwitch>
          <CmpNum title='keep_tokens' value={1} defaultValue={1} enable={true} isOptional={true} min={0} max={999} step={1} precision={0} ></CmpNum>
        </Collapse.Item>
        <Collapse.Item name='6' header="预览">
          <CmpNum title='sample_every_n_epochs' value={1} defaultValue={1} enable={true} isOptional={true} min={0} max={300} step={1} precision={0} ></CmpNum>
          <CmpFile title='sample_prompts' value='' defaultValue='' enable={true} isOptional={true} filters={[{ name: 'Prompt', extensions: ['txt']}]} ></CmpFile>
          <CmpCombox title="sample_sampler" value='k_dpm_2_a' defaultValue='k_dpm_2_a' enable={true} isOptional={true} options={samplerTypes}></CmpCombox>
        </Collapse.Item>
        <Collapse.Item name='7' header="增强参数">
          <CmpNum title='noise_offset' value={0.01} defaultValue={0.01} enable={true} isOptional={true} min={0} max={1} step={0.001} precision={3} ></CmpNum>
          <CmpNum title='prior_loss_weight' value={1} defaultValue={1} enable={true} isOptional={true} min={0} max={1} step={0.01} precision={2} ></CmpNum>
          <CmpNum title='min_snr_gamma' value={5} defaultValue={5} enable={true} isOptional={true} min={0} max={10} step={1} precision={0} ></CmpNum>
        </Collapse.Item>
      </Collapse>
    </div>
  );
}

export default App;
