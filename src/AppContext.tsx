import React, { useRef } from "react";
import { CmpBaseRef } from "./compornts/ArgumentEditor/ArgComponets";

class AppContextType {
  // ref Sd-Scripts path
  sdHomeRef: React.RefObject<CmpBaseRef> | null = null;

  // refMap
  refMap: Map<string, React.RefObject<CmpBaseRef>> = new Map<string, React.RefObject<CmpBaseRef>>();

  // 历史记录
  history: any[] = [];
  setHistory: any = () => {};

  // 模板
  templates: any[] = [];
  setTemplates: any = () => {};
}

// localStorage.clear();
// 从localStorage读取历史记录
const storage_history = localStorage.getItem("sd-script-app_history");
const init_history: any[] = JSON.parse(storage_history == null ? "[]" : storage_history);

// 从localStorage读取模板
const storage_templates = localStorage.getItem("sd-script-app_templates");
const init_templates: any[] = JSON.parse(storage_templates == null ? "[]" : storage_templates);

const AppContext = React.createContext<AppContextType>({
  sdHomeRef: null,
  refMap: new Map<string, React.RefObject<CmpBaseRef>>(),
  history: init_history,
  setHistory: () => {},
  templates: init_templates,
  setTemplates: () => {},
});

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
  const sdHomeRef = useRef<CmpBaseRef>(null);
  return <AppContext.Provider value={{ sdHomeRef, refMap: new Map<string, React.RefObject<CmpBaseRef>>(), history, setHistory, templates, setTemplates }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext, AppContextType, deleteTemplateByName, importJson, exportJson };
