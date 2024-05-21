import { Command, open } from "@tauri-apps/api/shell";
import { fs, path } from "@tauri-apps/api";
import { CmdContext, CmdContextObj } from "./CmdContext";

const sdScriptsResp = "https://github.com/kohya-ss/sd-scripts.git";

const checkPython = async (cmdContext: CmdContextObj): Promise<boolean> => {
  var py310_folder_exists = await fs.exists("C:\\Program Files\\Python310");
  return py310_folder_exists;
};
const checkGit = async (cmdContext: CmdContextObj): Promise<boolean> => {
  var cmd = new Command("git", ["--version"]);
  try {
    cmd.stdout.on("data", cmdContext.setOutput);
    cmd.stderr.on("data", cmdContext.setOutput);
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
    (await path.appDataDir()) + "sd-scripts",
  ]);
  try {
    cmd.stdout.on("data", cmdContext.setOutput);
    cmd.stderr.on("data", cmdContext.setOutput);
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
};
const openSdScriptFolder = async () => {
  open((await path.appDataDir()));
}
const installVirtualenv = async (cmdContext: CmdContextObj) => {
  var args = `/c pip install -q virtualenv`;
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", cmdContext.setOutput);
    cmd.stderr.on("data", cmdContext.setOutput);
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
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", cmdContext.setOutput);
    cmd.stderr.on("data", cmdContext.setOutput);
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
};
const installPytorch = async (cmdContext: CmdContextObj) => {
  return await pipInstall(cmdContext, "torch==2.1.2 torchvision==0.16.2 --index-url https://download.pytorch.org/whl/cu118");
};
const installRequirement = async (cmdContext: CmdContextObj) => {
  return await pipInstall(cmdContext, "-r requirements.txt");
};
const installXformers = async (cmdContext: CmdContextObj) => {
  return await pipInstall(cmdContext, "xformers==0.0.23.post1 --index-url https://download.pytorch.org/whl/cu118");
};
const pipInstall = async (cmdContext: CmdContextObj, installStr: string) => {
  var sd_scripts_path = (await path.appDataDir()) + "sd-scripts";
  var pip = sd_scripts_path + "\\venv\\Scripts\\python.exe -m pip";
  var args = `/c cd ${sd_scripts_path} && ${pip} install ${installStr}`;
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", cmdContext.setOutput);
    cmd.stderr.on("data", cmdContext.setOutput);
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
};
const setup = async (cmdContext: CmdContextObj) => {
  return await checkPython(cmdContext) && await checkGit(cmdContext) && await cloneSdScript(cmdContext) && await createVenv(cmdContext) && await installRequirement(cmdContext);
}

export { checkPython, checkGit, cloneSdScript, installVirtualenv, createVenv, installPytorch, installRequirement, installXformers, setup, openSdScriptFolder }
