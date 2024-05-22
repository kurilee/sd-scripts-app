import React from 'react';

const queue_map = new Map<string, any>();
const addToQueue = (context: TrainQueueObj, key: string, cmd: any) => {
    queue_map.set(key, cmd);
    context.setQueue([...queue_map.keys()]);
}
const removeFromQueue = (context: TrainQueueObj, key: string) => {
    queue_map.delete(key);
    context.setQueue([...queue_map.keys()]);
}

class TrainQueueObj {
    queue: string[] = [];
    setQueue:any = () => {};
}

const TrainQueueContext = React.createContext<TrainQueueObj>(new TrainQueueObj());

const TrainQueueProvider = ({ children }: any) => {
    const [queue, setQueue] = React.useState([]);
    return (
        <TrainQueueContext.Provider value={{queue, setQueue}}>
            { children }
        </TrainQueueContext.Provider>
    )
}

export { TrainQueueObj, TrainQueueContext, TrainQueueProvider }