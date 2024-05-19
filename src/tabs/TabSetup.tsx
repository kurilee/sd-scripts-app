import { Button, Message, Space } from '@arco-design/web-react';
import { lang } from '../i18n';
import { checkGit, checkPython, cloneSdScript, installVirtualenv, createVenv, installRequirement } from '../utils/setup_sd';

const TabSetup = (props: any) => {
  const checkAndInfo = async (checkFun: () => Promise<boolean>) => {
    Message.info(await checkFun() ? lang('app.setup.check_ok') : lang('app.setup.check_fail'));
  }
  return (
    <Space>
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
          await checkAndInfo(installRequirement);
        }}>
        {lang('app.setup.install_requirement')}
      </Button>
    </Space>
  );
};

export { TabSetup };
