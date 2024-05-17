import "./App.css";
import { Tabs } from "@arco-design/web-react";
import { TabTrain } from "./tabs/TabTrain";
import { HistoryTab } from "./tabs/TabHistory";
import { AppProvider } from "./AppContext";
import { TabSettings } from "./tabs/TabSettings";
import { TabTemplates } from "./tabs/TabTemplates";
import { lang } from './i18n';

function App() {
  return (
    <AppProvider>
      <Tabs defaultActiveTab="1">
        <Tabs.TabPane key="1" title={lang('app.train_pane')}>
          <TabTrain />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title={lang('app.template_pane')}>
          <TabTemplates />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title={lang('app.history_pane')} icon>
          <HistoryTab />
        </Tabs.TabPane>
        <Tabs.TabPane key="4" title={lang('app.setting_pane')}>
          <TabSettings />
        </Tabs.TabPane>
      </Tabs>
    </AppProvider>
  );
}

export default App;
