import { useContext, useRef } from "react";
import { AppContext } from "../AppContext";
import { CmpFolder } from "../compornts/ArgumentEditor/Components";
import { lang } from "../i18n";
import { Button, List, Space } from "@arco-design/web-react";
import { IconUndo, IconCheck } from "@arco-design/web-react/icon";
import { CmpBaseRef } from "../compornts/ArgumentEditor/ArgComponets";

const TabSettings = (props: any) => {
  const appContext = useContext(AppContext);
  const sdHomeRef = useRef<CmpBaseRef>(null);
  const checkpointHomeRef = useRef<CmpBaseRef>(null);
  const vaeHomeRef = useRef<CmpBaseRef>(null);
  const datasetHomeRef = useRef<CmpBaseRef>(null);
  const outputHomeRef = useRef<CmpBaseRef>(null);
  const saveSettings = () => {
    var sd_home_path = sdHomeRef?.current?.getEditorString() || "";
    appContext.setSdHomePath(sd_home_path);
    localStorage.setItem("sd-script-app_sd_home_path", sd_home_path);

    var checkpoint_path = checkpointHomeRef?.current?.getEditorString() || "";
    appContext.setCheckpointPath(checkpoint_path);
    localStorage.setItem("sd-script-app_checkpoint_path", checkpoint_path);

    var vae_path = vaeHomeRef?.current?.getEditorString() || "";
    appContext.setSdHomePath(vae_path);
    localStorage.setItem("sd-script-app_vae_path", vae_path);

    var dataset_path = datasetHomeRef?.current?.getEditorString() || "";
    appContext.setSdHomePath(dataset_path);
    localStorage.setItem("sd-script-app_dataset_path", dataset_path);

    var output_path = outputHomeRef?.current?.getEditorString() || "";
    appContext.setSdHomePath(output_path);
    localStorage.setItem("sd-script-app_output_path", output_path);
  };
  const revertSettings = () => {
    sdHomeRef?.current?.setValue(appContext.sdHomePath);
    checkpointHomeRef?.current?.setValue(appContext.checkpointPath);
    vaeHomeRef?.current?.setValue(appContext.vaePath);
    datasetHomeRef?.current?.setValue(appContext.datasetPath);
    outputHomeRef?.current?.setValue(appContext.outputPath);
  };
  return (
    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <Space style={{ marginBottom: "5px" }}>
        <Button
          onClick={() => {
            saveSettings();
          }}
          type="primary"
          icon={<IconCheck />}
        >
          {lang("app.btn.save_settings")}
        </Button>
        <Button
          onClick={() => {
            revertSettings();
          }}
          icon={<IconUndo />}
        >
          {lang("app.btn.revert_settings")}
        </Button>
      </Space>
      <List>
        <List.Item>
          <CmpFolder ref={sdHomeRef} id="sd_scripts_path" title={lang("configs.sd_home_path")} defaultValue={appContext.sdHomePath} isOptional={false} enable={true} defaultPath={appContext.sdHomePath}></CmpFolder>
          <CmpFolder ref={checkpointHomeRef} id="checkpoints_path" title={lang("configs.checkpoints_path")} defaultValue={appContext.checkpointPath} isOptional={false} enable={true} defaultPath={appContext.checkpointPath}></CmpFolder>
          <CmpFolder ref={vaeHomeRef} id="vae_path" title={lang("configs.vae_path")} defaultValue={appContext.vaePath} isOptional={false} enable={true} defaultPath={appContext.vaePath}></CmpFolder>
          <CmpFolder ref={datasetHomeRef} id="dataset_path" title={lang("configs.dataset_path")} defaultValue={appContext.datasetPath} isOptional={false} enable={true} defaultPath={appContext.datasetPath}></CmpFolder>
          <CmpFolder ref={outputHomeRef} id="output_path" title={lang("configs.output_path")} defaultValue={appContext.outputPath} isOptional={false} enable={true} defaultPath={appContext.outputPath}></CmpFolder>
          {/* <CmpFolder ref={sdHomeRef} id="sd_scripts_path" title={lang("configs.sd_home_path")} defaultValue={appContext.sdHomePath} isOptional={false} enable={true} defaultPath={appContext.sdHomePath}></CmpFolder> */}
        </List.Item>
      </List>
    </div>
  );
};

export { TabSettings };
