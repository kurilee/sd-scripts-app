import { Card } from "@arco-design/web-react";

const HistoryItem = (props: any) => {
    return (
        <Card title={props.title} >
            { props.content }
        </Card>
    )
}

export { HistoryItem }