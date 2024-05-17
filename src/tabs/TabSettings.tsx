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
  const saveSettings = () => {
    var sd_home_path = sdHomeRef?.current?.getEditorString() || "";
    appContext.setSdHomePath(sd_home_path);
    localStorage.setItem("sd-script-app_sd_home_path", sd_home_path);
  };
  const revertSettings = () => {
    sdHomeRef?.current?.setValue(appContext.sdHomePath);
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
        </List.Item>
      </List>
    </div>
  );
};

export { TabSettings };
