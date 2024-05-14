const HistoryItem = (props: any) => {
    return (
        <div className="history_item">
            <div className="history_item_title">{props.title}</div>
            <div className="history_item_content">{props.content}</div>
        </div>
    )
}