import { Collapse, Space, Button, Typography, Grid } from '@arco-design/web-react';
import { CmpBaseRef, CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum } from './compornts/ArgComponets';
// import { appDataDir, resourceDir } from '@tauri-apps/api/path';
import { useEffect, useRef, useState } from 'react';
import './App.css';

// 优化器选项
const optTypes = ['AdamW', 'AdamW8bit', 'Lion', 'SGDNesterov', 'SGDNesterov8bit', 'DAdaptation', 'AdaFactor', 'Prodigy'];
// 学习策略
const lrSchedulers = ['linear', 'cosine', 'cosine_with_restarts', 'polynomial', 'constant', 'constant_with_warmup', 'adafactor'];
// 预览生成采样器
const samplerTypes = ['ddim', 'pndm', 'lms', 'euler', 'euler_a', 'heun', 'dpm_2', 'dpm_2_a', 'dpmsolver', 'dpmsolver++', 'dpmsingle', 'k_lms', 'k_euler', 'k_euler_a', 'k_dpm_2', 'k_dpm_2_a'];

function App() {
  const [result, setResult] = useState('');
  const refs: Array<React.RefObject<CmpBaseRef>> = [];
  useEffect(() => {
    // resourceDir().then(setResult);
  }, []);

  // 创建控件引用
  const getRef = (): React.RefObject<CmpBaseRef> => {
    const ref = useRef<CmpBaseRef>(null);
    refs.push(ref);
    return ref;
  }

  // 生成命令
  const createCommand = (): void => {
    var cmd = 'python -m accelerate.commands.launch --num_cpu_threads_per_process=8 train_network.py ';
    refs.map((ref) => {
      if (ref.current != null) {
        cmd += ref.current.getArgumentString() + ' ';
      }
    });
    setResult(cmd);
  };

  return (
    <div style={{ padding: '5px'}}>
      <Grid.Row>
        <Grid.Col span={14}>
        <Collapse className="comp_list" bordered={true} lazyload={false} style={{width: '100%', overflow: 'hidden' }} defaultActiveKey={['1','2','3']} >
          <Collapse.Item name="1" header="数据" disabled>
            <CmpFile ref={getRef()} id="pretrained_model_name_or_path" title="Model" filters={[{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt'] }]} defaultPath={'D:\\Projects\\stable-diffusion-webui\\models\\Stable-diffusion\\'}></CmpFile>
            <CmpFile ref={getRef()} id="vae" title="VAE" isOptional={true} enable={false} filters={[{ name: 'VAE', extensions: ['safetensors', 'ckpt', 'pt'] }]} defaultPath={'D:\\Projects\\stable-diffusion-webui\\models\\VAE\\'}></CmpFile>
            <CmpFolder ref={getRef()} id="train_data_dir" title="Train Data Dir" defaultPath={'D:\\LoraTrainData\\trains\\'}></CmpFolder>
            <CmpFolder ref={getRef()} id="output_dir" title="Output Dir" defaultPath={'D:\\LoraTrainData\\output\\'}></CmpFolder>
            <CmpText ref={getRef()} id="output_name" title="Output Name"></CmpText>         
            <CmpNum ref={getRef()} id="save_every_n_epochs" title="Save Every N Epochs" defaultValue={1} min={1} max={30} step={1} precision={0}></CmpNum>
            <CmpFolder ref={getRef()} id="logging_dir" title="Logging Dir" defaultPath={'D:\\LoraTrainData\\output\\'} isOptional={true} enable={false}></CmpFolder>
          </Collapse.Item>

          <Collapse.Item name="2" header="不常用的设置">
            <CmpSwitch ref={getRef()} id="xformers" title="Xformers" defaultValue={true} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="enable_bucket" title="Enable Bucket" defaultValue={true} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="cache_latents" title="Cache Latents" defaultValue={true} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="persistent_data_loader_workers" title="Persistent Data Loader Workers" defaultValue={true} isOptional={true}></CmpSwitch>
            <CmpText ref={getRef()} id="save_model_as" title="Save Model As" defaultValue="safetensors" enable={false}></CmpText>
            <CmpText ref={getRef()} id="mixed_precision" title="Mixed Precision" defaultValue="fp16" enable={false}></CmpText>
            <CmpText ref={getRef()} id="save_precision" title="Save Precision" defaultValue="fp16" enable={false}></CmpText>
            <CmpText ref={getRef()} id="seed" title="seed" defaultValue="666" isOptional={true}></CmpText>
            <CmpNum ref={getRef()} id="clip_skip" title="Clip Skip" defaultValue={2} min={0} max={10} step={1} precision={0}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="3" header="基本设置">
            <CmpText ref={getRef()} id="resolution" title="Resolution" defaultValue="512,512"></CmpText>
            <CmpCombox ref={getRef()} id="optimizer_type" title="Optimizer Type" defaultValue="Prodigy" options={optTypes}></CmpCombox>
            <CmpText ref={getRef()} id="network_module" title="Network Module" defaultValue="networks.lora" enable={false}></CmpText>
            <CmpNum ref={getRef()} id="max_train_epochs" title="Max Train Epochs" defaultValue={10} min={1} max={1000} step={1} precision={0}></CmpNum>
            <CmpNum ref={getRef()} id="learning_rate" title="Learning Rate" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5}></CmpNum>
            <CmpNum ref={getRef()} id="unet_lr" title="UNet Lr" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5}></CmpNum>
            <CmpNum ref={getRef()} id="text_encoder_lr" title="Text Encord Lr" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5}></CmpNum>
            <CmpNum ref={getRef()} id="network_dim" title="Network Dim" defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
            <CmpNum ref={getRef()} id="network_alpha" title="Network Alpha" defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
            <CmpNum ref={getRef()} id="network_dropout" title="NetworkDropout" defaultValue={0.1} min={0.1} max={0.5} step={0.01} precision={2} isOptional={true} enable={false}></CmpNum>
            <CmpNum ref={getRef()} id="train_batch_size" title="Train Batch Size" defaultValue={1} min={1} max={5} step={1} precision={0}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="4" header="学习策略">
            <CmpCombox ref={getRef()} id="lr_scheduler" title="Lr Scheduler" defaultValue="cosine_with_restarts" options={lrSchedulers} isOptional={true} enable={false}></CmpCombox>
            <CmpNum ref={getRef()} id="lr_warmup_steps" title="lr Warmup Steps" defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0} enable={false}></CmpNum>
            <CmpNum ref={getRef()} id="lr_scheduler_num_cycles" title="Lr Scheduler Num Cycles" defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0} enable={false}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="5" header="Tag相关参数">
            <CmpText ref={getRef()} id="caption_extension" title="Caption Extension" defaultValue=".txt"></CmpText>
            <CmpNum ref={getRef()} id="max_token_length" title="Max Token Length" defaultValue={75} min={75} max={225} step={1} precision={0}></CmpNum>
            <CmpSwitch ref={getRef()} id="shuffle_caption" title="Shuffle Caption" defaultValue={true} isOptional={true}></CmpSwitch>
            <CmpNum ref={getRef()} id="keep_tokens" title="Keep Tokens" defaultValue={1} isOptional={true} min={0} max={999} step={1} precision={0}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="6" header="预览">
            <CmpNum ref={getRef()} id="sample_every_n_epochs" title="Sample Every N Epochs" enable={false} defaultValue={1} isOptional={true} min={0} max={300} step={1} precision={0}></CmpNum>
            <CmpFile ref={getRef()} id="sample_prompts" title="Sample Prompts" enable={false} defaultValue="" isOptional={true} filters={[{ name: 'Prompt', extensions: ['txt'] }]} defaultPath={'D:\\LoraTrainData\\trains\\'}></CmpFile>
            <CmpCombox ref={getRef()} id="sample_sampler" title="Sample Sampler" enable={false} defaultValue="k_dpm_2_a" isOptional={true} options={samplerTypes}></CmpCombox>
          </Collapse.Item>

          <Collapse.Item name="7" header="增强参数">
            <CmpNum ref={getRef()} id="noise_offset" title="Noise Offset" enable={false} defaultValue={0.01} isOptional={true} min={0} max={1} step={0.001} precision={3}></CmpNum>
            <CmpNum ref={getRef()} id="multires_noise_iterations" title="Multires Noise Iterations" enable={false} defaultValue={6} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
            <CmpNum ref={getRef()} id="multires_noise_discount" title="Multires Noise Discount" enable={false} defaultValue={0.3} isOptional={true} min={0.1} max={0.8} step={0.1} precision={1}></CmpNum>
            <CmpNum ref={getRef()} id="prior_loss_weight" title="Prior Loss Weight" enable={false} defaultValue={1} isOptional={true} min={0} max={1} step={0.01} precision={2}></CmpNum>
            <CmpNum ref={getRef()} id="min_snr_gamma" title="Min Snr Gamma" enable={false} defaultValue={5} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="8" header="分层训练">
          </Collapse.Item>
          </Collapse>
        </Grid.Col>
        <Grid.Col span={10}>
        <Space direction="vertical" style={{ padding: '15px', marginTop: '-9px' }}>
          <Space direction='horizontal'>
            <Button
              type="primary"
              onClick={() => {
                createCommand();
              }}>
              生成命令
            </Button>
            <Button
              onClick={() => {
              }}>
              读取配置
            </Button>
            <Button
              onClick={() => {
              }}>
              加载配置
            </Button>
          </Space >
          <Space style={{ width: '100%' }}>
            <Typography>{result}</Typography>
          </Space>
        </Space>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}

export default App;
