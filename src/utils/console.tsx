import React, { useEffect } from "react";
import { ChildProcess } from "@tauri-apps/api/shell";

class CmdContextObj {
  output: string = "";
  setOutput: (output: string) => void = () => {};
  addOutput: (text: string) => void = () => {};
}

const CmdContext = React.createContext<CmdContextObj>(new CmdContextObj());

const CmdProvider = ({ stdout, children }: any) => {
  const [output, setOutput] = React.useState<string>("");
  const addOutput = (text: string) => {
    setOutput(output + "\r\n" + text);
  };
  return <CmdContext.Provider value={{ output, setOutput, addOutput}}>{children}</CmdContext.Provider>;
};

export { CmdContext, CmdProvider, CmdContextObj }
