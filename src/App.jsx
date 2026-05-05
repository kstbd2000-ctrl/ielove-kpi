import { useState, useMemo, useEffect } from "react";

const TC = {
  "失注": { bg:"#fee2e2", text:"#dc2626", border:"#fca5a5" },
  "A":   { bg:"#ffedd5", text:"#c2410c", border:"#fdba74" },
  "B":   { bg:"#dbeafe", text:"#1d4ed8", border:"#93c5fd" },
  "C":   { bg:"#dcfce7", text:"#166534", border:"#86efac" },
  "D":   { bg:"#fef9c3", text:"#854d0e", border:"#fde047" },
  "契約": { bg:"#ede9fe", text:"#6d28d9", border:"#c4b5fd" },
};
const TYPC = { "賃貸仲介":"#0ea5e9","売買仲介":"#f97316","賃貸管理":"#8b5cf6","総合不動産":"#ec4899" };
const TIERS_FOLLOW = ["失注","A","B","C","D"];
const CONTACT_COL = {"源泉":"#ef4444","反響":"#3b82f6","紹介":"#22c55e","自力":"#94a3b8"};
const GYOSHU_COL  = {"賃貸":"#0ea5e9","売買":"#f97316","管理":"#8b5cf6"};

const INIT_FOLLOW = [
  {id:1,tier:"失注",co:"株式会社Ｉｖｅｌ",s1:"みらいえ",s2:"",loc:"東京都千代田区",ph:"03-5296-9980",type:"賃貸仲介",notes:"みらいえ利用2.5円、いいもん1.5円。繁忙期明け連絡。",contact:"担当：及川社長",next:"1月"},
  {id:2,tier:"B",co:"湘南レーベル SLE不動産 伊崎原店",s1:"イーライフ",s2:"カシカ",loc:"神奈川県",ph:"04-6320-9664",type:"売買仲介",notes:"鞄会社で後進中。",contact:"kato@shonan-label.com\n070-1369-1630",next:"1月8日"},
  {id:3,tier:"D",co:"も株式会社",s1:"",s2:"",loc:"茨城県守谷市",ph:"0297-21-3925",type:"売買仲介",notes:"融資が終わらないと分からない。",contact:"長澤社長 080-66371806",next:"2月"},
  {id:4,tier:"D",co:"株式会社三幸",s1:"いい生活",s2:"ビジュアル",loc:"群馬県高崎市",ph:"027-310-1031",type:"総合不動産",notes:"来年5〜6月に仲介側のみ検討。",contact:"専務 080-5923-4000",next:""},
  {id:5,tier:"D",co:"ハートフルマンション株式会社",s1:"いい生活",s2:"ビジュアル",loc:"岐阜県可児市",ph:"056-156-1136",type:"賃貸管理",notes:"繁忙期明け7月接触。",contact:"賃貸管理部 岡安崇樹",next:"5/7"},
  {id:6,tier:"失注",co:"有限会社三協不動産",s1:"悟クリ",s2:"",loc:"東京都江東区",ph:"03-3682-6537",type:"賃貸管理",notes:"トプオリ案件。金融は150万くらい。",contact:"専務 高山電哲",next:"5〜6月"},
  {id:7,tier:"失注",co:"ハウスセイラーズ",s1:"いい生活",s2:"リドックス",loc:"東京都足立区",ph:"03-3856-0141",type:"賃貸仲介",notes:"社長がいい生活から変える気がない。",contact:"賃貸事業部 渡沢裕樹",next:"補助金のタイミング"},
  {id:8,tier:"契約",co:"合同会社1go1a",s1:"",s2:"",loc:"東京都江東区",ph:"03-6808-4153",type:"賃貸仲介",notes:"管理会社切替HPで反響獲得。",contact:"荒井さん 080-4783-8616",next:"1月25日"},
  {id:9,tier:"失注",co:"ないけんぼーいず",s1:"",s2:"",loc:"東京都渋谷区",ph:"03-6455-2402",type:"賃貸仲介",notes:"いえらぶCLOUD運用フロー図で紹介。",contact:"畑井田さん 080-3375-9617",next:"16日"},
  {id:10,tier:"失注",co:"株式会社セラヴィリゾート泰郷",s1:"",s2:"",loc:"東京都豊島区",ph:"03-5981-2303",type:"売買仲介",notes:"こちらからラブを投げる。",contact:"水谷佳代 070-2442-1235",next:""},
  {id:11,tier:"契約",co:"株式会社LOOPLACE",s1:"",s2:"",loc:"東京都千代田区",ph:"03-6206-9422",type:"賃貸管理",notes:"2月後入12月に全部聞く。",contact:"山城知香",next:""},
  {id:12,tier:"失注",co:"オープンエステートジャパン株式会社",s1:"",s2:"",loc:"",ph:"",type:"賃貸仲介",notes:"",contact:"",next:"2027年1月"},
  {id:13,tier:"失注",co:"合同会社anaコーポレーション",s1:"",s2:"",loc:"",ph:"",type:"売買仲介",notes:"連絡つながらない。",contact:"",next:""},
  {id:14,tier:"失注",co:"大幸住宅株式会社 東高円寺店",s1:"いい生活",s2:"",loc:"",ph:"",type:"賃貸仲介",notes:"かえれなさそう。",contact:"",next:"3月アポ"},
  {id:15,tier:"D",co:"湘南レーベル SLE不動産 藤沢店",s1:"",s2:"",loc:"",ph:"",type:"賃貸仲介",notes:"HPを2月作りましょうの提案をする。",contact:"",next:"5月"},
  {id:16,tier:"失注",co:"慶和住宅",s1:"イーライフ",s2:"",loc:"",ph:"",type:"売買仲介",notes:"スタッフが2人辞めてリクルート優先。",contact:"",next:"5月"},
  {id:17,tier:"D",co:"ヒナギク",s1:"",s2:"",loc:"",ph:"",type:"売買仲介",notes:"ラクテック興味あるもいえらぶプライアント。",contact:"",next:"6月"},
  {id:18,tier:"失注",co:"ＹＫアシスト NORTH HOUSE",s1:"",s2:"",loc:"札幌市白石区",ph:"011-378-5956",type:"売買仲介",notes:"補助金で進める。",contact:"",next:"4月"},
  {id:19,tier:"失注",co:"ハウスバンク不動産",s1:"",s2:"",loc:"千葉県松戸市",ph:"",type:"売買仲介",notes:"1人増えたら可能性あり。",contact:"",next:""},
];

