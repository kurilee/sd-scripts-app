import React from "react";

class AppContextType {
    // 历史记录
    public history: any[] = [];
    public setHistory: any = () => {};

    // 模板
    public templates: any[] = [];
    public setTemplates: any = () => {};
}

// localStorage.clear();
// 从localStorage读取历史记录
const storage_history = localStorage.getItem("sd-script-app_history");
const init_history: any[] = JSON.parse(storage_history == null ? "[]" : storage_history);

// todo: 从localStorage读取模板
const storage_templates = localStorage.getItem("sd-script-app_templates");
const init_templates: any[] = [];

const AppContext = React.createContext<AppContextType>({
    history: init_history,
    setHistory: () => {},
    templates: init_templates,
    setTemplates: () => {}, 
});

const AppProvider = ({children}: any) => {
    const [history, setHistory] = React.useState([...init_history]);
    const [templates, setTemplates] = React.useState([...init_templates]);
    return (
        <AppContext.Provider value={{history, setHistory, templates, setTemplates }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext, AppContextType }