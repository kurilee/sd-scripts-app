import { useContext } from "react"
import { AppContext } from "../AppContext"
import { Space } from "@arco-design/web-react";
import { TemplateItem } from "../compornts/TemplateItem";

const TabTemplates = (props: any) => {
    const appContext = useContext(AppContext);
    return (
    <Space size="large" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
        {
            appContext.templates.map((item: any, index: number) => {
                return (
                    <TemplateItem key={index} title={item.title} desc={item.desc} />
                );
            })
        }
    </Space>)
}

export { TabTemplates }