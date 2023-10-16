import { Collapse, Space, Button, Input, Grid } from '@arco-design/web-react';
import { CmpBaseRef} from './compornts/ArgComponets';
import { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum, BlockEditor } from './compornts/Components';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { clipboard } from '@tauri-apps/api';

// 模型类型
const loraType = ['networks.lora', 'networks.dylora', 'networks.lora_fa']
// 优化器选项
const optTypes = ['AdamW', 'AdamW8bit', 'Lion', 'SGDNesterov', 'SGDNesterov8bit', 'DAdaptation', 'AdaFactor', 'Prodigy'];
// 学习策略
const lrSchedulers = ['linear', 'cosine', 'cosine_with_restarts', 'polynomial', 'constant', 'constant_with_warmup', 'adafactor'];
// 预览生成采样器
const samplerTypes = ['ddim', 'pndm', 'lms', 'euler', 'euler_a', 'heun', 'dpm_2', 'dpm_2_a', 'dpmsolver', 'dpmsolver++', 'dpmsingle', 'k_lms', 'k_euler', 'k_euler_a', 'k_dpm_2', 'k_dpm_2_a'];
// 格式
const fomats = ['fp16', 'bf16'];
//
const logwithOptions = ['tensorboard', 'wandb', 'all']

function App() {
  const [result, setResult] = useState('');
  const refs: Array<React.RefObject<CmpBaseRef>> = [];
  useEffect(() => {
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
    clipboard.writeText(cmd);
  };

  const createCommand_xl = (): void => {
    var cmd = 'python -m accelerate.commands.launch --num_cpu_threads_per_process=8 sdxl_train_network.py ';
    refs.map((ref) => {
      if (ref.current != null) {
        cmd += ref.current.getArgumentString() + ' ';
      }
    });
    setResult(cmd);
    clipboard.writeText(cmd);
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
            <CmpFolder ref={getRef()} id="reg_data_dir" title="Reg Data Dir" defaultPath={'D:\\LoraTrainData\\trains\\'} isOptional={true} enable={false} ></CmpFolder>
            <CmpFolder ref={getRef()} id="output_dir" title="Output Dir" defaultPath={'D:\\LoraTrainData\\output\\'}></CmpFolder>
            <CmpText ref={getRef()} id="output_name" title="Output Name"></CmpText>         
            <CmpNum ref={getRef()} id="save_every_n_epochs" title="Save Every N Epochs" defaultValue={1} min={1} max={30} step={1} precision={0} isOptional={true} enable={false}></CmpNum>
            <CmpCombox ref={getRef()} id="log_with" title="Log With" defaultValue="wandb" options={logwithOptions} isOptional={true} enable={false}></CmpCombox>
            <CmpText ref={getRef()} id="wandb_api_key" title="Wandb Api Key" defaultValue="39fb76fe3f1fd50febbfff17f0f1b738aa26e717" isOptional={true} enable={false}></CmpText>
            <CmpFolder ref={getRef()} id="logging_dir" title="Logging Dir" defaultPath={'D:\\LoraTrainData\\output\\'} isOptional={true} enable={false}></CmpFolder>
            <CmpSwitch ref={getRef()} id="no_metadata" title="No Metadata" isOptional={true} enable={true}></CmpSwitch>
          </Collapse.Item>

          <Collapse.Item name="2" header="基本设置">
            <CmpSwitch ref={getRef()} id="xformers" title="Xformers" isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="mem_eff_attn" title="Memory efficient attention" isOptional={true} enable={false}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="enable_bucket" title="Enable Bucket" isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="cache_latents" title="Cache Latents" isOptional={true} enable={false}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="cache_latents_to_disk" title="Cache Latents To Disk" isOptional={true} enable={false}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="cache_text_encoder_outputs" title="Cache Text Encoder Outputs" enable={false} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="cache_text_encoder_outputs_to_disk" title="Cache Text Encoder Outputs To Disk" enable={false} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="persistent_data_loader_workers" title="Persistent Data Loader Workers" defaultValue={true} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="network_train_text_encoder_only" title="Train Text Encoder Only" enable={false} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="network_train_unet_only" title="Train UNet Only" enable={false} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="no_half_vae" title="No Half VAE" enable={true} isOptional={true}></CmpSwitch>
            <CmpText ref={getRef()} id="save_model_as" title="Save Model As" defaultValue="safetensors" enable={false}></CmpText>
            <CmpCombox ref={getRef()} id="mixed_precision" title="Mixed Precision" defaultValue="bf16" enable={true} options={fomats}></CmpCombox>
            <CmpCombox ref={getRef()} id="save_precision" title="Save Precision" defaultValue="bf16" enable={true} options={fomats}></CmpCombox>
            <CmpText ref={getRef()} id="seed" title="seed" defaultValue="666" isOptional={true}></CmpText>
            <CmpNum ref={getRef()} id="clip_skip" title="Clip Skip" defaultValue={2} min={0} max={10} step={1} precision={0}></CmpNum>
            <CmpSwitch ref={getRef()} id="full_bf16" title="Full bf16" enable={true} isOptional={true}></CmpSwitch>
            <CmpSwitch ref={getRef()} id="full_fp16" title="Full fp16" enable={false} isOptional={true}></CmpSwitch>
            <CmpText ref={getRef()} id="max_data_loader_n_workers" title="Max Data Loader" defaultValue='0' enable={false} isOptional={true} ></CmpText>
            <CmpSwitch ref={getRef()} id="gradient_checkpointing" title="Gradient Checkpointing" enable={false} isOptional={true}></CmpSwitch>
          </Collapse.Item>

          <Collapse.Item name="3" header="学习参数">
            <CmpText ref={getRef()} id="resolution" title="Resolution" defaultValue="512,512"></CmpText>
            <CmpCombox ref={getRef()} id="network_module" title="Network Module" defaultValue={loraType[0]} options={loraType}></CmpCombox>
            <CmpCombox ref={getRef()} id="optimizer_type" title="Optimizer Type" defaultValue="Prodigy" options={optTypes}></CmpCombox>
            <CmpNum ref={getRef()} id="max_train_epochs" title="Max Train Epochs" defaultValue={10} min={1} max={1000} step={1} precision={0}></CmpNum>
            <CmpNum ref={getRef()} id="learning_rate" title="Learning Rate" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5} isOptional={true} enable={true}></CmpNum>
            <CmpNum ref={getRef()} id="unet_lr" title="UNet Lr" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5} isOptional={true} enable={false}></CmpNum>
            <CmpNum ref={getRef()} id="text_encoder_lr" title="Text Encord Lr" defaultValue={1.0} min={0.00001} max={1.0} step={0.00001} precision={5} isOptional={true} enable={false}></CmpNum>
            <CmpNum ref={getRef()} id="network_dim" title="Network Dim" defaultValue={32} min={1} max={128} step={1} precision={0}></CmpNum>
            <CmpNum ref={getRef()} id="network_alpha" title="Network Alpha" defaultValue={16} min={0} max={128} step={1} precision={0}></CmpNum>
            <CmpFolder ref={getRef()} id="network_weights" title="Network Weights" defaultPath={'D:\\LoraTrainData\\trains\\'} isOptional={true} enable={false} ></CmpFolder>
            <CmpSwitch ref={getRef()} id="dim_from_weights" title="Dim From Weights" enable={false} isOptional={true}></CmpSwitch>
            <CmpNum ref={getRef()} id="network_dropout" title="NetworkDropout" defaultValue={0.1} min={0.1} max={0.5} step={0.01} precision={2} isOptional={true} enable={false}></CmpNum>
            <CmpNum ref={getRef()} id="scale_weight_norms" title='Scale Weigth Norms' defaultValue={1.0} min={0.01} max={2.0} step={0.01} precision={2} isOptional={true} enable={false}></CmpNum>
            <CmpNum ref={getRef()} id="train_batch_size" title="Train Batch Size" defaultValue={1} min={1} max={5} step={1} precision={0}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="4" header="学习策略">
            <CmpCombox ref={getRef()} id="lr_scheduler" title="Lr Scheduler" defaultValue="constant" options={lrSchedulers} isOptional={true} enable={false}></CmpCombox>
            <CmpNum ref={getRef()} id="lr_warmup_steps" title="lr Warmup Steps" defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0} enable={false}></CmpNum>
            <CmpNum ref={getRef()} id="lr_scheduler_num_cycles" title="Lr Scheduler Num Cycles" defaultValue={4} isOptional={true} min={1} max={30} step={0} precision={0} enable={false}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="5" header="Tag相关参数">
            <CmpText ref={getRef()} id="caption_extension" title="Caption Extension" defaultValue=".txt"></CmpText>
            <CmpNum ref={getRef()} id="max_token_length" title="Max Token Length" defaultValue={225} min={75} max={225} step={1} precision={0}></CmpNum>
            <CmpSwitch ref={getRef()} id="shuffle_caption" title="Shuffle Caption" defaultValue={true} isOptional={true} enable={false}></CmpSwitch>
          </Collapse.Item>

          <Collapse.Item name="6" header="预览">
            <CmpNum ref={getRef()} id="sample_every_n_epochs" title="Sample Every N Epochs" enable={false} defaultValue={1} isOptional={true} min={0} max={300} step={1} precision={0}></CmpNum>
            <CmpFile ref={getRef()} id="sample_prompts" title="Sample Prompts" enable={false} defaultValue="" isOptional={true} filters={[{ name: 'Prompt', extensions: ['txt'] }]} defaultPath={'D:\\LoraTrainData\\trains\\'}></CmpFile>
            <CmpCombox ref={getRef()} id="sample_sampler" title="Sample Sampler" enable={false} defaultValue="k_euler_a" isOptional={true} options={samplerTypes}></CmpCombox>
          </Collapse.Item>

          <Collapse.Item name="7" header="增强参数">
            <CmpNum ref={getRef()} id="noise_offset" title="Noise Offset" enable={false} defaultValue={0.0357} isOptional={true} min={0} max={1} step={0.001} precision={3}></CmpNum>
            <CmpNum ref={getRef()} id="multires_noise_iterations" title="Multires Noise Iterations" enable={false} defaultValue={6} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
            <CmpNum ref={getRef()} id="multires_noise_discount" title="Multires Noise Discount" enable={false} defaultValue={0.3} isOptional={true} min={0.1} max={0.8} step={0.1} precision={1}></CmpNum>
            <CmpNum ref={getRef()} id="prior_loss_weight" title="Prior Loss Weight" enable={false} defaultValue={1} isOptional={true} min={0} max={1} step={0.01} precision={2}></CmpNum>
            <CmpNum ref={getRef()} id="min_snr_gamma" title="Min Snr Gamma" enable={false} defaultValue={5} isOptional={true} min={0} max={10} step={1} precision={0}></CmpNum>
          </Collapse.Item>

          <Collapse.Item name="8" header="Lycoris">
            <CmpSwitch ref={getRef()} id="network_args" title="Network Args" isOptional={true} enable={false} />
            <CmpNum ref={getRef()} id="conv_dim" title="Conv Dim" defaultValue={32} min={1} max={32} step={1} precision={0} isOptional={true} enable={false} isExtraArg={true} />
            <CmpNum ref={getRef()} id="conv_alpha" title="Conv Alpha" defaultValue={32} min={1} max={32} step={1} precision={0} isOptional={true} enable={false} isExtraArg={true} />
            <CmpNum ref={getRef()} id="unit" title="Unit" defaultValue={8} min={1} max={8} step={1} precision={0} isOptional={true} enable={false} isExtraArg={true} />
          </Collapse.Item>

          <Collapse.Item name="9" header="分层训练">
            <CmpSwitch ref={getRef()} id="network_args" title="Network Args" isOptional={true} enable={false} />
            <BlockEditor ref={getRef()} id="block_dims" title="block_dims" defaultValue="0,64,64,0,64,64,0,64,64,0,0,0,64,0,0,0,64,64,64,64,64,64,64,64,64" isOptional={true} enable={false} isExtraArg={true}/>
            <BlockEditor ref={getRef()} id="block_alphas" title="block_alphas" defaultValue="0,32,32,0,32,32,0,32,32,0,0,0,32,0,0,0,32,32,32,32,32,32,32,32,32" isOptional={true} enable={false} isExtraArg={true}/>
            {/* <CmpText ref={getRef()} id="conv_block_dims" title="conv_block_dims" defaultValue="2,2,2,2,4,4,4,4,6,6,6,6,8,6,6,6,6,4,4,4,4,2,2,2,2" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="conv_block_alphas" title="conv_block_alphas" defaultValue="2,2,2,2,4,4,4,4,6,6,6,6,8,6,6,6,6,4,4,4,4,2,2,2,2" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="down_lr_weight" title="down_lr_weight" defaultValue="1,1,1,1,1,1,1,1,1,1,1,1" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="mid_lr_weight" title="mid_lr_weight" defaultValue="1.0" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="up_lr_weight" title="up_lr_weight" defaultValue="1,1,1,1,1,1,1,1,1,1,1,1" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="block_lr_zero_threshold" title="down_lr_weight" defaultValue="0.1" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="down_lr_weight" title="down_lr_weight" defaultValue="sine+.5" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="mid_lr_weight" title="down_lr_weight" defaultValue="1.5" isOptional={true} enable={false} isExtraArg={true}></CmpText>
            <CmpText ref={getRef()} id="up_lr_weight" title="down_lr_weight" defaultValue="cosine+.5" isOptional={true} enable={false} isExtraArg={true}></CmpText> */}
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
              SD1.5
            </Button>
            <Button
              onClick={() => {
                createCommand_xl();
              }}>
              SDXL
            </Button>
          </Space >
          <Space style={{ width: '100%' }}>
            <Input.TextArea value={result} style={{ width: 500 }} autoSize onChange={(v, e) => { setResult(v) }}></Input.TextArea>
          </Space>
        </Space>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}

export default App;
