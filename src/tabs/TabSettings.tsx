import { useContext, useRef } from "react";
import { AppContext } from "../AppContext";
import { CmpFolder } from "../compornts/ArgumentEditor/Components";
import { CmpBaseRef } from "../compornts/ArgumentEditor/ArgComponets";
import { lang } from "../i18n";

const TabSettings = (props: any) => {
  const appContext = useContext(AppContext);
  return (
    <div>
      <CmpFolder ref={appContext.sdHomeRef} id="sd_scripts_path" title={lang('configs.sd_home_path')} defaultValue="D:\Projects\sd-scripts" isOptional={false} enable={true} defaultPath={'\\'}></CmpFolder>
    </div>
  )
};

export { TabSettings }