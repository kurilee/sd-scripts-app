import { Card } from '@arco-design/web-react';

const TemplateItem = (props: any) => {
  return <Card title={props.title} style={{ width: '150px', height: '150px' }}>{props.desc}</Card>;
};

export { TemplateItem };
