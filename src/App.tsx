import "./App.css";
import { Tabs } from "@arco-design/web-react";
import { TabMain } from "./tabs/TabMain";
import { HistoryTab } from "./tabs/TabHistory";

function App() {
  return (
    <Tabs defaultActiveTab="1">
      <Tabs.TabPane key="1" title="Main">
        <TabMain />
      </Tabs.TabPane>
      <Tabs.TabPane key="2" title="History">
        <HistoryTab />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default App;
