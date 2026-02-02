const tg = window.Telegram.WebApp;
tg.expand();
document.querySelectorAll('.topic').forEach(btn=>{
  btn.onclick=()=>tg.sendData(JSON.stringify({topic:btn.innerText}));
});