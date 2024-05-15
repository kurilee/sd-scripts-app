import "./App.css";
import { Tabs } from "@arco-design/web-react";
import { TabMain } from "./tabs/TabMain";
import { HistoryTab } from "./tabs/TabHistory";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider >
      <Tabs defaultActiveTab="1">
        <Tabs.TabPane key="1" title="Main">
          <TabMain />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="History">
          <HistoryTab />
        </Tabs.TabPane>
      </Tabs>
    </AppProvider>
  );
}

export default App;
