// default language
const system: any = {
    "app.train_pane": "Train",
    "app.template_pane": "Template",
    "app.history_pane": "History",
    "app.setting_pane": "Setting",

    "configs.group.base": "Base",
    "configs.base.model": "Base Model",
    "configs.base.vae": "VAE",
    "configs.base.train_data_dir": "Train Data Dir",
    "configs.base.reg_data_dir": "Regex Data Dir",
    "configs.base.output_dir": "Output Dir",
    "configs.base.output_name": "Output Name",

    "tab.train.script_group": "Script",
    "tab.train.script_group.script": "Script",

    "editor.open_dialog": "Open",
}

// Chinese
const cn: any = {
    "app.train_pane": "训练",
    "app.template_pane": "模板",
    "app.history_pane": "历史记录",
    "app.setting_pane": "配置",

    "configs.group.base": "基本配置",
    "configs.base.model": "基础模型",
    "configs.base.vae": "VAE",
    "configs.base.train_data_dir": "训练数据",
    "configs.base.reg_data_dir": "正则数据",
    "configs.base.output_dir": "输出目录",
    "configs.base.output_name": "文件名",

    "tab.train.script_group": "脚本",
    "tab.train.script_group.script": "训练类型",

    "editor.open_dialog": "浏览",
}

var type = 'cn';
const langs: any = { cn }

const lang = (key: string) => {
    var str = langs[type][key];
    if (str === null || str === undefined)
    {
        str = system[key];
    }
    if (str === null || str === undefined)
    {
        return key;
    }
    return str;
}

const readFromJson = (json: string) => {
    langs['json'] = JSON.parse(json);
}

export { lang }