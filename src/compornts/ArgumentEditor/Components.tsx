import { CmpFolder } from "./Folder";
import { CmpFile } from "./File";
import { CmpText } from "./Text";
import { CmpSwitch } from "./Switch";
import { CmpCombox } from "./Combox";
import { CmpNum } from "./Num";
import { BlockEditor } from "./BlockEditor";
import { CmpBaseRef } from "./ArgComponets";

// 创建组件
const createComponent = (config: any, createRefFunc: (id: string) => React.RefObject<CmpBaseRef>) => {
  if (config.visible === false) return <></>;
  switch (config.type) {
    case "combox":
      return <CmpCombox key={config.id} ref={createRefFunc(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} options={config.options}></CmpCombox>;
    case "file":
      return <CmpFile key={config.id} ref={createRefFunc(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} defaultPath={config.defaultPath} filters={config.filters}></CmpFile>;
    case "folder":
      return <CmpFolder key={config.id} ref={createRefFunc(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} defaultPath={config.defaultPath}></CmpFolder>;
    case "text":
      return <CmpText key={config.id} ref={createRefFunc(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable}></CmpText>;
    case "switch":
      return <CmpSwitch key={config.id} ref={createRefFunc(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable}></CmpSwitch>;
    case "num":
      return <CmpNum key={config.id} ref={createRefFunc(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} min={config.min} max={config.max} precision={config.precision} step={config.step}></CmpNum>;
    case "block_editor":
      return <BlockEditor key={config.id} ref={createRefFunc(config.id)} id={config.id} title={config.title} defaultValue={config.defaultValue} isOptional={config.isOptional} enable={config.enable} isExtraArg={true}></BlockEditor>;
  }
};

export { CmpFolder, CmpFile, CmpText, CmpSwitch, CmpCombox, CmpNum, BlockEditor, createComponent };
