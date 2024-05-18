import { Button, Message, Space } from '@arco-design/web-react';
import { lang } from '../i18n';
import { fs, path } from '@tauri-apps/api';
import { Command, open } from '@tauri-apps/api/shell';

const TabSetup = (props: any) => {
  const checkPython = async (): Promise<boolean> => {
    var py310_folder_exists = await fs.exists('C:\\Program Files\\Python310');
    if (!py310_folder_exists) {
      Message.error(lang('app.setup.python_not_found'));
    }
    return true;
  };
  const checkGit = async (): Promise<boolean> => {
    var cmd = new Command('git', ['--version']);
    try {
      var output = await cmd.execute();
      Message.info(output.stdout);
      return true;
    } catch (e: any) {
      Message.error(e);
      return false;
    }
  };
  const cloneSdScript = async () => {
    var cmd = new Command('git', ['clone', 'https://github.com/kohya-ss/sd-scripts.git', (await path.appDataDir()) + '\\sd-scripts']);
    try {
      var output = await cmd.execute();
      Message.info(output.stdout);
    } catch (e: any) {
      Message.error(e);
    }
    open((await path.appDataDir()) + 'sd-scripts');
  };
  const createVenv = async () => {
    var sd_scripts_path = (await path.appDataDir()) + 'sd-scripts';
    var venv = sd_scripts_path + '\\venv';
    var args = `/c C:\\Program Files\\Python310\\python.exe -m virtualenv ${venv}`;
    console.log(args);
    var cmd = new Command('start cmd', args);
    try {
      cmd.stdout.on('data', (line) => {
        console.log(line);
      });
      var output = await cmd.execute();
      if (output.code == 0) {
        Message.info('ok');
      }
    } catch (e: any) {
      Message.error(e);
    }
  };
  const installRequirement = async () => { 
    var sd_scripts_path = (await path.appDataDir()) + 'sd-scripts';
    var pip = sd_scripts_path + '\\venv\\Scripts\\python.exe -m pip';
    var requirements = sd_scripts_path + '\\requirements.txt';
    var args = `/c cd ${sd_scripts_path} && ${pip} install -r ${requirements}`;
    var cmd = new Command('start cmd', args);
    try {
        cmd.stdout.on('data', (line) => {
          console.log(line);
        });
        var output = await cmd.execute();
        if (output.code == 0) {
          Message.info('ok');
        }
      } catch (e: any) {
        Message.error(e);
      }
  };
  return (
    <Space>
      <Button
        onClick={() => {
          checkPython();
        }}>
        {lang('app.setup.check_python')}
      </Button>
      <Button
        onClick={() => {
          checkGit();
        }}>
        {lang('app.setup.check_git')}
      </Button>
      <Button
        onClick={() => {
          cloneSdScript();
        }}>
        {lang('app.setup.clone')}
      </Button>
      <Button
        onClick={() => {
          createVenv();
        }}>
        {lang('app.setup.create_venv')}
      </Button>
      <Button
        onClick={() => {
          installRequirement();
        }}>
        {lang('app.setup.install_requirement')}
      </Button>
    </Space>
  );
};

export { TabSetup };
