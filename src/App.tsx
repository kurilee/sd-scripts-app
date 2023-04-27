import { Collapse } from '@arco-design/web-react';
import { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum, CmpFileProps } from './compornts/ArgComponets';
import { appDataDir } from '@tauri-apps/api/path';
import { useEffect, useRef, useState } from 'react';
import './App.css'

const optTypes = ["AdamW", "AdamW8bit", "Lion", "SGDNesterov", "SGDNesterov8bit", "DAdaptation", "AdaFactor"];
const lrSchedulers = ["linear", "cosine", "cosine_with_restarts", "polynomial", "constant", "constant_with_warmup", "adafactor"];
const samplerTypes = ["ddim", "pndm", "lms", "euler", "euler_a", "heun", "dpm_2", "dpm_2_a", "dpmsolver", "dpmsolver++", "dpmsingle", "k_lms", "k_euler", "k_euler_a", "k_dpm_2", "k_dpm_2_a"];

function App() {
  const [defaultAppConfigPath, setDefaultAppConfigPath] = useState("");
  const abc = useRef<React.FC<CmpFileProps>>(null)
  useEffect(() => {
    appDataDir().then(setDefaultAppConfigPath);
  }, [])
  return (
    <div style={{ padding: "5px" }}>
      <Collapse className="comp_list">
        <Collapse.Item name='1' header="数据">
          <CmpFile id='pretrained_model_name_or_path' title="基本模型" filters={[{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt'] }]}></CmpFile>
          <CmpFile id='vae' title="VAE" isOptional={true} filters={[{ name: 'VAE', extensions: ['safetensors', 'ckpt', 'pt'] }]}></CmpFile>
          <CmpFolder id='train_data_dir' title="训练集" defaultPath={defaultAppConfigPath} ></CmpFolder>
          <CmpFolder id='output_dir' title="输出路径" defaultPath={defaultAppConfigPath} ></CmpFolder>
          <CmpText id='output_name' title='输出名称' ></CmpText>
          <CmpNum id='save_every_n_epochs' title='Epoch保存间隔' defaultValue={1} min={1} max={30} step={1} precision={0} ></CmpNum>
        </Collapse.Item>

        <Collapse.Item name='2' header="不常用的设置">
          <CmpSwitch id='xformers' title="xformers" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpSwitch id='enable_bucket' title="enable-bucket" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpSwitch id='cache_latents' title="cache_latents" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpSwitch id='persistent_data_loader_workers' title='persistent_data_loader_workers' defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpText id='SaveModelAs' title='SaveModelAs' defaultValue='safetensors' enable={false} ></CmpText>
          <CmpText id='mixed_precision' title='mixed_precision' defaultValue='fp16' enable={false} ></CmpText>
          <CmpText id='save_precision' title='save_precision' defaultValue='fp16' enable={false} ></CmpText>
          <CmpText id='seed' title='seed' defaultValue='666' isOptional={true} ></CmpText>
          <CmpNum id='clip_skip' title='clip_skip' defaultValue={2} min={0} max={10} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name='3' header="基本设置">
          <CmpText id='resolution' title="分辨率" defaultValue="512,512"></CmpText>
          <CmpCombox id='optimizer_type' title="优化器" defaultValue='Lion' options={optTypes}></CmpCombox>
          <CmpText id='network_module' title="网格类型" defaultValue='networks.lora' enable={false}></CmpText>
          <CmpNum id='max_train_epochs' title='Epoch' defaultValue={10} min={1} max={300} step={1} precision={0}></CmpNum>
          <CmpNum id='learning_rate' title='学习率' defaultValue={0.00001} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum id='unet_lr' title='UNetLr' defaultValue={0.00001} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum id='text_encoder_lr' title='TextEncordLr' defaultValue={0.00001} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum id='network_dim' title='NetworkDim' defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum id='network_alpha' title='NetworkAlpha' defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum id='train_batch_size' title='训练批次' defaultValue={1} min={1} max={5} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name='4' header="学习策略">
          <CmpCombox id='lr_scheduler' title="学习策略" defaultValue='cosine_with_restarts' options={lrSchedulers}></CmpCombox>
          <CmpNum id='lr_scheduler_num_cycles' title='学习周期数' defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0} ></CmpNum>
        </Collapse.Item>
        <Collapse.Item name='5' header="Tag相关参数">
          <CmpText id='caption_extension' title='caption_extension' defaultValue='.txt'   ></CmpText>
          <CmpNum id='max_token_length' title='max_token_length' defaultValue={75} min={0} max={225} step={1} precision={0} ></CmpNum>
          <CmpSwitch id='shuffle_caption' title="shuffle_caption" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpNum id='keep_tokens' title='keep_tokens' defaultValue={1} isOptional={true} min={0} max={999} step={1} precision={0} ></CmpNum>
        </Collapse.Item>
        <Collapse.Item name='6' header="预览">
          <CmpNum id='sample_every_n_epochs' title='sample_every_n_epochs' defaultValue={1} isOptional={true} min={0} max={300} step={1} precision={0} ></CmpNum>
          <CmpFile id='sample_prompts' title='sample_prompts' defaultValue='' isOptional={true} filters={[{ name: 'Prompt', extensions: ['txt'] }]} ></CmpFile>
          <CmpCombox id='sample_sampler' title="sample_sampler" defaultValue='k_dpm_2_a' isOptional={true} options={samplerTypes}></CmpCombox>
        </Collapse.Item>
        <Collapse.Item name='7' header="增强参数">
          <CmpNum id='noise_offset' title='noise_offset' defaultValue={0.01} isOptional={true} min={0} max={1} step={0.001} precision={3} ></CmpNum>
          <CmpNum id='prior_loss_weight' title='prior_loss_weight' defaultValue={1} isOptional={true} min={0} max={1} step={0.01} precision={2} ></CmpNum>
          <CmpNum id='min_snr_gamma' title='min_snr_gamma' defaultValue={5} isOptional={true} min={0} max={10} step={1} precision={0} ></CmpNum>
        </Collapse.Item>
      </Collapse>
    </div>
  );
}

export default App;
