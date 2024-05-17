import React, { useRef } from "react";
import { CmpBaseRef } from "./compornts/ArgumentEditor/ArgComponets";

class AppContextType {
  // settings default path
  sdHomePath: string = "";
  setSdHomePath: any = () => {};

  checkpointPath: string = "";
  setCheckpointPath: any = () => {};

  vaePath: string = "";
  setVaePath: any = () => {};

  datasetPath: string = "";
  setDatasetPath: any = () => {};

  outputPath: string = "";
  setOutputPath: any = () => {};

  // args ref
  refMap: Map<string, React.RefObject<CmpBaseRef>> = new Map<string, React.RefObject<CmpBaseRef>>();

  // histories
  history: any[] = [];
  setHistory: any = () => {};

  // templates
  templates: any[] = [];
  setTemplates: any = () => {};
}

// read histories from localStorage
const storage_history = localStorage.getItem("sd-script-app_history");
const init_history: any[] = JSON.parse(storage_history == null ? "[]" : storage_history);

// read templates from localStorage
const storage_templates = localStorage.getItem("sd-script-app_templates");
const init_templates: any[] = JSON.parse(storage_templates == null ? "[]" : storage_templates);

const AppContext = React.createContext<AppContextType>(new AppContextType());

const deleteTemplateByName = (templates: any[], name: string) => {
  return [...templates.filter((item: any) => item.title !== name)];
};

// 导出json
const exportJson = (refMap: Map<string, React.RefObject<CmpBaseRef>>): string => {
  var result: any = {};
  refMap.forEach((ref, key) => {
    result[key] = { enable: ref.current?.getEnable(), value: ref.current?.getEditorString().trim() };
  });
  return JSON.stringify(result);
};

// 导入json
const importJson = (refMap: Map<string, React.RefObject<CmpBaseRef>>, json: string) => {
  var result: any = JSON.parse(json);
  refMap.forEach((ref, key) => {
    var enable = result[key]["enable"];
    var value = result[key]["value"];
    ref.current?.setEnable(enable);
    ref.current?.setValue(value);
  });
};

const AppProvider = ({ children }: any) => {
  const [history, setHistory] = React.useState([...init_history]);
  const [templates, setTemplates] = React.useState([...init_templates]);
  const [sdHomePath, setSdHomePath] = React.useState(localStorage.getItem("sd-script-app_sd_home_path") || "");
  const [checkpointPath, setCheckpointPath] = React.useState(localStorage.getItem("sd-script-app_checkpoint_path") || "");
  const [vaePath, setVaePath] = React.useState(localStorage.getItem("sd-script-app_vae_path") || "");
  const [datasetPath, setDatasetPath] = React.useState(localStorage.getItem("sd-script-app_dataset_path") || "");
  const [outputPath, setOutputPath] = React.useState(localStorage.getItem("sd-script-app_output_path") || "");
  return (
    <AppContext.Provider
      value={{
        sdHomePath,
        setSdHomePath,
        checkpointPath,
        setCheckpointPath,
        vaePath,
        setVaePath,   
        datasetPath,
        setDatasetPath,  
        outputPath,
        setOutputPath,
        refMap: new Map<string, React.RefObject<CmpBaseRef>>(),
        history,
        setHistory,
        templates,
        setTemplates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext, AppContextType, deleteTemplateByName, importJson, exportJson };
