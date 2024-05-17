import { Card, Button } from "@arco-design/web-react";
import { AppContext, deleteTemplateByName, importJson } from "../AppContext";
import { useContext } from "react";
import { lang } from "../i18n";
import { IconCheck, IconDelete } from "@arco-design/web-react/icon";

const TemplateItem = (props: any) => {
  const appContext = useContext(AppContext);
  return (
    <Card
      title={props.title}
      actions={[
        <Button
          onClick={() => {
            importJson(appContext.refMap, props.json);
          }}
          icon={<IconCheck />}
        >
          {lang("app.btn.apply")}
        </Button>,
        <Button
          onClick={() => {
            var result = deleteTemplateByName(appContext.templates, props.title);
            appContext.setTemplates(result);

            localStorage.setItem("sd-script-app_templates", JSON.stringify(result));
          }}
          status="danger"
          type="primary"
          icon={<IconDelete />}
        >
          {lang("app.btn.delete")}
        </Button>,
      ]}
    >
      <div style={{ height: "80px" }}>{props.desc}</div>
    </Card>
  );
};

export { TemplateItem };
