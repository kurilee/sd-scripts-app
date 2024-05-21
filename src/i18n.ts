// default language
const system: any = {
  "app.train_pane": "Train",
  "app.template_pane": "Template",
  "app.history_pane": "History",
  "app.setting_pane": "Setting",
  "app.setup_pane": "Setup",

  "tab.train.script_group": "Script",
  "tab.train.script_group.script": "Script",
  "configs.sd_home_path": "Sd-Scripts Path",
  "configs.checkpoints_path": "Checkpoints Path",
  "configs.vae_path":"VAE Path",
  "configs.dataset_path": "Dataset Path",
  "configs.output_path": "Output Path",

  "configs.group.base": "Base",
  "configs.base.model": "model",
  "configs.base.vae": "vae",
  "configs.base.train_data_dir": "train_data_dir",
  "configs.base.reg_data_dir": "reg_data_dir",
  "configs.base.output_dir": "output_dir",
  "configs.base.output_name": "output_name",

  "configs.group.save&log": "Save & Log",
  "configs.save.save_model_as": "save_model_as",
  "configs.save.save_precision": "save_precision",
  "configs.save.save_every_n_epochs": "save_every_n_epochs",
  "configs.save.no_metadata": "no_metadata",
  "configs.log.log_with": "log_with",
  "configs.log.wandb_api_key": "wandb_api_key",
  "configs.log.logging_dir": "logging_dir",

  "configs.group.train": "Train",
  "configs.train.xformers": "xformers",
  "configs.train.sdpa": "sdpa",
  "configs.train.enable_bucket": "enable_bucket",
  "configs.train.cache_latents": "cache_latents",
  "configs.train.cache_latents_to_disk": "cache_latents_to_disk",
  "configs.train.cache_text_encoder_outputs": "cache_text_encoder_outputs",
  "configs.train.cache_text_encoder_outputs_to_disk": "cache_text_encoder_outputs_to_disk",
  "configs.train.persistent_data_loader_workers": "persistent_data_loader_workers",
  "configs.train.train_text_encoder_only": "train_text_encoder_only",
  "configs.train.train_unet_only": "train_unet_only",
  "configs.train.no_half_vae": "no_half_vae",
  "configs.train.mixed_precision": "mixed_precision",
  "configs.train.seed": "seed",
  "configs.train.clip_skip": "clip_skip",
  "configs.train.full_bf16": "full_bf16",
  "configs.train.full_fp16": "full_fp16",
  "configs.train.fp8_base": "fp8_base",
  "configs.train.max_data_loader_n_workers": "max_data_loader_n_workers",
  "configs.train.gradient_checkpointing": "gradient_checkpointing",

  "configs.group.network": "Network",
  "configs.network.resolution": "resolution",
  "configs.network.network_module": "network_module",
  "configs.network.network_dim": "network_dim",
  "configs.network.network_alpha": "network_alpha",
  "configs.network.dim_from_weights": "dim_from_weights",
  "configs.network.network_weights": "network_weights",
  "configs.network.network_dropout": "network_dropout",
  "configs.network.scale_weight_norms": "scale_weight_norms",

  "configs.group.learning": "Learning",
  "configs.learning.optimizer_type": "optimizer_type",
  "configs.learning.max_train_epochs": "max_train_epochs",
  "configs.learning.train_batch_size": "train_batch_size",
  "configs.learning.learning_rate": "learning_rate",
  "configs.learning.unet_lr": "unet_lr",
  "configs.learning.text_encoder_lr": "text_encoder_lr",
  "configs.learning.lr_scheduler": "lr_scheduler",
  "configs.learning.lr_warmup_steps": "lr_warmup_steps",
  "configs.learning.lr_scheduler_num_cycles": "lr_scheduler_num_cycles",

  "configs.group.loss": "Loss",
  "configs.loss.loss_type": "loss_type",
  "configs.loss.huber_schedule": "huber_schedule",
  "configs.loss.huber_c": "huber_c",

  "configs.group.data_enforce": "Data enforce",
  "configs.data_enforce.color_aug": "color_aug",
  "configs.data_enforce.flip_aug": "flip_aug",
  "configs.data_enforce.random_crop": "random_crop",

  "configs.group.tags": "Tags",
  "configs.tags.caption_extension": "caption_extension",
  "configs.tags.max_token_length": "max_token_length",
  "configs.tags.shuffle_caption": "shuffle_caption",
  "configs.tags.keep_tokens": "keep_tokens",
  "configs.tags.caption_dropout_rate": "caption_dropout_rate",

  "configs.group.preview": "Preview",
  "configs.preview.sample_every_n_epochs": "sample_every_n_epochs",
  "configs.preview.sample_prompts": "sample_prompts",
  "configs.preview.sample_sampler": "sample_sampler",

  "configs.group.noise": "Noise",
  "configs.noise.noise_offset": "noise_offset",
  "configs.noise.noise_offset_random_strength": "noise_offset_random_strength",
  "configs.noise.multires_noise_iterations": "multires_noise_iterations",
  "configs.noise.multires_noise_discount": "multires_noise_discount",
  "configs.noise.prior_loss_weight": "prior_loss_weight",
  "configs.noise.min_snr_gamma": "min_snr_gamma",
  "configs.noise.ip_noise_gamma": "ip_noise_gamma",
  "configs.noise.ip_noise_gamma_random_strength": "ip_noise_gamma_random_strength",

  "configs.group.layer": "Layer",
  "configs.layer.network_args": "network_args",
  "configs.layer.block_dims": "block_dims",
  "configs.layer.block_alphas": "block_alphas",

  "app.setup.check_python": "Check Python",
  "app.setup.check_git": "Check Git",
  "app.setup.clone": "Clone Sd-Scripts",
  "app.setup.install_virtualvenv": "Install Virtualenv",
  "app.setup.create_venv": "Create venv",
  "app.setup.install_pytorch": "Install Pytorch",
  "app.setup.install_requirement": "Install Requirement",
  "app.setup.install_xformers": "Install Xformers",
  "app.setup.open_sd_home": "Open Sd-Scripts",
  "app.setup.check_ok": "Success",
  "app.setup.check_failed": "Failed",

  "editor.btn.open_dialog": "Open",
  "editor.btn.block_editor": "Editor",

  "modal.title.block_editor": "Block Editor",
  "modal.title.save_template": "Save Template",

  "modal.form.template_name": "Template Name",
  "modal.form.template_desc": "Template Description",

  "err.template_name_not_null": "Template name is nessarry.",

  "app.btn.ok": "OK",
  "app.btn.cancel": "Cancel",
  "app.btn.preview_cmd": "Preview",
  "app.btn.run_cmd": "Run",
  "app.btn.save_template": "Save",
  "app.btn.apply": "Apply",
  "app.btn.delete": "Delete",
  "app.btn.clear": "Clear",
  "app.btn.save_settings": "Save",
  "app.btn.revert_settings": "Revert",
  "app.btn.open_console": "Console",
};