const INIT_CLIENTS = [
  {id:101,tier:"Tier3",co:"有限会社アズマ設計",gyoshu:"賃貸",pref:"岩手",area:"盛岡",contact1:"源泉",kDate:"2025/07/21",kStart:"2025/10/01",dokosha:"武田さん",initial:40,monthly:5.5,hp:true,hojokin:false},
  {id:102,tier:"Tier2",co:"株式会社ビットランド",gyoshu:"売買",pref:"岩手",area:"盛岡",contact1:"反響",kDate:"2025/07/28",kStart:"2025/10/01",dokosha:"村上さん",initial:118,monthly:6.7,hp:true,hojokin:true},
  {id:103,tier:"Tier2",co:"株式会社ECRAS",gyoshu:"賃貸",pref:"東京",area:"中央区",contact1:"反響",kDate:"2025/07/15",kStart:"2026/03/01",dokosha:"武田さん",initial:52.5,monthly:6.55,hp:true,hojokin:false},
  {id:104,tier:"Tier2",co:"An Re 安里大貴",gyoshu:"賃貸",pref:"埼玉",area:"埼玉",contact1:"反響",kDate:"2025/08/27",kStart:"2025/11/01",dokosha:"武田さん",initial:40,monthly:5.6,hp:true,hojokin:false},
  {id:105,tier:"Tier3",co:"ディスカバリー不動産",gyoshu:"売買",pref:"千葉",area:"千葉",contact1:"源泉",kDate:"2025/08/29",kStart:"2025/11/01",dokosha:"自力",initial:22,monthly:4.5,hp:false,hojokin:false},
  {id:106,tier:"Tier2",co:"株式会社ウィンテート",gyoshu:"売買",pref:"茨城",area:"牛久市/つくば市",contact1:"源泉",kDate:"2025/09/25",kStart:"2025/12/01",dokosha:"自力",initial:65,monthly:8.8,hp:true,hojokin:false},
  {id:107,tier:"Tier3",co:"佐々木直樹",gyoshu:"賃貸",pref:"茨城",area:"水戸",contact1:"反響",kDate:"2025/09/24",kStart:"2026/01/01",dokosha:"自力",initial:50,monthly:6.8,hp:true,hojokin:false},
  {id:108,tier:"Tier2",co:"REPUNIT株式会社",gyoshu:"売買",pref:"東京",area:"港区",contact1:"源泉",kDate:"2025/11/17",kStart:"2025/12/01",dokosha:"三津田さん",initial:47.5,monthly:8.2,hp:false,hojokin:true},
  {id:109,tier:"Tier3",co:"株式会社朝日・マンション住替センター",gyoshu:"賃貸",pref:"東京",area:"品川区",contact1:"源泉",kDate:"2025/11/18",kStart:"2026/04/01",dokosha:"三津田さん",initial:20,monthly:5.0,hp:false,hojokin:false},
  {id:110,tier:"Tier2",co:"光ハウジング株式会社",gyoshu:"売買",pref:"群馬",area:"桐生市",contact1:"反響",kDate:"2025/12/15",kStart:"2026/02/01",dokosha:"自力",initial:42,monthly:6.9,hp:false,hojokin:false},
  {id:111,tier:"Tier2",co:"株式会社リバイブル",gyoshu:"管理",pref:"東京",area:"千代田区",contact1:"紹介",kDate:"2025/12/25",kStart:"2026/05/01",dokosha:"築地さん",initial:60,monthly:7.0,hp:false,hojokin:false},
  {id:112,tier:"Tier3",co:"株式会社リンクアセットマネジメント",gyoshu:"売買",pref:"東京",area:"新宿区",contact1:"反響",kDate:"2026/01/15",kStart:"2026/02/01",dokosha:"自力",initial:16.5,monthly:4.5,hp:false,hojokin:false},
  {id:113,tier:"Tier2",co:"bun.style株式会社",gyoshu:"賃貸",pref:"東京",area:"中央区",contact1:"反響",kDate:"2026/02/04",kStart:"2026/05/01",dokosha:"自力",initial:22.4,monthly:5.74,hp:false,hojokin:false},
  {id:114,tier:"Tier2",co:"株式会社LOOPLACE",gyoshu:"管理",pref:"東京",area:"千代田区",contact1:"反響",kDate:"2026/02/27",kStart:"2026/06/01",dokosha:"川尻さん",initial:60,monthly:4.7,hp:false,hojokin:false},
  {id:115,tier:"Tier2",co:"リアル・スター・コラボレーション株式会社",gyoshu:"売買",pref:"東京",area:"練馬区",contact1:"反響",kDate:"2026/03/02",kStart:"2026/05/01",dokosha:"武田さん",initial:25,monthly:5.5,hp:false,hojokin:false},
  {id:116,tier:"テッ",co:"有限会社スギト",gyoshu:"賃貸",pref:"神奈川",area:"横須賀市",contact1:"源泉",kDate:"2026/03/12",kStart:"2026/10/01",dokosha:"自力",initial:12,monthly:3.9,hp:false,hojokin:false},
  {id:117,tier:"テッ",co:"合同会社1go1a",gyoshu:"賃貸",pref:"東京",area:"江東区",contact1:"源泉",kDate:"2026/03/31",kStart:"—",dokosha:"自力",initial:20.5,monthly:3.3,hp:true,hojokin:true},
  {id:118,tier:"テッ",co:"東和興業株式会社",gyoshu:"売買",pref:"東京",area:"練馬区",contact1:"源泉",kDate:"2026/04/17",kStart:"2026/09/01",dokosha:"自力",initial:30.5,monthly:3.65,hp:true,hojokin:true},
  {id:119,tier:"Tier2",co:"株式会社部屋なびplus",gyoshu:"賃貸",pref:"東京",area:"清瀬市",contact1:"源泉",kDate:"2026/04/30",kStart:"2026/06/01",dokosha:"杉原さん",initial:41,monthly:5.9,hp:true,hojokin:false},
  {id:120,tier:"Tier2",co:"株式会社ネクスト ハウスマン鶴ヶ島店",gyoshu:"売買",pref:"埼玉",area:"川越市",contact1:"源泉",kDate:"2026/04/30",kStart:"2026/08/01",dokosha:"自力",initial:50,monthly:4.8,hp:true,hojokin:true},
];

