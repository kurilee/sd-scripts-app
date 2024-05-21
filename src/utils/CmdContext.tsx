import React from 'react';

class CmdContextObj {
  output: string = "";
  setOutput: (output: string) => void = () => {};
}

const CmdContext = React.createContext<CmdContextObj>(new CmdContextObj());

const CmdProvider = ({ children }: any) => {
  const [output, setOutput] = React.useState<string>("");
  return <CmdContext.Provider value={{ output, setOutput }}>{children}</CmdContext.Provider>;
};

export { CmdContext, CmdProvider, CmdContextObj };
