import { title } from "process";

// 模型类型
const loraType = ['networks.lora', 'networks.dylora', 'networks.lora_fa'];
// 优化器选项
const optTypes = ['AdamW', 'AdamW8bit', 'Lion', 'SGDNesterov', 'SGDNesterov8bit', 'DAdaptation', 'AdaFactor', 'Prodigy'];
// 学习策略
const lrSchedulers = ['linear', 'cosine', 'cosine_with_restarts', 'polynomial', 'constant', 'constant_with_warmup', 'adafactor'];
// 预览生成采样器
const samplerTypes = ['ddim', 'pndm', 'lms', 'euler', 'euler_a', 'heun', 'dpm_2', 'dpm_2_a', 'dpmsolver', 'dpmsolver++', 'dpmsingle', 'k_lms', 'k_euler', 'k_euler_a', 'k_dpm_2', 'k_dpm_2_a'];
// 格式
const fomats = ['fp16', 'bf16'];
//
const logwithOptions = ['tensorboard', 'wandb', 'all'];
//
const loseTypes = ['l2', 'huber', 'smooth_l1'];
//
const huberSchedules = ["constant", "exponential", "snr"];

// 生成随机数
const randInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

// 配置集合
const configs = {
  groups: [
    {
      id: '1',
      title: '基本数据',
      args: [
        { visible: true, type: 'file', id: 'pretrained_model_name_or_path', title: 'Model', defaultValue: '', isOptional: false, enable: true, filters: [{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt'] }], defaultPath: 'D:\\Projects\\stable-diffusion-webui\\models\\Stable-diffusion\\' },
        { visible: true, type: 'file', id: 'vae', title: 'VAE', defaultValue: '', isOptional: true, enable: false, filters: [{ name: 'VAE', extensions: ['safetensors', 'ckpt', 'pt'] }], defaultPath: 'D:\\Projects\\stable-diffusion-webui\\models\\VAE\\' },
        { visible: true, type: 'folder', id: 'train_data_dir', title: 'Train Data Dir', defaultValue: '', isOptional: false, enable: true, defaultPath: 'D:\\LoraTrainData\\trains\\' },
        { visible: true, type: 'folder', id: 'reg_data_dir', title: 'Reg Data Dir', defaultValue: '', isOptional: true, enable: false, defaultPath: 'D:\\LoraTrainData\\trains\\' },
        { visible: true, type: 'folder', id: 'output_dir', title: 'Output Dir', defaultValue: '', isOptional: false, enable: true, defaultPath: 'D:\\Projects\\stable-diffusion-webui\\models\\Lora\\自训练' },
        { visible: true, type: 'text', id: 'output_name', title: 'Output Name', defaultValue: '', isOptional: false, enable: true },
      ],
    },
    {
      id: '2',
      title: '输出&日志',
      args: [
        { visible: true, type: 'text', id: 'save_model_as', title: 'Save Model As', defaultValue: 'safetensors', isOptional: false, enable: true },
        { visible: true, type: 'combox', id: 'save_precision', title: 'Save Precision', defaultValue: 'bf16', isOptional: false, enable: true, options: fomats },
        { visible: true, type: 'num', id: 'save_every_n_epochs', title: 'Save Every N Epochs', defaultValue: 1, isOptional: true, enable: false, min: 1, max: 30, step: 1, precision: 0 },
        { visible: true, type: 'switch', id: 'no_metadata', title: 'No Metadata', defaultValue: '', isOptional: true, enable: true },
        { visible: true, type: 'combox', id: 'log_with', title: 'Log With', defaultValue: 'wandb', isOptional: true, enable: false, options: logwithOptions },
        { visible: true, type: 'text', id: 'wandb_api_key', title: 'Wandb API Key', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'folder', id: 'logging_dir', title: 'Logging Dir', defaultValue: '', isOptional: true, enable: false, defaultPath: 'D:\\LoraTrainData\\output\\' },
      ],
    },
    {
      id: '3',
      title: '训练设置',
      args: [
        { visible: true, type: 'switch', id: 'xformers', title: 'Xformers', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'sdpa', title: 'SDPA', defaultValue: '', isOptional: true, enable: true },
        { visible: true, type: 'switch', id: 'enable_bucket', title: 'Enable Bucket', defaultValue: '', isOptional: true, enable: true },
        { visible: true, type: 'switch', id: 'cache_latents', title: 'Cache Latents', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'cache_latents_to_disk', title: 'Cache Latents To Disk', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'cache_text_encoder_outputs', title: 'Cache Text Encoder Outputs', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'cache_text_encoder_outputs_to_disk', title: 'Cache Text Encoder Outputs To Disk', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'persistent_data_loader_workers', title: 'Persistent Data Loader Workers', defaultValue: '', isOptional: true, enable: true },
        { visible: true, type: 'switch', id: 'network_train_text_encoder_only', title: 'Train Text Encoder Only', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'network_train_unet_only', title: 'Train UNet Only', defaultValue: '', isOptional: true, enable: true },
        { visible: true, type: 'switch', id: 'no_half_vae', title: 'No Half VAE', defaultValue: '', isOptional: true, enable: true },
        { visible: true, type: 'text', id: 'mixed_precision', title: 'Mixed Precision', defaultValue: 'bf16', isOptional: false, enable: true, options: fomats },
        { visible: true, type: 'text', id: 'seed', title: 'Seed', defaultValue: randInt(1, 10000).toString(), isOptional: false, enable: true },
        { visible: true, type: 'num', id: 'clip_skip', title: 'Clip Skip', defaultValue: 2, isOptional: false, enable: true, min: 0, max: 10, step: 1, precision: 0 },
        { visible: true, type: 'switch', id: 'full_bf16', title: 'Full bf16', defaultValue: '', isOptional: true, enable: true },
        { visible: true, type: 'switch', id: 'full_fp16', title: 'Full fp16', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'fp8_base', title: 'FP8 Base', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'text', id: 'max_data_loader_n_workers', title: 'Max Data Loader', defaultValue: '0', isOptional: true, enable: false },
        { visible: true, type: 'switch', id: 'gradient_checkpointing', title: 'Gradient Checkpointing', defaultValue: '', isOptional: true, enable: false },
      ],
    },
    {
      id: '4',
      title: '结构参数',
      args: [
        { visible: true, type: 'text', id: 'resolution', title: 'Resolution', defaultValue: '512,512', isOptional: false, enable: true },
        { visible: true, type: 'combox', id: 'network_module', title: 'Network Module', defaultValue: loraType[0], isOptional: false, enable: true, options: loraType },
        { visible: true, type: 'num', id: 'network_dim', title: 'Network Dim', defaultValue: 32, isOptional: false, enable: true, min: 1, max: 128, step: 1, precision: 0 },
        { visible: true, type: 'num', id: 'network_alpha', title: 'Network Alpha', defaultValue: 16, isOptional: false, enable: true, min: 1, max: 128, step: 1, precision: 0 },
        { visible: true, type: 'switch', id: 'dim_from_weights', title: 'Dim From Weights', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'file', id: 'network_weights', title: 'Network Weights', defaultValue: '', isOptional: true, enable: false, defaultPath: 'D:\\LoraTrainData\\output\\', filters: [{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt'] }] },
        { visible: true, type: 'num', id: 'network_dropout', title: 'Network Dropout', defaultValue: 0.1, isOptional: true, enable: false, min: 0.001, max: 0.5, step: 0.001, precision: 3 },
        { visible: true, type: 'num', id: 'scale_weight_norms', title: 'Scale Weigth Norms', defaultValue: 1.0, isOptional: true, enable: false, min: 0.01, max: 2.0, step: 0.01, precision: 2 },
      ],
    },
    {
      id: '5',
      title: '学习参数',
      args: [
        { visible: true, type: 'combox', id: 'optimizer_type', title: 'Optimizer Type', defaultValue: 'Prodigy', isOptional: false, enable: true, options: optTypes },
        { visible: true, type: 'num', id: 'max_train_epochs', title: 'Max Train Epochs', defaultValue: 10, isOptional: false, enable: true, min: 1, max: 1000, step: 1, precision: 0 },
        { visible: true, type: 'num', id: 'train_batch_size', title: 'Train Batch Size', defaultValue: 1, isOptional: false, enable: true, min: 1, max: 5, step: 1, precision: 0 },
        { visible: true, type: 'num', id: 'learning_rate', title: 'Learning Rate', defaultValue: 1.0, isOptional: false, enable: true, min: 0.00001, max: 1.0, step: 0.00001, precision: 5 },
        { visible: true, type: 'num', id: 'unet_lr', title: 'UNet Lr', defaultValue: 1.0, isOptional: true, enable: false, min: 0.00001, max: 1.0, step: 0.00001, precision: 5 },
        { visible: true, type: 'num', id: 'text_encoder_lr', title: 'Text Encord Lr', defaultValue: 1.0, isOptional: true, enable: false, min: 0.00001, max: 1.0, step: 0.00001, precision: 5 },
        { visible: true, type: 'combox', id: 'lr_scheduler', title: 'Lr Scheduler', defaultValue: 'constant', isOptional: true, enable: false, options: lrSchedulers },
        { visible: true, type: 'num', id: 'lr_warmup_steps', title: 'lr Warmup Steps', defaultValue: 1, isOptional: true, enable: false, min: 1, max: 10000, step: 1, precision: 0 },
        { visible: true, type: 'num', id: 'lr_scheduler_num_cycles', title: 'Lr Scheduler Num Cycles', defaultValue: 4, isOptional: true, enable: false, min: 1, max: 30, step: 1, precision: 0 },
      ],
    },
    {
      id: '6',
      title: 'Loss',
      args: [
        { visible: true, type: 'combox', id: 'loss_type', title: 'Loss Type', defaultValue: 'huber', isOptional: true, enable: false, options: loseTypes },
        { visible: true, type: 'combox', id: 'huber_schedule', title: 'Huber Schedule', defaultValue: 'snr', isOptional: true, enable: false, options: huberSchedules },
        { visible: true, type: 'num', id: 'huber_c', title: 'Huber C', defaultValue: 0.1, isOptional: true, enable: false, min: 0.0, max: 1.0, step: 0.1, precision: 1 }
      ]
    },
    {
      id: '7',
      title: 'Tag',
      args: [
        { visible: true, type: 'text', id: 'caption_extension', title: 'Caption Extension', defaultValue: '.txt', isOptional: false, enable: false },
        { visible: true, type: 'num', id: 'max_token_length', title: 'Max Token Length', defaultValue: 225, isOptional: false, enable: false, min: 75, max: 225, step: 1, precision: 0 },
        { visible: true, type: 'switch', id: 'shuffle_caption', title: 'Shuffle Caption', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'num', id: 'keep_tokens', title: 'Keep Tokens', defaultValue: 1, isOptional: true, enable: false, min: 1, max: 225, step: 1, precision: 0 },
        { visible: true, type: 'num', id: 'caption_dropout_rate', title: 'Caption Dropout Rate', defaultValue: 1, isOptional: true, enable: false, min: 0, max: 1, step: 0.01, precision: 2 },
      ],
    },
    {
      id: '8',
      title: '预览',
      args: [
        { visible: true, type: 'num', id: 'sample_every_n_epochs', title: 'Sample Every N Epochs', defaultValue: 1, isOptional: true, enable: false, min: 0, max: 300, step: 1, precision: 0 },
        { visible: true, type: 'file', id: 'sample_prompts', title: 'Sample Prompts', defaultValue: '', isOptional: true, enable: false, defaultPath: 'D:\\LoraTrainData\\trains\\', filters: [{ name: 'Prompt', extensions: ['txt'] }] },
        { visible: true, type: 'combox', id: 'sample_sampler', title: 'Sample Sampler', defaultValue: 'k_euler_a', isOptional: true, enable: false, options: samplerTypes },
      ],
    },
    {
      id: '9',
      title: '噪声处理',
      args: [
        { visible: true, type: 'num', id: 'noise_offset', title: 'Noise Offset', defaultValue: 0.1, isOptional: true, enable: false, min: 0, max: 1, step: 0.001, precision: 3 },
        { visible: true, type: 'switch', id: 'noise_offset_random_strength', title: 'Noise Offset Random Strength', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'num', id: 'multires_noise_iterations', title: 'Multires Noise Iterations', defaultValue: 6, isOptional: true, enable: false, min: 0, max: 10, step: 1, precision: 0 },
        { visible: true, type: 'num', id: 'multires_noise_discount', title: 'Multires Noise Discount', defaultValue: 0.3, isOptional: true, enable: false, min: 0.1, max: 0.8, step: 0.1, precision: 1 },
        { visible: true, type: 'num', id: 'prior_loss_weight', title: 'Prior Loss Weight', defaultValue: 1, isOptional: true, enable: false, min: 0, max: 1, step: 0.01, precision: 2 },
        { visible: true, type: 'num', id: 'min_snr_gamma', title: 'Min Snr Gamma', defaultValue: 5, isOptional: true, enable: false, min: 0, max: 10, step: 1, precision: 0 },
        { visible: true, type: 'num', id: 'ip_noise_gamma', title: 'Input Perturbation Noise Gamma', defaultValue: 0.1, isOptional: true, enable: false, min: 0, max: 1, step: 0.001, precision: 3 },
        { visible: true, type: 'switch', id: 'ip_noise_gamma_random_strength', title: 'Input Perturbation Noise Gamma Random Strength', defaultValue: '', isOptional: true, enable: false },
      ],
    },
    {
      id: '10',
      title: '分层训练',
      args: [
        { visible: true, type: 'switch', id: 'network_args', title: 'Network Args', defaultValue: '', isOptional: true, enable: false },
        { visible: true, type: 'block_editor', id: 'block_dims', title: 'Block Dims', defaultValue: '0,64,64,0,64,64,0,64,64,0,0,0,64,0,0,0,64,64,64,64,64,64,64,64,64', isOptional: true, enable: false },
        { visible: true, type: 'block_editor', id: 'block_alphas', title: 'Block Alphas', defaultValue: '0,32,32,0,32,32,0,32,32,0,0,0,32,0,0,0,32,32,32,32,32,32,32,32,32', isOptional: true, enable: false },
      ],
    },
  ],
};

export { configs };
