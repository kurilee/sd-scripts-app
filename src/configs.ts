import { lang } from "./i18n";

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
const loseTypes = ["l2", "huber", "smooth_l1"];
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
      id: "configs.group.base",
      title: lang("configs.group.base"),
      args: [
        { visible: true, type: "file", id: "pretrained_model_name_or_path", title: lang("configs.base.model"), defaultValue: "", isOptional: false, enable: true, filters: [{ name: "Checkpoint", extensions: ["safetensors", "ckpt", "pt"] }], defaultPath: "D:\\Projects\\stable-diffusion-webui\\models\\Stable-diffusion\\" },
        { visible: true, type: "file", id: "vae", title: lang("configs.base.vae"), defaultValue: "", isOptional: true, enable: false, filters: [{ name: "VAE", extensions: ["safetensors", "ckpt", "pt"] }], defaultPath: "D:\\Projects\\stable-diffusion-webui\\models\\VAE\\" },
        { visible: true, type: "folder", id: "train_data_dir", title: lang("configs.base.train_data_dir"), defaultValue: "", isOptional: false, enable: true, defaultPath: "D:\\LoraTrainData\\trains\\" },
        { visible: true, type: "folder", id: "reg_data_dir", title: lang("configs.base.reg_data_dir"), defaultValue: "", isOptional: true, enable: false, defaultPath: "D:\\LoraTrainData\\trains\\" },
        { visible: true, type: "folder", id: "output_dir", title: lang("configs.base.output_dir"), defaultValue: "", isOptional: false, enable: true, defaultPath: "D:\\Projects\\stable-diffusion-webui\\models\\Lora\\自训练" },
        { visible: true, type: "text", id: "output_name", title: lang("configs.base.output_name"), defaultValue: "", isOptional: false, enable: true },
      ],
    },
    {
      id: "2",
      title: lang("configs.group.save&log"),
      args: [
        { visible: true, type: "text", id: "save_model_as", title: lang("configs.save.save_model_as"), defaultValue: "safetensors", isOptional: false, enable: true },
        { visible: true, type: "combox", id: "save_precision", title: lang("configs.save.save_precision"), defaultValue: "fp16", isOptional: false, enable: true, options: fomats },
        { visible: true, type: "num", id: "save_every_n_epochs", title: lang("configs.save.save_every_n_epochs"), defaultValue: 1, isOptional: true, enable: false, min: 1, max: 30, step: 1, precision: 0 },
        { visible: true, type: "switch", id: "no_metadata", title: lang("configs.save.no_metadata"), defaultValue: "", isOptional: true, enable: true },
        { visible: true, type: "combox", id: "log_with", title: lang("configs.log.log_with"), defaultValue: "wandb", isOptional: true, enable: false, options: logwithOptions },
        { visible: true, type: "text", id: "wandb_api_key", title: lang("configs.log.wandb_api_key"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "folder", id: "logging_dir", title: lang("configs.log.logging_dir"), defaultValue: "", isOptional: true, enable: false, defaultPath: "D:\\LoraTrainData\\output\\" },
      ],
    },
    {
      id: "3",
      title: lang("configs.group.train"),
      args: [
        { visible: true, type: "switch", id: "xformers", title: lang("configs.train.xformers"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "sdpa", title: lang("configs.train.sdpa"), defaultValue: "", isOptional: true, enable: true },
        { visible: true, type: "switch", id: "enable_bucket", title: lang("configs.train.enable_bucket"), defaultValue: "", isOptional: true, enable: true },
        { visible: true, type: "switch", id: "cache_latents", title: lang("configs.train.cache_latents"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "cache_latents_to_disk", title: lang("configs.train.cache_latents_to_disk"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "cache_text_encoder_outputs", title: lang("configs.train.cache_text_encoder_outputs"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "cache_text_encoder_outputs_to_disk", title: lang("configs.train.cache_text_encoder_outputs_to_disk"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "persistent_data_loader_workers", title: lang("configs.train.persistent_data_loader_workers"), defaultValue: "", isOptional: true, enable: true },
        { visible: true, type: "switch", id: "network_train_text_encoder_only", title: lang("configs.train.train_text_encoder_only"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "network_train_unet_only", title: lang("configs.train.train_unet_only"), defaultValue: "", isOptional: true, enable: true },
        { visible: true, type: "switch", id: "no_half_vae", title: lang("configs.train.no_half_vae"), defaultValue: "", isOptional: true, enable: true },
        { visible: true, type: "combox", id: "mixed_precision", title: lang("configs.train.mixed_precision"), defaultValue: "fp16", isOptional: false, enable: true, options: fomats },
        { visible: true, type: "text", id: "seed", title: lang("configs.train.seed"), defaultValue: randInt(1, 10000).toString(), isOptional: true, enable: false },
        { visible: true, type: "num", id: "clip_skip", title: lang("configs.train.clip_skip"), defaultValue: 2, isOptional: false, enable: true, min: 0, max: 10, step: 1, precision: 0 },
        { visible: true, type: "switch", id: "full_bf16", title: lang("configs.train.full_bf16"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "full_fp16", title: lang("configs.train.full_fp16"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "fp8_base", title: lang("configs.train.fp8_base"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "text", id: "max_data_loader_n_workers", title: lang("configs.train.max_data_loader_n_workers"), defaultValue: "0", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "gradient_checkpointing", title: lang("configs.train.gradient_checkpointing"), defaultValue: "", isOptional: true, enable: false },
      ],
    },
    {
      id: "4",
      title: lang("configs.group.network"),
      args: [
        { visible: true, type: "text", id: "resolution", title: lang("configs.network.resolution"), defaultValue: "512,512", isOptional: false, enable: true },
        { visible: true, type: "combox", id: "network_module", title: lang("configs.network.network_module"), defaultValue: loraType[0], isOptional: false, enable: true, options: loraType },
        { visible: true, type: "num", id: "network_dim", title: lang("configs.network.network_dim"), defaultValue: 32, isOptional: false, enable: true, min: 1, max: 128, step: 1, precision: 0 },
        { visible: true, type: "num", id: "network_alpha", title: lang("configs.network.network_alpha"), defaultValue: 16, isOptional: false, enable: true, min: 1, max: 128, step: 1, precision: 0 },
        { visible: true, type: "switch", id: "dim_from_weights", title: lang("configs.network.dim_from_weights"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "file", id: "network_weights", title: lang("configs.network.network_weights"), defaultValue: "", isOptional: true, enable: false, defaultPath: "D:\\LoraTrainData\\output\\", filters: [{ name: "Checkpoint", extensions: ["safetensors", "ckpt", "pt"] }] },
        { visible: true, type: "num", id: "network_dropout", title: lang("configs.network.network_dropout"), defaultValue: 0.1, isOptional: true, enable: false, min: 0.001, max: 0.5, step: 0.001, precision: 3 },
        { visible: true, type: "num", id: "scale_weight_norms", title: lang("configs.network.scale_weight_norms"), defaultValue: 1.0, isOptional: true, enable: false, min: 0.01, max: 2.0, step: 0.01, precision: 2 },
      ],
    },
    {
      id: "5",
      title: lang("configs.group.learning"),
      args: [
        { visible: true, type: "combox", id: "optimizer_type", title: lang("configs.learning.optimizer_type"), defaultValue: "Prodigy", isOptional: false, enable: true, options: optTypes },
        { visible: true, type: "num", id: "max_train_epochs", title: lang("configs.learning.max_train_epochs"), defaultValue: 10, isOptional: false, enable: true, min: 1, max: 1000, step: 1, precision: 0 },
        { visible: true, type: "num", id: "train_batch_size", title: lang("configs.learning.train_batch_size"), defaultValue: 1, isOptional: false, enable: true, min: 1, max: 5, step: 1, precision: 0 },
        { visible: true, type: "num", id: "learning_rate", title: lang("configs.learning.learning_rate"), defaultValue: 1.0, isOptional: false, enable: true, min: 0.00001, max: 1.0, step: 0.00001, precision: 5 },
        { visible: true, type: "num", id: "unet_lr", title: lang("configs.learning.unet_lr"), defaultValue: 1.0, isOptional: true, enable: false, min: 0.00001, max: 1.0, step: 0.00001, precision: 5 },
        { visible: true, type: "num", id: "text_encoder_lr", title: lang("configs.learning.text_encoder_lr"), defaultValue: 1.0, isOptional: true, enable: false, min: 0.00001, max: 1.0, step: 0.00001, precision: 5 },
        { visible: true, type: "combox", id: "lr_scheduler", title: lang("configs.learning.lr_scheduler"), defaultValue: "constant", isOptional: true, enable: false, options: lrSchedulers },
        { visible: true, type: "num", id: "lr_warmup_steps", title: lang("configs.learning.lr_warmup_steps"), defaultValue: 1, isOptional: true, enable: false, min: 1, max: 10000, step: 1, precision: 0 },
        { visible: true, type: "num", id: "lr_scheduler_num_cycles", title: lang("configs.learning.lr_scheduler_num_cycles"), defaultValue: 4, isOptional: true, enable: false, min: 1, max: 30, step: 1, precision: 0 },
      ],
    },
    {
      id: "6",
      title: lang("configs.group.loss"),
      args: [
        { visible: true, type: "combox", id: "loss_type", title: lang("configs.loss.loss_type"), defaultValue: "huber", isOptional: true, enable: false, options: loseTypes },
        { visible: true, type: "combox", id: "huber_schedule", title: lang("configs.loss.huber_schedule"), defaultValue: "snr", isOptional: true, enable: false, options: huberSchedules },
        { visible: true, type: "num", id: "huber_c", title: lang("configs.loss.huber_c"), defaultValue: 0.1, isOptional: true, enable: false, min: 0.0, max: 1.0, step: 0.1, precision: 1 },
      ],
    },
    {
      id: "71",
      title: lang("configs.group.data_enforce"),
      args: [
        { visible: true, type: "switch", id: "color_aug", title: lang("configs.data_enforce.color_aug"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "flip_aug", title: lang("configs.data_enforce.flip_aug"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "switch", id: "random_crop", title: lang("configs.data_enforce.random_crop"), defaultValue: "", isOptional: true, enable: false },
      ],
    },
    {
      id: "7",
      title: lang("configs.group.tags"),
      args: [
        { visible: true, type: "text", id: "caption_extension", title: lang("configs.tags.caption_extension"), defaultValue: ".txt", isOptional: false, enable: false },
        { visible: true, type: "num", id: "max_token_length", title: lang("configs.tags.max_token_length"), defaultValue: 225, isOptional: false, enable: false, min: 75, max: 225, step: 1, precision: 0 },
        { visible: true, type: "switch", id: "shuffle_caption", title: lang("configs.tags.shuffle_caption"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "num", id: "keep_tokens", title: lang("configs.tags.keep_tokens"), defaultValue: 1, isOptional: true, enable: false, min: 1, max: 225, step: 1, precision: 0 },
        { visible: true, type: "num", id: "caption_dropout_rate", title: lang("configs.tags.caption_dropout_rate"), defaultValue: 1, isOptional: true, enable: false, min: 0, max: 1, step: 0.01, precision: 2 },
      ],
    },
    {
      id: "8",
      title: lang("configs.group.preview"),
      args: [
        { visible: true, type: "num", id: "sample_every_n_epochs", title: lang("configs.preview.sample_every_n_epochs"), defaultValue: 1, isOptional: true, enable: false, min: 0, max: 300, step: 1, precision: 0 },
        { visible: true, type: "file", id: "sample_prompts", title: lang("configs.preview.sample_prompts"), defaultValue: "", isOptional: true, enable: false, defaultPath: "D:\\LoraTrainData\\trains\\", filters: [{ name: "Prompt", extensions: ["txt"] }] },
        { visible: true, type: "combox", id: "sample_sampler", title: lang("configs.preview.sample_sampler"), defaultValue: "k_euler_a", isOptional: true, enable: false, options: samplerTypes },
      ],
    },
    {
      id: "9",
      title: lang("configs.group.noise"),
      args: [
        { visible: true, type: "num", id: "noise_offset", title: lang("configs.noise.noise_offset"), defaultValue: 0.1, isOptional: true, enable: false, min: 0, max: 1, step: 0.001, precision: 3 },
        { visible: true, type: "switch", id: "noise_offset_random_strength", title: lang("configs.noise.noise_offset_random_strength"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "num", id: "multires_noise_iterations", title: lang("configs.noise.multires_noise_iterations"), defaultValue: 6, isOptional: true, enable: false, min: 0, max: 10, step: 1, precision: 0 },
        { visible: true, type: "num", id: "multires_noise_discount", title: lang("configs.noise.multires_noise_discount"), defaultValue: 0.3, isOptional: true, enable: false, min: 0.1, max: 0.8, step: 0.1, precision: 1 },
        { visible: true, type: "num", id: "prior_loss_weight", title: lang("configs.noise.prior_loss_weight"), defaultValue: 1, isOptional: true, enable: false, min: 0, max: 1, step: 0.01, precision: 2 },
        { visible: true, type: "num", id: "min_snr_gamma", title: lang("configs.noise.min_snr_gamma"), defaultValue: 5, isOptional: true, enable: false, min: 0, max: 10, step: 1, precision: 0 },
        { visible: true, type: "num", id: "ip_noise_gamma", title: lang("configs.noise.ip_noise_gamma"), defaultValue: 0.1, isOptional: true, enable: false, min: 0, max: 1, step: 0.001, precision: 3 },
        { visible: true, type: "switch", id: "ip_noise_gamma_random_strength", title: lang("configs.noise.ip_noise_gamma_random_strength"), defaultValue: "", isOptional: true, enable: false },
      ],
    },
    {
      id: "10",
      title: lang("configs.group.layer"),
      args: [
        { visible: true, type: "switch", id: "network_args", title: lang("configs.layer.network_args"), defaultValue: "", isOptional: true, enable: false },
        { visible: true, type: "block_editor", id: "block_dims", title: lang("configs.layer.block_dims"), defaultValue: "0,64,64,0,64,64,0,64,64,0,0,0,64,0,0,0,64,64,64,64,64,64,64,64,64", isOptional: true, enable: false },
        { visible: true, type: "block_editor", id: "block_alphas", title: lang("configs.layer.block_alphas"), defaultValue: "0,32,32,0,32,32,0,32,32,0,0,0,32,0,0,0,32,32,32,32,32,32,32,32,32", isOptional: true, enable: false },
      ],
    },
  ],
};

export { configs };