const BLANK_MONTHLY = {date:"",tanto:"武",vtype:"V",asp:"",shogu:"",tsukin:"",co:"",tier:"C",na:"",hojokin:false};
const INIT_MONTHLY = [
  {id:201,date:"03/10",tanto:"河",vtype:"訪",asp:2,shogu:300,tsukin:12.4,co:"湘南レーベル伊勢原店",tier:"C",na:"4/6締め。間に合うかどうか。月末申し込み予定。",hojokin:false},
  {id:202,date:"5月",tanto:"河",vtype:"訪",asp:1,shogu:7.5,tsukin:2.5,co:"株式会社リンクエイジ",tier:"C",na:"5月C案件 スマホで物繰のみ 7.5/2.5",hojokin:false},
  {id:203,date:"",tanto:"武",vtype:"V",asp:"",shogu:"",tsukin:"",co:"広田ユニオン",tier:"C",na:"",hojokin:false},
];
const BLANK_FOLLOW = {tier:"D",co:"",s1:"",s2:"",loc:"",ph:"",type:"賃貸仲介",notes:"",contact:"",next:""};
const lbl = {fontSize:10,color:"#64748b",marginBottom:3,fontWeight:600};
const today = new Date().toISOString().slice(0,10).replace(/-/g,"/");

// localStorage helpers
function lsGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

// ── 契約登録モーダル ────────────────────────────────
function ContractModal({followCase, onConfirm, onCancel}){
  const [form,setForm]=useState({
    tier:"Tier2", gyoshu:"賃貸", pref:"", area:"", contact1:"源泉",
    kDate:today, kStart:"", dokosha:"自力",
    initial:"", monthly:"", hp:false, hojokin:false,
  });
  const [err,setErr]=useState("");
  const f=(k,v)=>setForm(p=>({...p,[k]:v}));
  const inp=(k,ph)=><input value={form[k]} onChange={e=>f(k,e.target.value)} placeholder={ph} style={{padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,width:"100%",boxSizing:"border-box"}}/>;
  const slc=(k,opts)=><select value={form[k]} onChange={e=>f(k,e.target.value)} style={{padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,background:"white",width:"100%"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select>;
  const ok=()=>{
    if(!form.monthly||!form.initial){setErr("⚠️ 月額費用と初期費用は必須です");return;}
    setErr("");
    onConfirm({...form,monthly:Number(form.monthly),initial:Number(form.initial)});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"white",borderRadius:14,padding:22,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:4,color:"#6d28d9"}}>🎉 契約登録</div>
        <div style={{fontSize:12,color:"#64748b",marginBottom:16,padding:"6px 10px",background:"#f5f3ff",borderRadius:6}}>
          <strong>{followCase.co}</strong> を契約クライアントに移動します
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <div><div style={lbl}>Tier</div>{slc("tier",["Tier1","Tier2","Tier3","テッ"])}</div>
          <div><div style={lbl}>業種</div>{slc("gyoshu",["賃貸","売買","管理"])}</div>
          <div><div style={lbl}>都道府県</div>{inp("pref","例: 東京")}</div>
          <div><div style={lbl}>エリア</div>{inp("area","例: 新宿区")}</div>
          <div><div style={lbl}>1次接触</div>{slc("contact1",["源泉","反響","紹介","自力"])}</div>
          <div><div style={lbl}>同行者</div>{inp("dokosha","例: 武田さん")}</div>
          <div><div style={lbl}>契約日 *</div>{inp("kDate","例: 2026/05/01")}</div>
          <div><div style={lbl}>課金開始日</div>{inp("kStart","例: 2026/07/01")}</div>
          <div><div style={lbl}>月額費用（万） *</div>{inp("monthly","例: 5.5")}</div>
          <div><div style={lbl}>初期費用（万） *</div>{inp("initial","例: 40")}</div>
        </div>
        <div style={{display:"flex",gap:16,marginBottom:16}}>
          <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={form.hp} onChange={e=>f("hp",e.target.checked)}/> HPあり</label>
          <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,cursor:"pointer"}}><input type="checkbox" checked={form.hojokin} onChange={e=>f("hojokin",e.target.checked)}/> 補助金あり</label>
        </div>
        {err&&<div style={{color:"#dc2626",fontSize:12,marginBottom:10}}>{err}</div>}
        <div style={{display:"flex",gap:8}}>
          <button onClick={ok} style={{flex:1,padding:"8px 0",background:"linear-gradient(135deg,#6d28d9,#a78bfa)",color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer"}}>✅ 契約クライアントに移動</button>
          <button onClick={onCancel} style={{padding:"8px 16px",background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:8,fontSize:12,cursor:"pointer"}}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}

// ── 追客中カード ────────────────────────────────────
function CaseCard({c, expanded, onToggle, aiLoad, aiRes, onAI, onTierChange, onDelete, onEdit}){
  const tc=TC[c.tier]||{bg:"#f1f5f9",text:"#475569",border:"#cbd5e1"};
  const tyc=TYPC[c.type]||"#64748b";
  const sys=[c.s1,c.s2].filter(Boolean);
  return(
    <div style={{background:"white",borderRadius:10,border:"1px solid #e2e8f0",borderLeft:`4px solid ${tc.text}`,overflow:"hidden"}}>
      <div style={{padding:"11px 14px",display:"flex",alignItems:"flex-start",gap:10}}>
        <select value={c.tier} onChange={e=>onTierChange(c.id, e.target.value)}
          style={{padding:"2px 4px",borderRadius:5,border:`1px solid ${tc.border}`,background:tc.bg,color:tc.text,fontWeight:700,fontSize:11,cursor:"pointer",minWidth:52}}>
          {TIERS_FOLLOW.map(t=><option key={t} value={t}>{t}</option>)}
        </select>

        <div onClick={onToggle} style={{flex:1,minWidth:0,cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{fontWeight:600,fontSize:13}}>{c.co}</span>
            <span style={{background:`${tyc}18`,color:tyc,borderRadius:4,padding:"1px 6px",fontSize:11,fontWeight:600}}>{c.type}</span>
            {sys.map(s=><span key={s} style={{background:"#f1f5f9",color:"#475569",borderRadius:4,padding:"1px 5px",fontSize:10}}>{s}</span>)}
          </div>
          <div style={{display:"flex",gap:10,marginTop:3,fontSize:11,color:"#94a3b8",flexWrap:"wrap"}}>
            {c.loc&&<span>📍 {c.loc}</span>}
            {c.ph&&<span>📞 {c.ph}</span>}
            {c.next&&<span style={{color:"#0ea5e9",fontWeight:600}}>🗓 {c.next}</span>}
          </div>
        </div>
        <span onClick={onToggle} style={{color:"#94a3b8",fontSize:10,marginTop:2,cursor:"pointer"}}>{expanded?"▲":"▼"}</span>
      </div>
      {expanded&&(
        <div style={{borderTop:"1px solid #f1f5f9",padding:"12px 14px",background:"#fafafa"}}>
          {c.notes&&<div style={{marginBottom:10}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:3}}>📝 履歴メモ</div><div style={{fontSize:12,color:"#334155",whiteSpace:"pre-wrap",lineHeight:1.65,background:"white",padding:"8px 10px",borderRadius:6,border:"1px solid #e2e8f0"}}>{c.notes}</div></div>}
          {c.contact&&<div style={{marginBottom:10}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:3}}>👤 担当者情報</div><div style={{fontSize:12,color:"#334155",whiteSpace:"pre-wrap"}}>{c.contact}</div></div>}
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <button onClick={()=>onEdit(c)} style={{padding:"5px 12px",background:"#dbeafe",color:"#1d4ed8",border:"none",borderRadius:6,cursor:"pointer",fontSize:11,fontWeight:600}}>✏️ 編集</button>
            <button onClick={onAI} disabled={aiLoad} style={{padding:"5px 12px",background:aiLoad?"#e2e8f0":"linear-gradient(135deg,#7c3aed,#a78bfa)",color:aiLoad?"#94a3b8":"white",border:"none",borderRadius:6,cursor:aiLoad?"not-allowed":"pointer",fontSize:11,fontWeight:600}}>
              {aiLoad?"⏳ 生成中...":"✨ AIネクストアクション提案"}
            </button>
            <button onClick={()=>{if(window.confirm(`「${c.co}」を削除しますか？`))onDelete(c.id);}} style={{padding:"5px 12px",background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,cursor:"pointer",fontSize:11,fontWeight:600}}>🗑 削除</button>
          </div>
          {aiRes&&<div style={{marginTop:8,background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:6,padding:"8px 12px",fontSize:12,color:"#5b21b6",lineHeight:1.6}}><span style={{fontWeight:700,fontSize:10,color:"#7c3aed"}}>🤖 AI提案：</span><br/>{aiRes}</div>}
        </div>
      )}
    </div>
  );
}

