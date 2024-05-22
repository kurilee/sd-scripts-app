import { Space, List, Button} from "@arco-design/web-react";
import { TrainQueueContext, queue_map } from "../utils/TrainQueue";
import { useContext } from "react";
import { lang } from "../i18n";

const TabQueue = (props: any) => {
  const queueContext = useContext(TrainQueueContext);
  return (
    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <Space style={{ marginBottom: "5px" }}>
        <Button>{lang('app.queue.start')}</Button>
      </Space>
      <Space direction="vertical" style={{ width: '100%' }}>
        <List>
          {queueContext.queue.map((item: string) => {
            return (
              <List.Item key={item} actions={[<Button>{lang('app.btn.del')}</Button>]}>{queue_map.get(item).title} {queue_map.get(item).content}</List.Item>
            );
          })}
        </List>
      </Space>
    </div>
  );
};

export { TabQueue };
