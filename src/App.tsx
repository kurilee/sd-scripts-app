import "./App.css";
import {
  Button,
  Drawer,
  Tabs,
  Input,
  Typography,
  Space,
} from "@arco-design/web-react";
import { TabTrain } from "./tabs/TabTrain";
import { HistoryTab } from "./tabs/TabHistory";
import { AppProvider } from "./AppContext";
import { TabSettings } from "./tabs/TabSettings";
import { TabTemplates } from "./tabs/TabTemplates";
import { lang } from "./i18n";
import { TabSetup } from "./tabs/TabSetup";
import { useContext, useState } from "react";
import { CmdContext, CmdProvider } from "./utils/CmdContext";
import { TrainQueueProvider } from "./utils/TrainQueue";
import { TabQueue } from "./tabs/TabQueue";

function App() {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  return (
    <AppProvider>
      <CmdProvider>
        <TrainQueueProvider>
          <Tabs
            defaultActiveTab="1"
            extra={
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => {
                  setDrawerVisible(!drawerVisible);
                }}
              >
                {lang("app.btn.open_console")}
              </Button>
            }
          >
            <Tabs.TabPane key="1" title={lang("app.train_pane")}>
              <TabTrain />
            </Tabs.TabPane>
            <Tabs.TabPane key="1.1" title={lang("app.queue_pane")}>
              <TabQueue />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" title={lang("app.template_pane")}>
              <TabTemplates />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" title={lang("app.history_pane")}>
              <HistoryTab />
            </Tabs.TabPane>
            <Tabs.TabPane key="4" title={lang("app.setting_pane")}>
              <TabSettings />
            </Tabs.TabPane>
            <Tabs.TabPane key="5" title={lang("app.setup_pane")}>
              <TabSetup />
            </Tabs.TabPane>
          </Tabs>
          <Drawer
            title={<span>Basic Information </span>}
            visible={drawerVisible}
            placement="bottom"
            onOk={() => {
              setDrawerVisible(false);
            }}
            onCancel={() => {
              setDrawerVisible(false);
            }}
          >
            <Console />
          </Drawer>
        </TrainQueueProvider>
      </CmdProvider>
    </AppProvider>
  );
}

const Console = (props: any) => {
  const cmdContext = useContext(CmdContext);
  return <Space direction="vertical">{cmdContext.output}</Space>;
};

export default App;
