import { Button, Message, Space } from '@arco-design/web-react';
import { lang } from '../i18n';
import { checkGit, checkPython, cloneSdScript, installVirtualenv, createVenv, installPytorch, installRequirement, installXformers, openSdScriptFolder } from '../utils/setup_sd';
import { useContext } from 'react';
import { CmdContext, CmdContextObj } from '../utils/CmdContext';

const TabSetup = (props: any) => {
  const cmdContext = useContext(CmdContext);
  const checkAndInfo = async (checkFun: (cmdContext: CmdContextObj) => Promise<boolean>) => {
    Message.info(await checkFun(cmdContext) ? lang('app.setup.check_ok') : lang('app.setup.check_failed'));
  }
  return (
    <Space style={{ paddingLeft: '5px', paddingRight: '5px' }}>
      <Button
        onClick={async () => {
          await checkAndInfo(checkPython);
        }}>
        {lang('app.setup.check_python')}
      </Button>
      <Button
        onClick={async () => {
          await checkAndInfo(checkGit);
        }}>
        {lang('app.setup.check_git')}
      </Button>
      <Button
        onClick={async () => {
          await checkAndInfo(cloneSdScript);
        }}>
        {lang('app.setup.clone')}
      </Button>
      <Button
        onClick={async () => {
          await checkAndInfo(installVirtualenv);
        }}>
        {lang('app.setup.install_virtualvenv')}
      </Button>
      <Button
        onClick={async () => {
          await checkAndInfo(createVenv);
        }}>
        {lang('app.setup.create_venv')}
      </Button>
      <Button
        onClick={async () => {
          await checkAndInfo(installPytorch);
        }}>
        {lang('app.setup.install_pytorch')}
      </Button>
      <Button
        onClick={async () => {
          await checkAndInfo(installRequirement);
        }}>
        {lang('app.setup.install_requirement')}
      </Button>
      <Button
        onClick={async () => {
          await checkAndInfo(installXformers);
        }}>
        {lang('app.setup.install_xformers')}
      </Button>
      <Button onClick={() => { openSdScriptFolder() }}>
        {lang('app.setup.open_sd_home')}
      </Button>
    </Space>
  );
};

export { TabSetup };
