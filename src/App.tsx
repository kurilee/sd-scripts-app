import { List } from '@arco-design/web-react';
import { CmpPath } from './compornts/ArgComponets';

function App() {
  return (
    <div className="container">
      <List style={{padding: "5px"}}>
        <CmpPath title="基本模型" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={false} ></CmpPath>
        <CmpPath title="VAE" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={true} ></CmpPath>
        <CmpPath title="训练集" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={false} ></CmpPath>
        <CmpPath title="输出路径" value="" defaultValue="D:\abc\1.safetensors" enable={true} isOptional={false} ></CmpPath>
      </List>
    </div>
  );
}

export default App;
