import { Card } from "@arco-design/web-react";

const TemplateItem = (props: any) => {
    return (
        <Card title={props.title} >
            { props.desc }
        </Card>
    );
}