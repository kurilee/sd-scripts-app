import { Space, List, Button, Typography, Collapse } from "@arco-design/web-react";
import { TrainQueueContext, queue_map, removeFromQueue } from "../utils/TrainQueue";
import { useContext } from "react";
import { lang } from "../i18n";
import { IconDelete, IconPlayArrow } from "@arco-design/web-react/icon";
import { AppContext } from "../AppContext";
import { Command } from "@tauri-apps/api/shell";
import { CmdContext } from "../utils/CmdContext";

const TabQueue = (props: any) => {
  const queueContext = useContext(TrainQueueContext);
  const appContext = useContext(AppContext);
  const cmdContext = useContext(CmdContext);
  const onPlayClicked = async (key: string) => {
    await executeOne(key);
  };
  const onDelClicked = (key: string) => {
    removeFromQueue(queueContext, key);
  };
  const onStartQueue = () => {
    var keys = [...queue_map.keys()];
    keys.map(async (key) => {
      await executeOne(key);
    });
  };
  const executeOne = async (key: string) => {
    var obj = queue_map.get(key);
    var copyHistory = [...appContext.history, obj];
    appContext.setHistory(copyHistory);

    var json_result = JSON.stringify(copyHistory);
    localStorage.setItem("sd-script-app_history", json_result);

    var args = `cmd /c ${obj.content}`;
    console.log(args);
    var cmd = new Command("start cmd", args);
    cmd.stdout.on("data", cmdContext.setOutput);
    cmd.stderr.on("data", cmdContext.setOutput);
    try {
      var output = await cmd.execute();
    }
    catch (err) {
      console.log('err', {err});
    }

    removeFromQueue(queueContext, key);
  };
  return (
    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
      <Space style={{ marginBottom: "5px" }}>
        <Button
          onClick={() => {
            onStartQueue();
          }}
        >
          {lang("app.btn.queue_start")}
        </Button>
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <List>
          {queueContext.queue.map((item: string) => {
            return (
              <List.Item
                key={item}
                extra={[
                  <Button
                    icon={<IconPlayArrow />}
                    style={{ marginRight: "5px" }}
                    onClick={async () => {
                      await onPlayClicked(item);
                    }}
                  />,
                  <Button
                    icon={<IconDelete />}
                    onClick={() => {
                      onDelClicked(item);
                    }}
                  />,
                ]}
              >
                <Typography.Text key={item}>{queue_map.get(item).title}</Typography.Text>
              </List.Item>
            );
          })}
        </List>
      </Space>
    </div>
  );
};

export { TabQueue };
