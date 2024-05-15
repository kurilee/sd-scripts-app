import React from "react";

class AppContextType {
    public history: any[] = [];
    public setHistory: any = () => {};
}

const AppContext = React.createContext<AppContextType>({
    history: [],
    setHistory: () => {}
});

const AppProvider = ({children}: any) => {
    const [history, setHistory] = React.useState([]);
    return (
        <AppContext.Provider value={{history, setHistory}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext, AppContextType }