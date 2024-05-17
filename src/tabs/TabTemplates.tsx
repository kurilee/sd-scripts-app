import { useContext } from "react";
import { AppContext } from "../AppContext";
import { List } from "@arco-design/web-react";
import { TemplateItem } from "../compornts/TemplateItem";

const TabTemplates = (props: any) => {
  const appContext = useContext(AppContext);
  return (
    <List
      grid={{ gutter: 0, span: 8 }}
      dataSource={appContext.templates}
      bordered={false}
      render={(item, index) => (
        <List.Item key={index}>
          <TemplateItem title={item.title} desc={item.desc} json={item.json} />
        </List.Item>
      )}
    />
  );
};

export { TabTemplates };
