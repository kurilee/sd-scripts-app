import { Card, Button } from "@arco-design/web-react";
import { AppContext, deleteTemplateByName, importJson } from "../AppContext";
import { useContext } from "react";

const TemplateItem = (props: any) => {
  const appContext = useContext(AppContext);
  return (
    <Card
      title={props.title}
      style={{ width: "300px", height: "150px" }}
      actions={[
        <Button onClick={() => {
          importJson(appContext.refMap, props.json);
        }}>apply</Button>,
        <Button
          onClick={() => {
            var result = deleteTemplateByName(appContext.templates, props.title);
            appContext.setTemplates(result);

            localStorage.setItem('sd-script-app_templates', JSON.stringify(result));
          }}
        >
          delete
        </Button>,
      ]}
    >
      {props.desc}
    </Card>
  );
};

export { TemplateItem };
