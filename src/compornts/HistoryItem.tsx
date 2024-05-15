import { Card, Tag, Space, Link } from "@arco-design/web-react";

const HistoryItem = (props: any) => {
  const openPath = ():void => {
    // todo: tauri api open file explore 
  }
  return (
    <Card title={`${props.date.toLocaleString()}  ${props.title}`} extra={<Link onClick={() => { openPath() }}>{props.path}</Link>}>
      <Space wrap={true}>
        {Object.keys(props.json)
          .filter((key: string) => {
            return props.json[key]["enable"] === true;
          })
          .map((key: string, index: number) => {
            return (
              <Tag key={index} color="blue">
                {key}: {props.json[key]["value"]}
              </Tag>
            );
          })}
      </Space>
    </Card>
  );
};

export { HistoryItem };
