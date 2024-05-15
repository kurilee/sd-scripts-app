import { List } from "@arco-design/web-react";
import { useContext } from "react";
import { AppContext, AppContextType } from "../AppContext";
import { HistoryItem } from "../compornts/HistoryItem";

const HistoryTab = (props: any) => {
    const appContext = useContext<AppContextType>(AppContext);
    return (
        <List>
            {appContext.history.map((item: any, index: number) => {
                return (
                    <List.Item key={index}>
                        <HistoryItem title={item.title} content={item.content} />
                    </List.Item>
                )
            })}
        </List>
    )
}

export { HistoryTab }