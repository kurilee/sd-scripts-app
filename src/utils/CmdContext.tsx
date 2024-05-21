import React from 'react';

class CmdContextObj {
  output: string[] = [];
  setOutput: (output: string[]) => void = () => {};
  addOutput: (text: string) => void = () => {};
}

const CmdContext = React.createContext<CmdContextObj>(new CmdContextObj());

const CmdProvider = ({ children }: any) => {
  const [output, setOutput] = React.useState<string[]>([]);
  const addOutput = (text: string) => {
    console.log(text);
    setOutput([...output, text])
  };
  return <CmdContext.Provider value={{ output, setOutput, addOutput }}>{children}</CmdContext.Provider>;
};

export { CmdContext, CmdProvider, CmdContextObj };
