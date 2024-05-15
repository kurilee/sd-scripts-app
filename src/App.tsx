import "./App.css";
import { Tabs } from "@arco-design/web-react";
import { TabMain } from "./tabs/TabNetwork";
import { HistoryTab } from "./tabs/TabHistory";
import { AppProvider } from "./AppContext";
import { TabSettings } from "./tabs/TabSettings";
import { TabTemplates } from "./tabs/TabTemplates";

function App() {
  return (
    <AppProvider>
      <Tabs defaultActiveTab="1">
        <Tabs.TabPane key="1" title="Network">
          <TabMain />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="Templates">
          <TabTemplates />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title="History">
          <HistoryTab />
        </Tabs.TabPane>
        <Tabs.TabPane key="4" title="Settings">
          <TabSettings />
        </Tabs.TabPane>
      </Tabs>
    </AppProvider>
  );
}

export default App;
