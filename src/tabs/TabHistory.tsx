import { Button, List } from "@arco-design/web-react";
import { useContext } from "react";
import { AppContext, AppContextType } from "../AppContext";
import { HistoryItem } from "../compornts/HistoryItem";
import { lang } from "../i18n";

const HistoryTab = (props: any) => {
  const appContext = useContext<AppContextType>(AppContext);
  const clearHistory = () => {
    appContext.setHistory([]);
    localStorage.removeItem('sd-script-app_history');
  };  
  return (
    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <Button type="primary" onClick={() => { clearHistory() }} style={{ marginBottom: '5px' }}>{lang('app.btn.clear')}</Button>
      <List>
        {appContext.history.reverse().map((item: any, index: number) => {
          return (
            <List.Item key={index}>
              <HistoryItem path={item.path} title={item.title} date={item.date} content={item.content} json={JSON.parse(item.json)}/>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export { HistoryTab };
