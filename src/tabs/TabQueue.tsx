import { Space, List, Button, Typography, Collapse } from "@arco-design/web-react";
import { TrainQueueContext, queue_map } from "../utils/TrainQueue";
import { useContext } from "react";
import { lang } from "../i18n";
import { IconDelete, IconPlayArrow, IconPlayCircleFill } from "@arco-design/web-react/icon";

const TabQueue = (props: any) => {
  const queueContext = useContext(TrainQueueContext);
  return (
    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <Space style={{ marginBottom: "5px" }}>
        <Button>{lang("app.btn.queue_start")}</Button>
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <List>
          {queueContext.queue.map((item: string) => {
            return (
              <List.Item key={item} extra={[<Button icon={<IconPlayArrow />} style={{ marginRight: '5px' }}></Button>, <Button icon={<IconDelete />}></Button>]}>
                <Typography.Text>{queue_map.get(item).title}</Typography.Text>
              </List.Item>
            );
          })}
        </List>
      </Space>
    </div>
  );
};

export { TabQueue };
