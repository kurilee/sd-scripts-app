import { List } from '@arco-design/web-react';
import { CmpFile } from './compornts/ArgComponets';

function App() {
  return (
    <div className="container">
      <List style={{padding: "5px"}}>
        <CmpFile title="基本模型" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={false} filters={[{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt']}]}></CmpFile>
        <CmpFile title="VAE" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={true} filters={[{ name: 'VAE', extensions: ['safetensors', 'ckpt', 'pt']}]}></CmpFile>
        <CmpFile title="训练集" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={false} filters={[]}></CmpFile>
        <CmpFile title="输出路径" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={false} filters={[]}></CmpFile>
      </List>
    </div>
  );
}

export default App;
