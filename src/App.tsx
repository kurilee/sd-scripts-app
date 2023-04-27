import { List } from '@arco-design/web-react';
import { CmpFile, CmpFolder, CmpText, CmpSwitch, CmpCombox, CmpNum } from './compornts/ArgComponets';
import { appDataDir } from '@tauri-apps/api/path';
import { useEffect, useState } from 'react';
import './App.css'

const optTypes = ["AdamW", "AdamW8bit", "Lion", "SGDNesterov", "SGDNesterov8bit", "DAdaptation", "AdaFactor"];
const lrSchedulers = ["linear", "cosine", "cosine_with_restarts", "polynomial", "constant", "constant_with_warmup", "adafactor"];

function App() {
  const [defaultAppConfigPath, setDefaultAppConfigPath] = useState("");
  useEffect(() => {
    appDataDir().then(setDefaultAppConfigPath);
  },[])
  return (
    <div style={{padding: "5px"}}>
        <List className="comp_list" size="small">
          <CmpFile title="基本模型" value="" defaultValue="" enable={true} isOptional={false} filters={[{ name: 'Checkpoint', extensions: ['safetensors', 'ckpt', 'pt']}]}></CmpFile>
          <CmpFile title="VAE" value="" defaultValue="" enable={true} isOptional={true} filters={[{ name: 'VAE', extensions: ['safetensors', 'ckpt', 'pt']}]}></CmpFile>
          <CmpFolder title="训练集" value="" defaultValue="" enable={true} isOptional={false} defaultPath={defaultAppConfigPath} ></CmpFolder>
          <CmpFolder title="输出路径" value="" defaultValue="" enable={true} isOptional={false} defaultPath={defaultAppConfigPath} ></CmpFolder>
          <CmpText title='输出名称' value='' defaultValue='' enable={true} isOptional={false} ></CmpText>
          <CmpNum title='Epoch保存间隔' value={1} defaultValue={1} enable={true} isOptional={false} min={1} max={30} step={0} precision={0} ></CmpNum>
        </List>
        <List className="comp_list" size="small">
          <CmpSwitch title="xformers" value={true} defaultValue={true} enable={true} isOptional={true}></CmpSwitch>
          <CmpSwitch title="enable-bucket" value={true} defaultValue={true} enable={true} isOptional={true}></CmpSwitch>
          <CmpText title='SaveModelAs' value='safetensors' defaultValue='safetensors' enable={false} isOptional={false} ></CmpText>
          <CmpText title='mixed_precision' value='fp16' defaultValue='fp16' enable={false} isOptional={false} ></CmpText>
          <CmpText title='save_precision' value='fp16' defaultValue='fp16' enable={false} isOptional={false} ></CmpText>
        </List>
        <List className="comp_list" size="small">
          <CmpText title="分辨率" value="" defaultValue="512,512" enable={true} isOptional={false}></CmpText>
          <CmpCombox title="优化器" value='Lion' defaultValue='Lion' enable={true} isOptional={false} options={optTypes}></CmpCombox>
          <CmpText title="网格类型" value='' defaultValue='networks.lora' enable={false} isOptional={false}></CmpText>
          <CmpNum title='Epoch' value={10} defaultValue={10} enable={true} isOptional={false} min={1} max={300} step={1} precision={0}></CmpNum>
          <CmpNum title='学习率' value={0.00001} defaultValue={0.00001} enable={true} isOptional={false} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum title='UNetLr' value={0.00001} defaultValue={0.00001} enable={true} isOptional={false} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum title='TextEncordLr' value={0.00001} defaultValue={0.00001} enable={true} isOptional={false} min={0.000001} max={0.001} step={0.000001} precision={6}></CmpNum>
          <CmpNum title='NetworkDim' value={10} defaultValue={32} enable={true} isOptional={false} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum title='NetworkAlpha' value={10} defaultValue={32} enable={true} isOptional={false} min={1} max={128} step={1} precision={0}></CmpNum>
          <CmpNum title='训练批次' value={1} defaultValue={1} enable={true} isOptional={false} min={1} max={5} step={1} precision={0}></CmpNum>
        </List>
        <List className="comp_list" size="small">
          <CmpCombox title="学习策略" value='cosine_with_restarts' defaultValue='cosine_with_restarts' enable={true} isOptional={false} options={lrSchedulers}></CmpCombox>
          <CmpNum title='学习周期数' value={4} defaultValue={4} enable={true} isOptional={true} min={1} max={30} step={0} precision={0} ></CmpNum>
        </List>
    </div>
  );
}

export default App;
