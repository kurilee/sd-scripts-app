function getTypStyle(isOptional: boolean, isSwitch: boolean = false) {
  var fix_style = { fontSize: 12 };
  var width_style = isSwitch ? {} : isOptional ? { width: titleWidth } : { width: fullTitleWidth };
  return { ...fix_style, ...width_style };
}

// 获取参数 字符串值 eg. "block_dim=1,1,1,1,1..."
function getArgExtra(id:string, value:string | undefined) {
  return `\"${id}=${value}\"`
}

// 获取参数 常规值 eg. --network_dim=32
function getArgValue(id:string, value:string | undefined) {
  if (value === undefined) { 
    return `--${id}`
  }
  else {
    return `--${id}=${value}`
  }
}


function getArgString(isOptional:boolean, enable:boolean, id:string, value:string | undefined, isExtra:boolean) {
  let method = isExtra ? getArgExtra : getArgValue;
  return isOptional && !enable ? '' : method(id, value);
}

// 常量属性
const titleWidth = '124px';
const fullTitleWidth = '160px';
const valueWidth = '420px';

const ComponentUtils = {
  getTypStyle,
  // getArgExtra,
  // getArgValue,
  // getArgSwitch,
  getArgString,
  titleWidth,
  fullTitleWidth,
  valueWidth,
};

// props
export interface CmpBase<T> {
  id: string;
  title: string;
  // value?: T,
  enable?: boolean;
  isOptional?: boolean;
  defaultValue?: T;
  isExtraArg?: boolean;
}

export interface CmpBaseRef {
  getArgumentString: () => string;
  getString:() => string;
}

export { ComponentUtils };