// ── 追客中タブ ─────────────────────────────────────
function FollowupTab({followCases, setFollowCases, clients, setClients}){
  const [ftier,setFtier]=useState("全て");
  const [exp,setExp]=useState(null);
  const [aiLoad,setAiLoad]=useState({});
  const [aiRes,setAiRes]=useState({});
  const [contractTarget,setContractTarget]=useState(null);
  const [showAddForm,setShowAddForm]=useState(false);
  const [editFollowId,setEditFollowId]=useState(null);
  const [addForm,setAddForm]=useState(BLANK_FOLLOW);
  const af=(k,v)=>setAddForm(p=>({...p,[k]:v}));
  const ainp=(k,ph)=><input value={addForm[k]} onChange={e=>af(k,e.target.value)} placeholder={ph} style={{padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,width:"100%",boxSizing:"border-box"}}/>;
  const aslc=(k,opts)=><select value={addForm[k]} onChange={e=>af(k,e.target.value)} style={{padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,background:"white",width:"100%"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select>;
  const saveFollow=()=>{
    if(!addForm.co.trim())return;
    if(editFollowId!==null){
      setFollowCases(p=>p.map(c=>c.id===editFollowId?{...addForm,id:editFollowId}:c));
    }else{
      setFollowCases(p=>[{...addForm,id:Date.now()},...p]);
    }
    setAddForm(BLANK_FOLLOW);
    setShowAddForm(false);
    setEditFollowId(null);
  };
  const startFollowEdit=(c)=>{
    setAddForm({tier:c.tier,co:c.co,s1:c.s1||"",s2:c.s2||"",loc:c.loc||"",ph:c.ph||"",type:c.type,notes:c.notes||"",contact:c.contact||"",next:c.next||""});
    setEditFollowId(c.id);
    setShowAddForm(true);
    if(typeof window!=="undefined") window.scrollTo({top:0,behavior:"smooth"});
  };
  const cancelFollowForm=()=>{
    setShowAddForm(false);
    setAddForm(BLANK_FOLLOW);
    setEditFollowId(null);
  };

  const cnt=TIERS_FOLLOW.reduce((a,t)=>({...a,[t]:followCases.filter(c=>c.tier===t).length}),{});
  const shown=(ftier==="全て"?followCases:followCases.filter(c=>c.tier===ftier));

  const handleTierChange=(id, newTier)=>{
    if(newTier==="契約"){
      const target=followCases.find(c=>c.id===id);
      setContractTarget(target);
    } else {
      setFollowCases(p=>p.map(c=>c.id===id?{...c,tier:newTier}:c));
    }
  };

  const handleContractConfirm=(formData)=>{
    const newClient={
      id: Date.now(),
      co: contractTarget.co,
      tier: formData.tier,
      gyoshu: formData.gyoshu,
      pref: formData.pref||contractTarget.loc,
      area: formData.area,
      contact1: formData.contact1,
      kDate: formData.kDate,
      kStart: formData.kStart||"—",
      dokosha: formData.dokosha,
      initial: formData.initial,
      monthly: formData.monthly,
      hp: formData.hp,
      hojokin: formData.hojokin,
    };
    setClients(p=>[newClient,...p]);
    setFollowCases(p=>p.filter(c=>c.id!==contractTarget.id));
    setContractTarget(null);
  };

  const genAI=async(c)=>{
    setAiLoad(p=>({...p,[c.id]:true}));
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,system:"不動産SaaS営業のアドバイザーです。案件の情報を読み、具体的なネクストアクションを1〜2文で提案してください。簡潔に日本語で。",messages:[{role:"user",content:`会社名: ${c.co}\nTier: ${c.tier}\n種別: ${c.type}\n次回接触日: ${c.next||"未定"}\n履歴: ${c.notes||"なし"}\nネクストアクションを提案してください。`}]})});
      const d=await r.json();
      setAiRes(p=>({...p,[c.id]:d.content?.[0]?.text||"取得失敗"}));
    }catch{setAiRes(p=>({...p,[c.id]:"エラーが発生しました"}));}
    setAiLoad(p=>({...p,[c.id]:false}));
  };

  return(
    <div>
      {contractTarget&&<ContractModal followCase={contractTarget} onConfirm={handleContractConfirm} onCancel={()=>setContractTarget(null)}/>}
      <div style={{fontSize:11,color:"#64748b",marginBottom:10,padding:"6px 10px",background:"#f0f9ff",borderRadius:6,border:"1px solid #bae6fd"}}>
        💡 Tier欄のドロップダウンから「契約」を選ぶと、詳細入力後に契約クライアントへ自動移動します
      </div>

      <div style={{marginBottom:14}}>
        <button onClick={()=>{ if(showAddForm){cancelFollowForm();}else{setEditFollowId(null);setAddForm(BLANK_FOLLOW);setShowAddForm(true);} }} style={{padding:"7px 16px",background:"linear-gradient(135deg,#2563eb,#3b82f6)",color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer"}}>
          {showAddForm?"✕ 閉じる":"＋ 追客案件を追加"}
        </button>
      </div>
      {showAddForm&&(
        <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:10,padding:16,marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12,color:"#1e3a8a"}}>{editFollowId!==null?"✏️ 追客案件を編集":"➕ 新規追客案件"}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:10}}>
            <div><div style={lbl}>Tier</div>{aslc("tier",["失注","A","B","C","D"])}</div>
            <div><div style={lbl}>種別</div>{aslc("type",["賃貸仲介","売買仲介","賃貸管理","総合不動産"])}</div>
            <div><div style={lbl}>利用システム①</div>{ainp("s1","例: いい生活")}</div>
            <div><div style={lbl}>利用システム②</div>{ainp("s2","例: ビジュアル")}</div>
            <div><div style={lbl}>所在地</div>{ainp("loc","例: 東京都新宿区")}</div>
            <div><div style={lbl}>電話番号</div>{ainp("ph","例: 03-0000-0000")}</div>
            <div><div style={lbl}>次回接触日</div>{ainp("next","例: 5/15")}</div>
          </div>
          <div style={{marginBottom:10}}><div style={lbl}>会社名 *</div>{ainp("co","会社名を入力")}</div>
          <div style={{marginBottom:10}}><div style={lbl}>担当者情報</div><textarea value={addForm.contact} onChange={e=>af("contact",e.target.value)} placeholder="例: 田中社長 080-0000-0000" rows={2} style={{width:"100%",padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,resize:"vertical",boxSizing:"border-box"}}/></div>
          <div style={{marginBottom:14}}><div style={lbl}>履歴メモ</div><textarea value={addForm.notes} onChange={e=>af("notes",e.target.value)} placeholder="商談メモ・状況など" rows={3} style={{width:"100%",padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,resize:"vertical",boxSizing:"border-box"}}/></div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={saveFollow} style={{padding:"7px 20px",background:"linear-gradient(135deg,#166534,#22c55e)",color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer"}}>{editFollowId!==null?"💾 更新":"✅ 追加"}</button>
            <button onClick={cancelFollowForm} style={{padding:"7px 16px",background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:8,fontSize:12,cursor:"pointer"}}>キャンセル</button>
          </div>
        </div>
      )}

      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {["全て",...TIERS_FOLLOW].map(f=>{
          const count=f==="全て"?followCases.length:(cnt[f]||0);
          const active=ftier===f;
          const col=TC[f]||{bg:"#f1f5f9",text:"#475569",border:"#cbd5e1"};
          return <button key={f} onClick={()=>setFtier(f)} style={{padding:"4px 10px",borderRadius:20,border:`1px solid ${active?col.border:"#e2e8f0"}`,background:active?col.bg:"white",color:active?col.text:"#64748b",fontWeight:active?700:400,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>{f}<span style={{background:active?col.border:"#e2e8f0",borderRadius:10,padding:"0 5px",fontSize:10}}>{count}</span></button>;
        })}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {shown.map(c=><CaseCard key={c.id} c={c} expanded={exp===c.id} onToggle={()=>setExp(exp===c.id?null:c.id)} aiLoad={aiLoad[c.id]} aiRes={aiRes[c.id]} onAI={()=>genAI(c)} onTierChange={handleTierChange} onDelete={id=>setFollowCases(p=>p.filter(c=>c.id!==id))} onEdit={startFollowEdit}/>)}
        {shown.length===0&&<div style={{textAlign:"center",padding:32,color:"#94a3b8",fontSize:13}}>該当案件なし</div>}
      </div>
    </div>
  );
}

// ── KPIカード ──────────────────────────────────────
function KpiCard({label,unit,act,tgt}){
  const noTarget=!tgt;
  const pct=noTarget?0:Math.min((act/tgt)*100,100);
  const col=noTarget?"#94a3b8":pct<20?"#ef4444":pct<50?"#f97316":"#22c55e";
  return(
    <div style={{background:"white",borderRadius:10,padding:14,border:"1px solid #e2e8f0",flex:1,minWidth:0}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
        <span style={{fontWeight:700,fontSize:14}}>{label}</span>
        <span style={{fontSize:11,color:"#94a3b8"}}>{noTarget?"目標未定":`目標 ${tgt}${unit}`}</span>
      </div>
      <div style={{fontSize:22,fontWeight:700,marginBottom:4}}>
        {typeof act==="number"&&!Number.isInteger(act)?act.toFixed(2):act}{unit}
        {!noTarget&&<span style={{fontSize:12,color:"#64748b",fontWeight:400,marginLeft:4}}>/ {tgt}{unit}</span>}
      </div>
      <div style={{background:"#f1f5f9",borderRadius:4,height:7,marginBottom:6}}>
        {!noTarget&&<div style={{background:col,width:`${pct}%`,height:7,borderRadius:4}}/>}
      </div>
      <div style={{fontSize:11,color:noTarget?"#94a3b8":col,fontWeight:700}}>{noTarget?"—":pct.toFixed(1)+"%"}</div>
    </div>
  );
}

// ── 月次案件タブ ───────────────────────────────────
function MonthlyTab({cases, setCases}){
  const [form,setForm]=useState(BLANK_MONTHLY);
  const [showForm,setShowForm]=useState(false);
  const [editId,setEditId]=useState(null);
  const KPI={keiyaku:5};
  const contractCnt=cases.filter(c=>c.tier==="契約").length;
  const totalAsp=cases.reduce((s,c)=>s+(Number(c.asp)||0),0);
  const totalShogu=cases.reduce((s,c)=>s+(Number(c.shogu)||0),0);
  const totalTsukin=cases.reduce((s,c)=>s+(Number(c.tsukin)||0),0);
  const f=(k,v)=>setForm(p=>({...p,[k]:v}));
  const save=()=>{
    if(!form.co.trim())return;
    if(editId!==null){setCases(p=>p.map(c=>c.id===editId?{...form,id:editId}:c));setEditId(null);}
    else setCases(p=>[...p,{...form,id:Date.now()}]);
    setForm(BLANK_MONTHLY);setShowForm(false);
  };
  const startEdit=(c)=>{setForm({...c});setEditId(c.id);setShowForm(true);};
  const del=(id)=>setCases(p=>p.filter(c=>c.id!==id));
  const inp=(k,ph)=><input value={form[k]} onChange={e=>f(k,e.target.value)} placeholder={ph} style={{padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,width:"100%",boxSizing:"border-box"}}/>;
  const slc=(k,opts)=><select value={form[k]} onChange={e=>f(k,e.target.value)} style={{padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,background:"white",width:"100%"}}>{opts.map(o=><option key={o} value={o}>{o}</option>)}</select>;
  const tiers=["契約","A","B","C","D","失注"];
  return(
    <div>
      <div className="kpi-row" style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
        <KpiCard label="契約" unit="本" act={contractCnt} tgt={KPI.keiyaku}/>
        <KpiCard label="ASP合計" unit="" act={totalAsp} tgt={null}/>
        <KpiCard label="初顧合計" unit="" act={totalShogu} tgt={null}/>
        <KpiCard label="月顧合計" unit="" act={totalTsukin} tgt={null}/>
      </div>
      <div style={{marginBottom:14}}>
        <button onClick={()=>{setShowForm(s=>!s);setEditId(null);setForm(BLANK_MONTHLY);}} style={{padding:"7px 16px",background:"linear-gradient(135deg,#2563eb,#3b82f6)",color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer"}}>
          {showForm&&editId===null?"✕ 閉じる":"＋ 案件を追加"}
        </button>
      </div>
      {showForm&&(
        <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:10,padding:16,marginBottom:20}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12,color:"#1e3a8a"}}>{editId!==null?"✏️ 案件を編集":"➕ 新規案件入力"}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:10}}>
            {[["日付","date","例: 5/2"],["担当","tanto","例: 武"],["ASP","asp","例: 2"],["初期","shogu","例: 23"],["月額","tsukin","例: 7.1"]].map(([l,k,p])=>(
              <div key={k}><div style={lbl}>{l}</div>{inp(k,p)}</div>
            ))}
            <div><div style={lbl}>形式</div>{slc("vtype",["V","訪","他"])}</div>
            <div><div style={lbl}>Tier</div>{slc("tier",["契約","A","B","C","D","失注"])}</div>
          </div>
          <div style={{marginBottom:10}}><div style={lbl}>会社名 *</div>{inp("co","会社名を入力")}</div>
          <div style={{marginBottom:10}}><div style={lbl}>ネクストアクション</div><textarea value={form.na} onChange={e=>f("na",e.target.value)} placeholder="例: 5月10日に再訪" rows={2} style={{width:"100%",padding:"5px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12,resize:"vertical",boxSizing:"border-box"}}/></div>
          <label style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontSize:12,color:"#64748b",cursor:"pointer"}}><input type="checkbox" checked={form.hojokin} onChange={e=>f("hojokin",e.target.checked)}/> 補助金案件</label>
          <div style={{display:"flex",gap:8}}>
            <button onClick={save} style={{padding:"7px 20px",background:"linear-gradient(135deg,#166534,#22c55e)",color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer"}}>{editId!==null?"💾 更新":"✅ 登録"}</button>
            <button onClick={()=>{setShowForm(false);setEditId(null);setForm(BLANK_MONTHLY);}} style={{padding:"7px 16px",background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:8,fontSize:12,cursor:"pointer"}}>キャンセル</button>
          </div>
        </div>
      )}
      {tiers.map(tier=>{
        const tc=TC[tier]||{bg:"#f1f5f9",text:"#475569"};
        const rows=cases.filter(c=>c.tier===tier);
        const aspSum=rows.reduce((s,c)=>s+(Number(c.asp)||0),0);
        return(
          <div key={tier} style={{marginBottom:14,background:"white",borderRadius:10,border:"1px solid #e2e8f0",overflow:"hidden"}}>
            <div style={{background:tc.bg,padding:"8px 14px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid #e2e8f0"}}>
              <span style={{background:tc.bg,color:tc.text,border:`1px solid ${tc.border}`,borderRadius:5,padding:"2px 8px",fontWeight:700,fontSize:11}}>{tier}</span>
              <span style={{fontSize:12,color:tc.text,fontWeight:600}}>{rows.length}本{aspSum>0?` · ASP ${aspSum}`:""}</span>
            </div>
            {rows.length===0?<div style={{padding:"12px 14px",color:"#94a3b8",fontSize:12}}>案件なし</div>:
            <div className="table-scroll-wrap"><table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead><tr style={{background:"#f8fafc"}}>{["日付","担当","形式","ASP","初期","月額","会社名","ネクストアクション",""].map((h,i)=><th key={i} style={{padding:"5px 10px",textAlign:"left",color:"#64748b",fontWeight:600,borderBottom:"1px solid #e2e8f0",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{rows.map((c,i)=>(
                <tr key={c.id} style={{background:i%2===0?"white":"#fafafa"}}>
                  <td style={{padding:"6px 10px",whiteSpace:"nowrap"}}>{c.date}</td>
                  <td style={{padding:"6px 10px"}}>{c.tanto}</td>
                  <td style={{padding:"6px 10px"}}><span style={{background:c.vtype==="V"?"#dbeafe":"#dcfce7",color:c.vtype==="V"?"#1d4ed8":"#166534",borderRadius:4,padding:"1px 5px"}}>{c.vtype}</span></td>
                  <td style={{padding:"6px 10px",fontWeight:700}}>{c.asp||"-"}</td>
                  <td style={{padding:"6px 10px"}}>{c.shogu||"-"}</td>
                  <td style={{padding:"6px 10px"}}>{c.tsukin||"-"}</td>
                  <td style={{padding:"6px 10px",fontWeight:600,whiteSpace:"nowrap"}}>{c.co}{c.hojokin&&<span style={{marginLeft:4,background:"#fef9c3",color:"#854d0e",borderRadius:3,padding:"0 4px",fontSize:10}}>補助金</span>}</td>
                  <td style={{padding:"6px 10px",color:"#64748b",maxWidth:180}}>{c.na}</td>
                  <td style={{padding:"6px 8px",whiteSpace:"nowrap"}}>
                    <button onClick={()=>startEdit(c)} style={{marginRight:4,padding:"2px 8px",fontSize:10,background:"#f1f5f9",border:"none",borderRadius:4,cursor:"pointer"}}>編集</button>
                    <button onClick={()=>del(c.id)} style={{padding:"2px 8px",fontSize:10,background:"#fee2e2",border:"none",borderRadius:4,cursor:"pointer",color:"#dc2626"}}>削除</button>
                  </td>
                </tr>
              ))}</tbody>
            </table></div>}
          </div>
        );
      })}
    </div>
  );
}

// ── 契約クライアントタブ ───────────────────────────
function MiniBar({val,max,color}){
  const w=max>0?(val/max)*100:0;
  return <div style={{background:"#f1f5f9",borderRadius:4,height:6,width:80}}><div style={{background:color,width:`${w}%`,height:6,borderRadius:4}}/></div>;
}

function ClientsTab({clients}){
  const [fGyoshu,setFGyoshu]=useState("全て");
  const [fContact,setFContact]=useState("全て");
  const [fDokosha,setFDokosha]=useState("全て");
  const [sortKey,setSortKey]=useState("kDate");
  const [exp,setExp]=useState(null);

  const gyoshus=["全て",...[...new Set(clients.map(c=>c.gyoshu))]];
  const contacts=["全て",...[...new Set(clients.map(c=>c.contact1))]];
  const dokoshas=["全て",...[...new Set(clients.map(c=>c.dokosha))]];

  const filtered=useMemo(()=>clients.filter(c=>
    (fGyoshu==="全て"||c.gyoshu===fGyoshu)&&
    (fContact==="全て"||c.contact1===fContact)&&
    (fDokosha==="全て"||c.dokosha===fDokosha)
  ).sort((a,b)=>sortKey==="monthly"?b.monthly-a.monthly:sortKey==="initial"?b.initial-a.initial:a.kDate>b.kDate?1:-1),[clients,fGyoshu,fContact,fDokosha,sortKey]);

  const totalMonthly=filtered.reduce((s,c)=>s+c.monthly,0);
  const totalInitial=filtered.reduce((s,c)=>s+c.initial,0);
  const maxMonthly=Math.max(1,...clients.map(c=>c.monthly));

  const FBtn=({val,cur,set,col})=>{
    const active=cur===val;
    return <button onClick={()=>set(val)} style={{padding:"3px 10px",borderRadius:20,border:"none",background:active?(col||"#2563eb"):"#f1f5f9",color:active?"white":"#475569",fontSize:11,cursor:"pointer",fontWeight:active?700:400,whiteSpace:"nowrap"}}>{val}</button>;
  };

  return(
    <div>
      <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
        <div style={{background:"linear-gradient(135deg,#6d28d9,#a78bfa)",color:"white",borderRadius:10,padding:14,flex:1,minWidth:110}}>
          <div style={{fontSize:11,opacity:.8,marginBottom:4}}>契約社数</div>
          <div style={{fontSize:22,fontWeight:700}}>{filtered.length}<span style={{fontSize:12,fontWeight:400,marginLeft:4}}>社</span></div>
        </div>
        <div style={{background:"linear-gradient(135deg,#0369a1,#38bdf8)",color:"white",borderRadius:10,padding:14,flex:1,minWidth:110}}>
          <div style={{fontSize:11,opacity:.8,marginBottom:4}}>月額合計</div>
          <div style={{fontSize:22,fontWeight:700}}>{totalMonthly.toFixed(2)}<span style={{fontSize:12,fontWeight:400,marginLeft:4}}>万</span></div>
        </div>
        <div style={{background:"linear-gradient(135deg,#b45309,#fcd34d)",color:"white",borderRadius:10,padding:14,flex:1,minWidth:110}}>
          <div style={{fontSize:11,opacity:.8,marginBottom:4}}>初期費用合計</div>
          <div style={{fontSize:22,fontWeight:700}}>{totalInitial.toFixed(1)}<span style={{fontSize:12,fontWeight:400,marginLeft:4}}>万</span></div>
        </div>
        <div style={{background:"linear-gradient(135deg,#166534,#4ade80)",color:"white",borderRadius:10,padding:14,flex:1,minWidth:110}}>
          <div style={{fontSize:11,opacity:.8,marginBottom:4}}>補助金あり</div>
          <div style={{fontSize:22,fontWeight:700}}>{filtered.filter(c=>c.hojokin).length}<span style={{fontSize:12,fontWeight:400,marginLeft:4}}>社</span></div>
        </div>
      </div>

      <div style={{background:"white",borderRadius:10,border:"1px solid #e2e8f0",padding:14,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:12,color:"#475569",marginBottom:10}}>1次接触 内訳</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {contacts.filter(c=>c!=="全て").map(c=>{
            const cnt=clients.filter(x=>x.contact1===c).length;
            const col=CONTACT_COL[c]||"#94a3b8";
            return(
              <div key={c} style={{display:"flex",alignItems:"center",gap:8,background:`${col}10`,borderRadius:8,padding:"6px 12px",border:`1px solid ${col}30`}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:col}}/>
                <span style={{fontSize:12,fontWeight:600,color:col}}>{c}</span>
                <span style={{fontSize:16,fontWeight:700,color:"#1e293b"}}>{cnt}</span>
                <span style={{fontSize:10,color:"#94a3b8"}}>社</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{display:"flex",gap:12,marginBottom:12,flexWrap:"wrap",alignItems:"flex-start"}}>
        <div><div style={{fontSize:10,color:"#94a3b8",marginBottom:4}}>業種</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{gyoshus.map(v=><FBtn key={v} val={v} cur={fGyoshu} set={setFGyoshu} col={GYOSHU_COL[v]}/>)}</div></div>
        <div><div style={{fontSize:10,color:"#94a3b8",marginBottom:4}}>1次接触</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{contacts.map(v=><FBtn key={v} val={v} cur={fContact} set={setFContact} col={CONTACT_COL[v]}/>)}</div></div>
        <div><div style={{fontSize:10,color:"#94a3b8",marginBottom:4}}>同行者</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{dokoshas.map(v=><FBtn key={v} val={v} cur={fDokosha} set={setFDokosha}/>)}</div></div>
        <div style={{marginLeft:"auto"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:4}}>並び替え</div>
          <select value={sortKey} onChange={e=>setSortKey(e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:11,background:"white",cursor:"pointer"}}>
            <option value="kDate">契約日順</option>
            <option value="monthly">月額高い順</option>
            <option value="initial">初期費用高い順</option>
          </select>
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(c=>{
          const isExp=exp===c.id;
          const contactCol=CONTACT_COL[c.contact1]||"#94a3b8";
          const gyoshuCol=GYOSHU_COL[c.gyoshu]||"#64748b";
          return(
            <div key={c.id} style={{background:"white",borderRadius:10,border:"1px solid #e2e8f0",borderLeft:`4px solid ${gyoshuCol}`,overflow:"hidden"}}>
              <div onClick={()=>setExp(isExp?null:c.id)} style={{padding:"11px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <span style={{fontSize:10,background:"#f1f5f9",color:"#475569",borderRadius:4,padding:"1px 6px",fontWeight:600,whiteSpace:"nowrap"}}>{c.tier}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                    <span style={{fontWeight:600,fontSize:13}}>{c.co}</span>
                    <span style={{background:`${gyoshuCol}18`,color:gyoshuCol,borderRadius:4,padding:"1px 6px",fontSize:10,fontWeight:600}}>{c.gyoshu}</span>
                    <span style={{background:`${contactCol}18`,color:contactCol,borderRadius:4,padding:"1px 6px",fontSize:10,fontWeight:600}}>{c.contact1}</span>
                    {c.hojokin&&<span style={{background:"#fef9c3",color:"#854d0e",borderRadius:4,padding:"1px 5px",fontSize:10}}>補助金</span>}
                  </div>
                  <div style={{display:"flex",gap:12,marginTop:3,fontSize:11,color:"#94a3b8",flexWrap:"wrap"}}>
                    {c.pref&&<span>📍 {c.pref} {c.area}</span>}
                    <span>🗓 契約 {c.kDate}</span>
                    <span>▶ 課金 {c.kStart}</span>
                    <span>👤 {c.dokosha}</span>
                  </div>
                </div>
                <div style={{textAlign:"right",minWidth:100}}>
                  <div style={{fontWeight:700,fontSize:15,color:"#1e293b"}}>{c.monthly}<span style={{fontSize:10,color:"#94a3b8",fontWeight:400}}>万/月</span></div>
                  <MiniBar val={c.monthly} max={maxMonthly} color={gyoshuCol}/>
                  <div style={{fontSize:10,color:"#94a3b8",marginTop:2}}>初期 {c.initial}万</div>
                </div>
                <span style={{color:"#94a3b8",fontSize:10}}>{isExp?"▲":"▼"}</span>
              </div>
              {isExp&&(
                <div style={{borderTop:"1px solid #f1f5f9",padding:"12px 14px",background:"#fafafa",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
                  {[["業種",c.gyoshu],["都道府県",c.pref],["エリア",c.area],["1次接触",c.contact1],["同行者",c.dokosha],["HPあり",c.hp?"あり":"なし"],["補助金",c.hojokin?"あり":"なし"],["月額費用",`${c.monthly}万`],["初期費用",`${c.initial}万`],["契約日",c.kDate],["課金開始日",c.kStart]].map(([k,v])=>(
                    <div key={k}><div style={{fontSize:10,color:"#94a3b8"}}>{k}</div><div style={{fontSize:12,fontWeight:600,color:"#334155"}}>{v}</div></div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length===0&&<div style={{textAlign:"center",padding:32,color:"#94a3b8",fontSize:13}}>該当クライアントなし</div>}
      </div>
    </div>
  );
}

// ── アプリ本体 ─────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("followup");
  const [followCases,setFollowCases]=useState(()=>{
    const saved = lsGet("follow_cases");
    return saved ? JSON.parse(saved) : INIT_FOLLOW;
  });
  const [clients,setClients]=useState(()=>{
    const saved = lsGet("clients");
    return saved ? JSON.parse(saved) : INIT_CLIENTS;
  });
  const [monthlyCases,setMonthlyCases]=useState(()=>{
    const saved = lsGet("monthly_cases");
    return saved ? JSON.parse(saved) : INIT_MONTHLY;
  });

  useEffect(()=>{ lsSet("follow_cases", JSON.stringify(followCases)); },[followCases]);
  useEffect(()=>{ lsSet("clients", JSON.stringify(clients)); },[clients]);
  useEffect(()=>{ lsSet("monthly_cases", JSON.stringify(monthlyCases)); },[monthlyCases]);

  const tabs=[
    {k:"clients",  icon:"🏆", l:"契約"},
    {k:"followup", icon:"📋", l:"追客中"},
    {k:"monthly",  icon:"📈", l:"月次KPI"},
  ];
  return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"#f1f5f9",minHeight:"100vh"}}>
      <div className="app-header" style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontWeight:700,fontSize:16}}>🏢 いえらぶ案件管理</div>
          <div style={{fontSize:11,opacity:.75}}>いえらぶGROUP · 営業1課 · 2026年5月</div>
        </div>
        <div style={{textAlign:"right",fontSize:11,opacity:.8}}>
          <div>追客 {followCases.length}社</div>
          <div>契約 {clients.length}社</div>
        </div>
      </div>
      <div className="content-area">
        {tab==="followup"&&<FollowupTab followCases={followCases} setFollowCases={setFollowCases} clients={clients} setClients={setClients}/>}
        {tab==="monthly"&&<MonthlyTab cases={monthlyCases} setCases={setMonthlyCases}/>}
        {tab==="clients"&&<ClientsTab clients={clients}/>}
      </div>
      <nav className="bottom-nav">
        {tabs.map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)}>
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label" style={{color:tab===t.k?"#2563eb":"#94a3b8",fontWeight:tab===t.k?700:400}}>{t.l}</span>
            {tab===t.k&&<span style={{width:20,height:2,background:"#2563eb",borderRadius:1}}/>}
          </button>
        ))}
      </nav>
    </div>
  );
}
