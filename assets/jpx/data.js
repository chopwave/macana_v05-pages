// ────── data ──────
const _forceSample=(()=>{try{return new URLSearchParams(window.location.search).get('mode')==='sample';}catch(_){return false;}})();
const DASHBOARD_DATA = (!_forceSample && window.JPX_DASHBOARD_DATA) || null;

const SAMPLE_SECTORS=[
  {n:'水産・農林', cat:'D',pbr:1.2,per:13.2,cap:0.6, cos:7,  chg:+0.0,dy:2.2},
  {n:'鉱業',       cat:'C',pbr:0.5,per:14.4,cap:1.8, cos:6,  chg:+0.1,dy:3.8},
  {n:'建設業',     cat:'V',pbr:1.2,per:9.9, cap:16.6,cos:100,chg:+0.3,dy:2.9},
  {n:'食料品',     cat:'D',pbr:1.7,per:18.7,cap:23.7,cos:83, chg:+0.0,dy:1.8},
  {n:'繊維製品',   cat:'V',pbr:1.0,per:17.7,cap:3.5, cos:41, chg:-0.2,dy:2.3},
  {n:'パルプ・紙', cat:'V',pbr:0.7,per:25.7,cap:1.6, cos:12, chg:+0.0,dy:2.6},
  {n:'化学',       cat:'C',pbr:1.6,per:16.6,cap:43.7,cos:146,chg:-0.2,dy:2.0},
  {n:'医薬品',     cat:'D',pbr:2.4,per:32.4,cap:40.0,cos:39, chg:+0.1,dy:1.2},
  {n:'石油・石炭', cat:'C',pbr:0.6,per:5.7, cap:2.7, cos:9,  chg:+0.4,dy:5.2},
  {n:'ゴム製品',   cat:'C',pbr:1.1,per:10.7,cap:4.2, cos:11, chg:-0.1,dy:2.7},
  {n:'ガラス・土石',cat:'C',pbr:1.0,per:10.7,cap:4.9,cos:33, chg:-0.1,dy:2.4},
  {n:'鉄鋼',       cat:'C',pbr:0.5,per:7.6, cap:4.7, cos:31, chg:+0.3,dy:4.1},
  {n:'非鉄金属',   cat:'C',pbr:0.7,per:13.0,cap:4.0, cos:24, chg:+0.5,dy:3.3},
  {n:'金属製品',   cat:'C',pbr:0.9,per:19.9,cap:3.6, cos:41, chg:+0.2,dy:2.5},
  {n:'機械',       cat:'C',pbr:1.4,per:16.0,cap:29.3,cos:142,chg:+0.1,dy:2.1},
  {n:'電気機器',   cat:'G',pbr:1.9,per:19.0,cap:83.0,cos:158,chg:+0.5,dy:1.5},
  {n:'輸送用機器', cat:'C',pbr:0.9,per:12.1,cap:52.9,cos:62, chg:+0.4,dy:3.5},
  {n:'精密機器',   cat:'G',pbr:3.4,per:31.6,cap:13.7,cos:33, chg:+0.2,dy:0.8},
  {n:'その他製品', cat:'G',pbr:1.8,per:28.9,cap:12.9,cos:53, chg:+0.2,dy:1.3},
  {n:'電気・ガス', cat:'D',pbr:0.7,per:10.9,cap:8.3, cos:22, chg:+0.3,dy:3.0},
  {n:'陸運業',     cat:'D',pbr:1.4,per:15.4,cap:24.8,cos:43, chg:-0.1,dy:2.2},
  {n:'海運業',     cat:'C',pbr:0.6,per:null,cap:0.9, cos:8,  chg:+1.6,dy:6.8},
  {n:'空運業',     cat:'C',pbr:1.0,per:8.7, cap:2.3, cos:3,  chg:-0.5,dy:1.0},
  {n:'倉庫・運輸', cat:'V',pbr:0.8,per:15.1,cap:1.3, cos:24, chg:+0.2,dy:2.8},
  {n:'情報・通信', cat:'G',pbr:1.7,per:14.9,cap:72.9,cos:220,chg:+0.3,dy:1.6},
  {n:'卸売業',     cat:'V',pbr:0.9,per:9.7, cap:29.6,cos:177,chg:+0.9,dy:3.8},
  {n:'小売業',     cat:'D',pbr:1.9,per:25.7,cap:36.4,cos:201,chg:-0.1,dy:1.4},
  {n:'銀行業',     cat:'V',pbr:0.4,per:10.0,cap:32.7,cos:82, chg:+0.4,dy:4.5},
  {n:'証券・先物', cat:'V',pbr:0.8,per:74.0,cap:4.5, cos:23, chg:+0.3,dy:3.2},
  {n:'保険業',     cat:'V',pbr:0.8,per:11.8,cap:13.0,cos:9,  chg:+0.5,dy:3.9},
  {n:'その他金融', cat:'V',pbr:1.1,per:11.0,cap:8.5, cos:27, chg:+0.1,dy:3.1},
  {n:'不動産業',   cat:'D',pbr:1.3,per:16.1,cap:15.0,cos:72, chg:+0.2,dy:2.6},
  {n:'サービス業', cat:'G',pbr:1.5,per:23.0,cap:36.3,cos:216,chg:+0.4,dy:1.7},
];
const CAT_COL={G:'#5b8df6',D:'#29c99a',C:'#f5a623',V:'#9b7fe8'};
const CAT_LBL={G:'グロース',D:'ディフェンシブ',C:'シクリカル',V:'バリュー'};
const SECTOR_CODE={'水産・農林':50,'鉱業':1050,'建設業':1300,'食料品':2050,'繊維製品':3050,'パルプ・紙':3100,'化学':3200,'医薬品':3250,'石油・石炭':3300,'ゴム製品':3350,'ガラス・土石':3400,'鉄鋼':3450,'非鉄金属':3500,'金属製品':3550,'機械':3600,'電気機器':3650,'輸送用機器':3700,'精密機器':3750,'その他製品':3800,'電気・ガス':4050,'陸運業':5050,'海運業':5100,'空運業':5150,'倉庫・運輸':5200,'情報・通信':5250,'卸売業':6050,'小売業':6100,'銀行業':7050,'証券・先物':7100,'保険業':7150,'その他金融':7200,'不動産業':8050,'サービス業':9050};
const SAMPLE_MONTHS=['2020/01','2020/07','2021/01','2021/07','2022/01','2022/07','2023/01','2023/07','2024/01','2024/07','2025/01','2025/07','2026/02'];
const SAMPLE_PBR_TS=[1.20,1.25,1.35,1.48,1.42,1.38,1.30,1.45,1.52,1.60,1.65,1.68,1.72];
const SAMPLE_PER_TS=[15.5,16.2,17.8,20.1,18.4,17.2,16.5,19.2,21.0,22.5,23.1,23.8,24.2];
const SAMPLE_LG=[1.3,1.35,1.5,1.65,1.55,1.5,1.42,1.6,1.7,1.78,1.82,1.85,1.9];
const SAMPLE_MED=[1.2,1.28,1.38,1.52,1.45,1.40,1.33,1.48,1.55,1.62,1.67,1.70,1.74];
const SAMPLE_SM=[1.1,1.15,1.22,1.35,1.28,1.22,1.16,1.30,1.36,1.44,1.50,1.52,1.56];
const SAMPLE_MFG=[1.4,1.42,1.55,1.72,1.62,1.55,1.48,1.65,1.74,1.82,1.88,1.90,1.95];
const SAMPLE_NMFG=[1.4,1.45,1.60,1.78,1.68,1.60,1.52,1.68,1.78,1.88,1.94,1.97,2.02];
const SAMPLE_EVENTS=[
  {label:'コロナ底',period:'2020/01→2020/03',
   desc:'全業種が無差別に売られる局面。空運・海運・鉄鋼が最大打撃。情報・通信・医薬品は比較的軽傷（テレワーク・ヘルスケア期待）。',
   pbr:[['空運業',-0.5],['精密機器',-0.6],['電気機器',-0.4],['情報・通信',-0.2],['医薬品',-0.1],['食料品',-0.05]],
   shr:[['情報・通信',0.3],['医薬品',0.2],['電気機器',-0.5],['輸送用機器',-0.4],['空運業',-0.3]]},
  {label:'コロナ回復',period:'2020/03→2021/06',
   desc:'コンテナ不足で海運バブル（+1.4倍）。電気機器・情報通信もDX需要で急伸。卸売（商社）も資源高で台頭。銀行は低金利継続で恩恵薄く出遅れ。',
   pbr:[['海運業',1.4],['電気機器',1.7],['精密機器',1.4],['情報・通信',1.1],['卸売業',0.5],['繊維製品',-0.1]],
   shr:[['情報・通信',1.8],['電気機器',1.5],['海運業',0.3],['銀行業',-0.4]]},
  {label:'利上げ懸念',period:'2021/06→2022/06',
   desc:'海運が2.2倍でピーク。石油・石炭・卸売がさらに上昇。グロース株はFRB利上げ・割引率上昇で逆風。バリュー優位のローテーション。',
   pbr:[['石油・石炭',0.4],['卸売業',0.3],['銀行業',0.1],['精密機器',-1.2],['電気機器',-0.8],['情報・通信',-0.3]],
   shr:[['卸売業',1.2],['石油・石炭',0.4],['電気機器',-1.0],['精密機器',-0.8]]},
  {label:'東証PBR改革',period:'2023/03→2023/09',
   desc:'東証が「PBR1倍割れ企業への改善計画開示」を要請。銀行・保険・商社などのバリュー株が急騰。日銀YCC修正も銀行株を後押し。',
   pbr:[['銀行業',0.2],['保険業',0.2],['卸売業',0.2],['証券・先物',0.1],['情報・通信',0.2],['電気機器',0.1]],
   shr:[['銀行業',0.8],['保険業',0.4],['卸売業',0.5],['電気機器',0.3]]},
  {label:'日銀利上げ',period:'2024/01→2026/02',
   desc:'日銀の段階的利上げ継続で銀行がさらに回復。半導体・AI需要で電気機器・情報通信が再加速。海運は供給正常化でPBR 1.0倍まで下落。',
   pbr:[['銀行業',0.3],['電気機器',0.4],['情報・通信',0.4],['卸売業',0.2],['海運業',-1.2],['電気・ガス',0.3]],
   shr:[['情報・通信',0.8],['電気機器',0.5],['銀行業',0.6],['海運業',-0.5]]},
];
// ─── サンプル: 月次業種履歴 ─── SAMPLE_MONTHSの各月に対応するセクターデータ（PBR_TSで按分）
const _SAMPLE_PBR_LATEST=SAMPLE_PBR_TS[SAMPLE_PBR_TS.length-1];
const _SAMPLE_YMS=SAMPLE_MONTHS.map(m=>m.replace('/',''));
const SAMPLE_SECTORS_HISTORY=Object.fromEntries(
  _SAMPLE_YMS.map((ym,i)=>{
    const sc=SAMPLE_PBR_TS[i]/_SAMPLE_PBR_LATEST;
    const prevSc=i>0?SAMPLE_PBR_TS[i-1]/_SAMPLE_PBR_LATEST:sc;
    return [ym,SAMPLE_SECTORS.map(s=>({
      ...s,
      pbr:s.pbr!=null?+(s.pbr*sc).toFixed(2):null,
      chg:s.pbr!=null?+(s.pbr*(sc-prevSc)).toFixed(2):s.chg,
      cap:s.cap!=null?+(s.cap*(sc*0.8+0.2)).toFixed(1):null
    }))];
  })
);
// ─── サンプル: 月次成長要因分解 ───
const SAMPLE_DECOMP_HISTORY=Object.fromEntries(
  _SAMPLE_YMS.slice(1).map((ym,i)=>{
    const sc=SAMPLE_PBR_TS[i+1]/_SAMPLE_PBR_LATEST;
    const prevSc=SAMPLE_PBR_TS[i]/_SAMPLE_PBR_LATEST;
    const sectors=[...SAMPLE_SECTORS].map(s=>{
      const chg=s.pbr!=null?+(s.pbr*(sc-prevSc)).toFixed(3):0;
      return {n:s.n,na:+(chg*0.62).toFixed(3),pbr:+(chg*0.38).toFixed(3)};
    }).sort((a,b)=>Math.abs(b.na+b.pbr)-Math.abs(a.na+a.pbr));
    return [ym,{start:SAMPLE_MONTHS[i],end:SAMPLE_MONTHS[i+1],sectors}];
  })
);
const SECTORS=DASHBOARD_DATA?.sectors_latest || SAMPLE_SECTORS;
const MONTHS=DASHBOARD_DATA?.months || SAMPLE_MONTHS;
// 単純平均-加重平均スプレッド（avg_pbrが実データにあれば優先、なければ近似値）
function _calcSprData(sectors){
  const hasAvp=sectors.some(s=>s.avp!=null);
  return [...sectors].map(s=>({
    n:s.n,
    v:hasAvp?(s.avp!=null&&s.pbr!=null?+(s.avp-s.pbr).toFixed(2):0):+(0.25-s.pbr*.08).toFixed(2)
  })).sort((a,b)=>b.v-a.v);
}
const SPR_DATA=_calcSprData(SECTORS);
// 選択月セクター（null=最新月）
let _activeSectors=null;
function _curSectors(){return _activeSectors||SECTORS;}
const PBR_TS=DASHBOARD_DATA?.pbr_ts || SAMPLE_PBR_TS;
const PER_TS=DASHBOARD_DATA?.per_ts || SAMPLE_PER_TS;
const LG=DASHBOARD_DATA?.lg || SAMPLE_LG;
const MED=DASHBOARD_DATA?.med || SAMPLE_MED;
const SM=DASHBOARD_DATA?.sm || SAMPLE_SM;
const MFG=DASHBOARD_DATA?.mfg || SAMPLE_MFG;
const NMFG=DASHBOARD_DATA?.nmfg || SAMPLE_NMFG;
const EVENTS=DASHBOARD_DATA?.events || SAMPLE_EVENTS;

