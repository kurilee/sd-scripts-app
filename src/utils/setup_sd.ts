import { Command, open } from "@tauri-apps/api/shell";
import { fs, path } from "@tauri-apps/api";
import { CmdContextObj } from "./console";

const sdScriptsResp = "https://github.com/kohya-ss/sd-scripts.git";

const checkPython = async (cmdContext: CmdContextObj): Promise<boolean> => {
  var py310_folder_exists = await fs.exists("C:\\Program Files\\Python310");
  return py310_folder_exists;
};
const checkGit = async (cmdContext: CmdContextObj): Promise<boolean> => {
  var cmd = new Command("git", ["--version"]);
  try {
    var output = await cmd.execute();
    return true;
  } catch (e: any) {
    return false;
  }
};
const cloneSdScript = async (cmdContext: CmdContextObj): Promise<boolean> => {
  var cmd = new Command("git", [
    "clone",
    sdScriptsResp,
    (await path.appDataDir()) + "\\sd-scripts",
  ]);
  try {
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
};
const openSdScriptFolder = async () => {
  open((await path.appDataDir()) + "sd-scripts");
}
const installVirtualenv = async (cmdContext: CmdContextObj) => {
  var args = `/c pip install -q virtualenv`;
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", (line) => {
      cmdContext.addOutput(line);
      console.log(line);
    });
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
}
const createVenv = async (cmdContext: CmdContextObj) => {
  var sd_scripts_path = (await path.appDataDir()) + "sd-scripts";
  var venv = sd_scripts_path + "\\venv";
  var args = `/c python.exe -m virtualenv ${venv}`;
  console.log(args);
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", (line) => {
      cmdContext.addOutput(line);
      console.log(line);
    });
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
};
const installRequirement = async (cmdContext: CmdContextObj) => {
  var sd_scripts_path = (await path.appDataDir()) + "sd-scripts";
  var pip = sd_scripts_path + "\\venv\\Scripts\\python.exe -m pip";
  var requirements = "requirements.txt";
  var args = `/c cd ${sd_scripts_path} && ${pip} install -r ${requirements}`;
  console.log(args);
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", (line) => {
      cmdContext.addOutput(line);
      console.log(line);
    });
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    cmdContext.addOutput(e.message);
    return false;
  }
};
const setup = async (cmdContext: CmdContextObj) => {
  return await checkPython(cmdContext) && await checkGit(cmdContext) && await cloneSdScript(cmdContext) && await createVenv(cmdContext) && await installRequirement(cmdContext);
}

export { checkPython, checkGit, cloneSdScript, installVirtualenv, createVenv, installRequirement, setup, openSdScriptFolder }
