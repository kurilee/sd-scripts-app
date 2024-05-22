import { Button, List, Space } from "@arco-design/web-react";
import { useContext } from "react";
import { AppContext, AppContextType } from "../AppContext";
import { HistoryItem } from "../compornts/HistoryItem";
import { lang } from "../i18n";
import { IconDelete } from "@arco-design/web-react/icon";

const HistoryTab = (props: any) => {
  const appContext = useContext<AppContextType>(AppContext);
  const clearHistory = () => {
    appContext.setHistory([]);
    localStorage.removeItem("sd-script-app_history");
  };
  return (
    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <Space style={{ marginBottom: "5px" }}>
        <Button
          type="primary"
          onClick={() => {
            clearHistory();
          }}
          status="danger"
          icon={<IconDelete />}
        >
          {lang("app.btn.clear")}
        </Button>
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <List>
          {appContext.history.reverse().map((item: any, index: number) => {
            return (
              <List.Item key={index}>
                <HistoryItem
                  path={item.path}
                  title={item.title}
                  date={item.date}
                  content={item.content}
                  json={item.json}
                  folder={item.folder}
                />
              </List.Item>
            );
          })}
        </List>
      </Space>
    </div>
  );
};

export { HistoryTab };
