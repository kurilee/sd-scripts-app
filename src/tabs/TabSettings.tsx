import { useContext, useRef } from "react";
import { AppContext } from "../AppContext";
import { CmpFolder } from "../compornts/ArgumentEditor/Components";
import { CmpBaseRef } from "../compornts/ArgumentEditor/ArgComponets";

const TabSettings = (props: any) => {
  const appContext = useContext(AppContext);
  return (
    <div>
      <CmpFolder ref={appContext.sdHomeRef} id="sd_scripts_path" title="Sd Scripts Path" defaultValue="D:\Projects\sd-scripts" isOptional={false} enable={true} defaultPath={'\\'}></CmpFolder>
    </div>
  )
};

export { TabSettings }