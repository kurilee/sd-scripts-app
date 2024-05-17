import { Card, Tag, Space, Link, Button, Message } from "@arco-design/web-react";
import { IconCheck, IconCopy } from "@arco-design/web-react/icon";
import dayjs from "dayjs";
import { AppContext, importJson } from "../AppContext";
import { useContext, useState } from "react";
import { lang } from "../i18n";
import { open } from "@tauri-apps/api/shell";
import { clipboard } from "@tauri-apps/api";

const HistoryItem = (props: any) => {
  const appContext = useContext(AppContext);
  const [jsonObj, setJsonObj] = useState<any>(JSON.parse(props.json));
  const openPath = (): void => {
    open(props.folder);
  };
  const copyPath = (): void => {
    clipboard.writeText(props.path);
    Message.success(`已复制 ${props.path}`);
  }
  return (
    <Card
      title={`${dayjs(props.date).format("YYYY-MM-DD hh:mm:ss")}  ${props.title}`}
      extra={
        <>
        <Link
          onClick={() => {
            openPath();
          }}
        >
          {props.path}
        </Link>
        <Button
          onClick={() => {
            copyPath();
          }}
          icon={<IconCopy />}
          type="text"
        ></Button>
        </>
      }
      actions={[
        <Button
          onClick={() => {
            importJson(appContext.refMap, props.json);
          }}
          icon={<IconCheck />}
        >
          {lang("app.btn.apply")}
        </Button>,
      ]}
    >
      <Space wrap={true}>
        {Object.keys(jsonObj)
          .filter((key: string) => {
            return jsonObj[key]["enable"] === true;
          })
          .map((key: string, index: number) => {
            return (
              <Tag key={index} color="blue">
                {key}: {jsonObj[key]["value"]}
              </Tag>
            );
          })}
      </Space>
    </Card>
  );
};

export { HistoryItem };
