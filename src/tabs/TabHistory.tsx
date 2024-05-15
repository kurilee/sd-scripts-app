import { List } from "@arco-design/web-react";
import { useContext } from "react";
import { AppContext, AppContextType } from "../AppContext";
import { HistoryItem } from "../compornts/HistoryItem";

const HistoryTab = (props: any) => {
  const appContext = useContext<AppContextType>(AppContext);
  return (
    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <List>
        {appContext.history.map((item: any, index: number) => {
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