// Chinese
const cn: any = {
  "app.train_pane": "训练",
  "app.template_pane": "模板",
  "app.history_pane": "历史记录",
  "app.setting_pane": "配置",
  "app.setup_pane": "安装",

  "tab.train.script_group": "脚本",
  "tab.train.script_group.script": "训练类型",
  "configs.sd_home_path": "Sd-Scripts目录",
  "configs.checkpoints_path": "大模型默认目录",
  "configs.vae_path":"VAE默认目录",
  "configs.dataset_path": "训练集默认目录",
  "configs.output_path": "输出默认目录",

  "configs.group.base": "基本配置",
  "configs.base.model": "基础模型",
  "configs.base.vae": "VAE",
  "configs.base.train_data_dir": "训练数据",
  "configs.base.reg_data_dir": "正则数据",
  "configs.base.output_dir": "输出目录",
  "configs.base.output_name": "文件名",

  "configs.group.save&log": "保存与日志",
  "configs.save.save_model_as": "保存格式",
  "configs.save.save_precision": "保存精度",
  "configs.save.save_every_n_epochs": "每隔n周期保存",
  "configs.save.no_metadata": "不保存元数据",
  "configs.log.log_with": "日志类型",
  "configs.log.wandb_api_key": "wandb_api_key",
  "configs.log.logging_dir": "日志目录",

  "configs.group.train": "训练",
  "configs.train.xformers": "xformers",
  "configs.train.sdpa": "sdpa",
  "configs.train.enable_bucket": "启用分桶",
  "configs.train.cache_latents": "缓存隐藏层",
  "configs.train.cache_latents_to_disk": "缓存隐藏层到磁盘",
  "configs.train.cache_text_encoder_outputs": "缓存提示词编码",
  "configs.train.cache_text_encoder_outputs_to_disk": "缓存提示词编码到磁盘",
  "configs.train.persistent_data_loader_workers": "保留数据加载线程",
  "configs.train.train_text_encoder_only": "仅训练提示词特征",
  "configs.train.train_unet_only": "仅训练UNet",
  "configs.train.no_half_vae": "禁用半精度VAE",
  "configs.train.mixed_precision": "混合精度",
  "configs.train.seed": "随机种子",
  "configs.train.clip_skip": "CLIP跳过",
  "configs.train.full_bf16": "全bf16格式",
  "configs.train.full_fp16": "全fp16格式",
  "configs.train.fp8_base": "fp8格式推理",
  "configs.train.max_data_loader_n_workers": "最大数据加载线程",
  "configs.train.gradient_checkpointing": "加载模型梯度",

  "configs.group.network": "模型",
  "configs.network.resolution": "分辨率",
  "configs.network.network_module": "模型类型",
  "configs.network.network_dim": "模型Dim",
  "configs.network.network_alpha": "模型alpha",
  "configs.network.dim_from_weights": "从其他Lora加载Dim",
  "configs.network.network_weights": "从其他Lora加载权重",
  "configs.network.network_dropout": "神经元丢弃率",
  "configs.network.scale_weight_norms": "神经元泛化强度",

  "configs.group.learning": "学习过程",
  "configs.learning.optimizer_type": "优化器类型",
  "configs.learning.max_train_epochs": "训练周期",
  "configs.learning.train_batch_size": "训练批次",
  "configs.learning.learning_rate": "学习率",
  "configs.learning.unet_lr": "UNet学习率",
  "configs.learning.text_encoder_lr": "提示词编码学习率",
  "configs.learning.lr_scheduler": "学习率调度器",
  "configs.learning.lr_warmup_steps": "学习率预热步数",
  "configs.learning.lr_scheduler_num_cycles": "学习率调度器周期数",

  "configs.group.loss": "损失评估",
  "configs.loss.loss_type": "评估方法",
  "configs.loss.huber_schedule": "huber调度器",
  "configs.loss.huber_c": "huber常数",

  "configs.group.data_enforce": "数据加强",
  "configs.data_enforce.color_aug": "颜色调整",
  "configs.data_enforce.flip_aug": "反转调整",
  "configs.data_enforce.random_crop": "随机裁剪",

  "configs.group.tags": "标签",
  "configs.tags.caption_extension": "标签文件格式",
  "configs.tags.max_token_length": "最大单词数",
  "configs.tags.shuffle_caption": "打乱标签",
  "configs.tags.keep_tokens": "保留标签",
  "configs.tags.caption_dropout_rate": "标签丢弃率",

  "configs.group.preview": "预览",
  "configs.preview.sample_every_n_epochs": "每n周期预览",
  "configs.preview.sample_prompts": "预览提示词",
  "configs.preview.sample_sampler": "预览采样器",

  "configs.group.noise": "噪声",
  "configs.noise.noise_offset": "噪声偏移",
  "configs.noise.noise_offset_random_strength": "随机噪声偏移",
  "configs.noise.multires_noise_iterations": "multires_noise_iterations",
  "configs.noise.multires_noise_discount": "multires_noise_discount",
  "configs.noise.prior_loss_weight": "正则损失权重",
  "configs.noise.min_snr_gamma": "min_snr_gamma",
  "configs.noise.ip_noise_gamma": "ip_noise_gamma",
  "configs.noise.ip_noise_gamma_random_strength": "ip_noise_gamma_random_strength",

  "configs.group.layer": "分层",
  "configs.layer.network_args": "额外模型参数",
  "configs.layer.block_dims": "分层Dim",
  "configs.layer.block_alphas": "分层Alphas",

  "app.setup.check_python": "检查Python",
  "app.setup.check_git": "检查Git",
  "app.setup.clone": "拉取Sd-Scripts",
  "app.setup.install_virtualvenv": "安装Virtualenv",
  "app.setup.create_venv": "创建venv",
  "app.setup.install_pytorch": "安装Pytorch",
  "app.setup.install_requirement": "安装Requirement",
  "app.setup.install_xformers": "安装Xformers",
  "app.setup.open_sd_home": "打开Sd-Scripts",
  "app.setup.check_ok": "检查通过",
  "app.setup.check_failed": "检查失败",

  "editor.open_dialog": "浏览",
  "editor.btn.block_editor": "编辑器",

  "modal.title.block_editor": "分层编辑器",
  "modal.title.save_template": "保存到模板",

  "modal.form.template_name": "模板名称",
  "modal.form.template_desc": "模板描述",

  "err.template_name_not_null": "模板名称不能为空",

  "app.btn.ok": "确定",
  "app.btn.cancel": "取消",
  "app.btn.preview_cmd": "预览命令",
  "app.btn.run_cmd": "执行",
  "app.btn.save_template": "保存为模板",
  "app.btn.apply": "应用",
  "app.btn.delete": "删除",
  "app.btn.clear": "清空",
  "app.btn.save_settings": "保存",
  "app.btn.revert_settings": "撤销",
  "app.btn.open_console": "控制台",
};

var type = "cn";
const langs: any = { cn };

const lang = (key: string) => {
  var str = "";
  if (Object.keys(langs).find((k) => k === type)) {
    str = langs[type][key];
  }
  if (str === null || str === undefined || str === "") {
    str = system[key];
  }
  if (str === null || str === undefined || str === "") {
    return key;
  }
  return str;
};

const readFromJson = (json: string) => {
  langs["json"] = JSON.parse(json);
};

export { lang };
