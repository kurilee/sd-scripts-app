import { Collapse, Space, Button, Typography } from '@arco-design/web-react';
import { CmpBaseRef, CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum } from './compornts/ArgComponets';
import { appDataDir,resourceDir } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';
import { useEffect, useRef, useState } from 'react';
import './App.css';

const optTypes = ['AdamW', 'AdamW8bit', 'Lion', 'SGDNesterov', 'SGDNesterov8bit', 'DAdaptation', 'AdaFactor'];
const lrSchedulers = ['linear', 'cosine', 'cosine_with_restarts', 'polynomial', 'constant', 'constant_with_warmup', 'adafactor'];
const samplerTypes = ['ddim', 'pndm', 'lms', 'euler', 'euler_a', 'heun', 'dpm_2', 'dpm_2_a', 'dpmsolver', 'dpmsolver++', 'dpmsingle', 'k_lms', 'k_euler', 'k_euler_a', 'k_dpm_2', 'k_dpm_2_a'];

const cmd_first = '.\\venv\\Scripts\\activate';

function App() {
  const [defaultAppConfigPath, setDefaultAppConfigPath] = useState('');
  const [result, setResult] = useState('');
  const args = 39;
  const refs: Array<React.RefObject<CmpBaseRef>> = [];
  for (let i = 0; i < args; ++i) {
    const ref = useRef<CmpBaseRef>(null);
    refs.push(ref);
  }
  useEffect(() => {
    resourceDir().then(setResult);
  }, []);

  const createCommand = (): void => {
    var cmd = 'python -m accelerate.commands.launch --num_cpu_threads_per_process=8 train_network.py ';
    refs.map((ref) => {
      cmd += ref.current?.getArgumentString() + ' ';
    });
    setResult(cmd);
  };

  const runCreateVenv = async () => {
    const command = new Command('pwd');
    const pwdresult = await command.execute();
    setResult(pwdresult.stdout);
  };

  const runShell = async () => {
    const command = new Command('create-venv');
    await command.execute();
    const c2 = new Command('active-venv');
    await c2.spawn
  };

  const runTrain = (): void => {
    var args = '';
    refs.map((ref) => {
      args += ref.current?.getArgumentString() + ' ';
    });

    const command = new Command('train', args);

    command.execute();
  };

  return (
    <div style={{ padding: '5px' }}>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            createCommand();
          }}>
          生成命令
        </Button>
        <Button
          onClick={() => {
            runCreateVenv();
          }}>
          读取配置
        </Button>
        <Button
          onClick={() => {
            runShell();
          }}>
          加载配置
        </Button>
      </Space>
      <Collapse className="comp_list" bordered={false} lazyload={false}>
        <Collapse.Item name="1" header="数据">
          <CmpFile ref={refs[0]} id="pretrained_model_name_or_path" title="基本模型" filters={[{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt'] }]} defaultPath={'D:\\Projects\\stable-diffusion-webui\\models\\Stable-diffusion\\'}></CmpFile>
          <CmpFile ref={refs[1]} id="vae" title="VAE" isOptional={true} filters={[{ name: 'VAE', extensions: ['safetensors', 'ckpt', 'pt'] }]} defaultPath={'D:\\Projects\\stable-diffusion-webui\\models\\VAE\\'}></CmpFile>
          <CmpFolder ref={refs[2]} id="train_data_dir" title="train_data_dir" defaultPath={'D:\\LoraTrainData\\trains\\'}></CmpFolder>
          <CmpFolder ref={refs[3]} id="output_dir" title="output_dir" defaultPath={'D:\\LoraTrainData\\output\\'}></CmpFolder>
          <CmpText ref={refs[4]} id="output_name" title="output_name"></CmpText>
          <CmpNum ref={refs[5]} id="save_every_n_epochs" title="save_every_n_epochs" defaultValue={1} min={1} max={30} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name="2" header="不常用的设置">
          <CmpSwitch ref={refs[6]} id="xformers" title="xformers" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpSwitch ref={refs[7]} id="enable_bucket" title="enable-bucket" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpSwitch ref={refs[8]} id="cache_latents" title="cache_latents" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpSwitch ref={refs[9]} id="persistent_data_loader_workers" title="persistent_data_loader_workers" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpText ref={refs[10]} id="save_model_as" title="save_model_as" defaultValue="safetensors" enable={false}></CmpText>
          <CmpText ref={refs[11]} id="mixed_precision" title="mixed_precision" defaultValue="fp16" enable={false}></CmpText>
          <CmpText ref={refs[12]} id="save_precision" title="save_precision" defaultValue="fp16" enable={false}></CmpText>
          <CmpText ref={refs[13]} id="seed" title="seed" defaultValue="666" isOptional={true}></CmpText>
          <CmpNum ref={refs[14]} id="clip_skip" title="clip_skip" defaultValue={2} min={0} max={10} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name="3" header="基本设置">
          <CmpText ref={refs[15]} id="resolution" title="resolution" defaultValue="512,512"></CmpText>
          <CmpCombox ref={refs[16]} id="optimizer_type" title="optimizer_type" defaultValue="Lion" options={optTypes}></CmpCombox>
          <CmpText ref={refs[17]} id="network_module" title="network_module" defaultValue="networks.lora" enable={false}></CmpText>
          <CmpNum ref={refs[18]} id="max_train_epochs" title="max_train_epochs" defaultValue={10} min={1} max={300} step={1} precision={0}></CmpNum>
          <CmpNum ref={refs[19]} id="learning_rate" title="learning_rate" defaultValue={0.00001} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum ref={refs[20]} id="unet_lr" title="unet_lr" defaultValue={0.00001} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum ref={refs[21]} id="text_encoder_lr" title="TextEncordLr" defaultValue={0.00001} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum ref={refs[22]} id="network_dim" title="NetworkDim" defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum ref={refs[23]} id="network_alpha" title="NetworkAlpha" defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum ref={refs[24]} id="train_batch_size" title="train_batch_size" defaultValue={1} min={1} max={5} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name="4" header="学习策略">
          <CmpCombox ref={refs[25]} id="lr_scheduler" title="lr_scheduler" defaultValue="cosine_with_restarts" options={lrSchedulers}></CmpCombox>
          <CmpNum ref={refs[26]} id="lr_scheduler_num_cycles" title="lr_scheduler_num_cycles" defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name="5" header="Tag相关参数">
          <CmpText ref={refs[27]} id="caption_extension" title="caption_extension" defaultValue=".txt"></CmpText>
          <CmpNum ref={refs[28]} id="max_token_length" title="max_token_length" defaultValue={225} min={150} max={225} step={1} precision={0}></CmpNum>
          <CmpSwitch ref={refs[29]} id="shuffle_caption" title="shuffle_caption" defaultValue={true} isOptional={true}></CmpSwitch>
          <CmpNum ref={refs[30]} id="keep_tokens" title="keep_tokens" defaultValue={1} isOptional={true} min={0} max={999} step={1} precision={0}></CmpNum>
        </Collapse.Item>

        <Collapse.Item name="6" header="预览">
          <CmpNum ref={refs[31]} id="sample_every_n_epochs" title="sample_every_n_epochs" enable={false} defaultValue={1} isOptional={true} min={0} max={300} step={1} precision={0}></CmpNum>
          <CmpFile ref={refs[32]} id="sample_prompts" title="sample_prompts" enable={false} defaultValue="" isOptional={true} filters={[{ name: 'Prompt', extensions: ['txt'] }]} defaultPath={'D:\\LoraTrainData\\trains\\'}></CmpFile>
          <CmpCombox ref={refs[33]} id="sample_sampler" title="sample_sampler" enable={false} defaultValue="k_dpm_2_a" isOptional={true} options={samplerTypes}></CmpCombox>
        </Collapse.Item>

        <Collapse.Item name="7" header="增强参数">
          <CmpNum ref={refs[34]} id="noise_offset" title="noise_offset" enable={false} defaultValue={0.01} isOptional={true} min={0} max={1} step={0.001} precision={3}></CmpNum>
          <CmpNum ref={refs[35]} id="multires_noise_iterations" title="multires_noise_iterations" enable={false} defaultValue={6} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
          <CmpNum ref={refs[36]} id="multires_noise_discount" title="multires_noise_discount" enable={false} defaultValue={0.3} isOptional={true} min={0.1} max={0.8} step={0.1} precision={1}></CmpNum>
          <CmpNum ref={refs[37]} id="prior_loss_weight" title="prior_loss_weight" enable={false} defaultValue={1} isOptional={true} min={0} max={1} step={0.01} precision={2}></CmpNum>
          <CmpNum ref={refs[38]} id="min_snr_gamma" title="min_snr_gamma" enable={false} defaultValue={5} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
        </Collapse.Item>
      </Collapse>
      <Typography>{result}</Typography>
    </div>
  );
}

export default App;