// ────── state ──────
let fCat='all', fPbr='all', fChgMin=-1, fSearch='';
let _screenSort={key:'code',asc:true};
let notes=[], evNotes={};
let charts={};
let evCharts={bar:null,shr:null};
let currentEv=0;
let chartMode='chartjs';
let themeMode='dark';

function getUrlParam(name){
  try{
    const params=new URLSearchParams(window.location.search);
    return params.get(name);
  }catch(_e){
    return null;
  }
}

const GC={color:'rgba(255,255,255,0)',border:'rgba(255,255,255,0)',
  responsive:true,maintainAspectRatio:false,
  plugins:{legend:{labels:{color:'#6b7491',font:{size:11},usePointStyle:true}}},
  scales:{
    x:{ticks:{color:'#6b7491',font:{size:10}},grid:{color:'rgba(255,255,255,.04)'}},
    y:{ticks:{color:'#6b7491',font:{size:10}},grid:{color:'rgba(255,255,255,.04)'}}
  }
};
function syncChartDefaults(){
  GC.plugins.legend.labels.color = chartTickColor();
  GC.scales.x.ticks.color = chartTickColor();
  GC.scales.y.ticks.color = chartTickColor();
  GC.scales.x.grid.color = chartGridColor();
  GC.scales.y.grid.color = chartGridColor();
}
// テーマ切り替え時に既存チャートインスタンスの色を一括更新
function refreshChartColors(){
  const tick=chartTickColor(),label=chartLabelColor(),grid=chartGridColor();
  const gridS=chartGridColorSoft(),blue=accentBlue(),amber=accentAmber();
  const ciColor=themeMode==='light'?'#0f9f6e':'#29c99a';
  function _upd(ch,xCol,yCol,extra){
    if(!ch) return;
    const s=ch.options.scales;
    if(ch.options.plugins?.legend?.labels) ch.options.plugins.legend.labels.color=tick;
    if(s?.x?.ticks) s.x.ticks.color=xCol;
    if(s?.x?.grid) s.x.grid.color=grid;
    if(s?.y?.ticks) s.y.ticks.color=yCol;
    if(extra) extra(ch.options,s);
    ch.update('none');
  }
  _upd(charts.trend,tick,tick);
  _upd(charts.valTrend,tick,blue,(_,s)=>{if(s?.y2?.ticks) s.y2.ticks.color=amber;});
  _upd(charts.indRank,tick,label);
  _upd(charts.decomp,tick,label);
  _upd(charts.zscore,tick,label);
  _upd(charts.cyclePhase,tick,ciColor,(_,s)=>{
    if(s?.y?.title) s.y.title.color=tick;
    if(s?.y?.grid) s.y.grid.color=grid;
    if(s?.x?.grid) s.x.grid.color=gridS;
    if(s?.y2?.ticks) s.y2.ticks.color=amber;
  });
  _upd(charts.cdRatio,tick,tick,(_,s)=>{
    if(s?.y?.title) s.y.title.color=tick;
    if(s?.y?.grid) s.y.grid.color=grid;
  });
}

