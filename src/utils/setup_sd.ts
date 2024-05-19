import { Command, open } from "@tauri-apps/api/shell";
import { fs, path } from "@tauri-apps/api";

const sdScriptsResp = "https://github.com/kohya-ss/sd-scripts.git";

const checkPython = async (): Promise<boolean> => {
  var py310_folder_exists = await fs.exists("C:\\Program Files\\Python310");
  return py310_folder_exists;
};
const checkGit = async (): Promise<boolean> => {
  var cmd = new Command("git", ["--version"]);
  try {
    var output = await cmd.execute();
    return true;
  } catch (e: any) {
    return false;
  }
};
const cloneSdScript = async (): Promise<boolean> => {
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
const installVirtualenv = async () => {
  var args = `/c pip install -q virtualenv`;
  console.log(args);
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", (line) => {
      console.log(line);
    });
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
}
const createVenv = async () => {
  var sd_scripts_path = (await path.appDataDir()) + "sd-scripts";
  var venv = sd_scripts_path + "\\venv";
  var args = `/c python.exe -m virtualenv ${venv}`;
  console.log(args);
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", (line) => {
      console.log(line);
    });
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
};
const installRequirement = async () => {
  var sd_scripts_path = (await path.appDataDir()) + "sd-scripts";
  var pip = sd_scripts_path + "\\venv\\Scripts\\python.exe -m pip";
  var requirements = "requirements.txt";
  var args = `/c cd ${sd_scripts_path} && ${pip} install -r ${requirements}`;
  console.log(args);
  var cmd = new Command("start cmd", args);
  try {
    cmd.stdout.on("data", (line) => {
      console.log(line);
    });
    var output = await cmd.execute();
    return output.code == 0;
  } catch (e: any) {
    return false;
  }
};
const setup = async () => {
  return await checkPython() && await checkGit() && await cloneSdScript() && await createVenv() && await installRequirement();
}

export { checkPython, checkGit, cloneSdScript, installVirtualenv, createVenv, installRequirement, setup }
