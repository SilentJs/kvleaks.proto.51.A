
function iconFixerOn(data) {
   document.querySelector(data).style.filter="invert(100%)"
}
function iconFixerOut(data) {
   document.querySelector(data).style.filter=""
}
function setBack(){
   document.querySelector('.nav').innerHTML=`<button onclick="window.location.href='index.html'" onmouseover="iconFixerOn('.hover1')" onmouseout="iconFixerOut('.hover1')" id="b1"  class="bMain b1"><img src="images/home.svg" class="hover1"><a class="text">Home</a></button>
   <button onclick="window.location.href='news.html'" onmouseover="iconFixerOn('.hover2')" onmouseout="iconFixerOut('.hover2')" id="b2"  class="bMain b2"><img src="images/news.svg" class="hover2"><a class="text">Newspage</a></button>
   <button onclick="window.location.href='announcement.html'" onmouseover="iconFixerOn('.hover25')" onmouseout="iconFixerOut('.hover25')" id="b2"  class="bMain b2"><img src="images/announcement.svg" class="hover25"><a class="text">Annoucements</a></button>
   <button onclick="findChannels()" onmouseover="iconFixerOn('.hover3')" onmouseout="iconFixerOut('.hover3')" id="b3" class="bMain b3"><img src="images/globe.svg" class="hover3"><a class="text">Channels</a></button>
   <button onmouseover="iconFixerOn('.hover4')" onmouseout="iconFixerOut('.hover4')" id="b4" class="bMain b4"><img src="images/info.svg" class="hover4"><a class="text">About Us</a></button>
   <button onmouseover="iconFixerOn('.hover5')" onmouseout="iconFixerOut('.hover5')" id="b5"class="bMain b5"><img src="images/download.svg"class="hover5"><a class="text">Downloads</a></button>
   <button onclick="getSettings()" onmouseover="iconFixerOn('.hover6')" onmouseout="iconFixerOut('.hover6')" id="b6" class="bMain b6"><img src="images/cog.svg" class="hover6"><a class="text">Settings</a></button>`
   document.querySelector('.Rnav').innerHTML=`<button onclick="window.location.href='index.html'" onmouseover="iconFixerOn('.hover1')" onmouseout="iconFixerOut('.hover1')" id="b1"  class="rMain b1"><img src="images/home.svg" class="hover1"><a class="text">Home</a></button>
   <button onclick="window.location.href='news.html'" onmouseover="iconFixerOn('.hover2')" onmouseout="iconFixerOut('.hover2')" id="b2"  class="rMain b2"><img src="images/news.svg" class="hover2"><a class="text">Newspage</a></button>
   <button onclick="window.location.href='announcement.html'" onmouseover="iconFixerOn('.hover25')" onmouseout="iconFixerOut('.hover25')" id="b2"  class="rMain b2"><img src="images/announcement.svg" class="hover25"><a class="text">Annoucements</a></button>
   <button onclick="findChannels()" onmouseover="iconFixerOn('.hover3')" onmouseout="iconFixerOut('.hover3')" id="b3" class="rMain b3"><img src="images/globe.svg" class="hover3"><a class="text">Channels</a></button>
   <button onmouseover="iconFixerOn('.hover4')" onmouseout="iconFixerOut('.hover4')" id="b4" class="rMain b4"><img src="images/info.svg" class="hover4"><a class="text">About Us</a></button>
   <button onmouseover="iconFixerOn('.hover5')" onmouseout="iconFixerOut('.hover5')" id="b5"class="rMain b5"><img src="images/download.svg"class="hover5"><a class="text">Downloads</a></button>
   <button onclick="getSettings()" onmouseover="iconFixerOn('.hover6')" onmouseout="iconFixerOut('.hover6')" id="b6" class="rMain b6"><img src="images/cog.svg" class="hover6"><a class="text">Settings</a></button>`
   document.querySelectorAll('.rMain').forEach((data)=>data.style.margin='20px 0px 20px 0px');
   document.querySelectorAll('.rMain').forEach((data)=>data.style.padding='10px 5px 5px 20px');
   document.querySelectorAll('.rMain').forEach((data)=>data.style.height='50px');
}
function getHiddenChats(string){
   if(string!=='Admin'&&string!=='VIP'){return}
   document.querySelector('.nav').innerHTML=`
   <button onclick="joinChat('VIP1');setBack();" onmouseover="iconFixerOn('.hover')" onmouseout="iconFixerOut('.hover')" id="b1"  class="bMain b1"><img src="images/crown.svg" class="hover"><a class="text">VipChat 1</a></button>
   <button onclick="joinChat('VIP2');setBack();" onmouseover="iconFixerOn('.hover1')" onmouseout="iconFixerOut('.hover1')" id="b1"  class="bMain b1"><img src="images/crown.svg" class="hover1"><a class="text">VipChat 2</a></button>
   <button onclick="joinChat('VIP3');setBack();" onmouseover="iconFixerOn('.hover2')" onmouseout="iconFixerOut('.hover2')" id="b2"  class="bMain b2"><img src="images/crown.svg" class="hover2"><a class="text">VipChat 3</a></button>`

   document.querySelector('.Rnav').innerHTML=`
   <button onclick="joinChat('VIP1');setBack();" onmouseover="iconFixerOn('.hover')" onmouseout="iconFixerOut('.hover')" id="b1"  class="rMain b1"><img src="images/crown.svg" class="hover"><a class="text">VipChat 1</a></button>
   <button onclick="joinChat('VIP2');setBack();" onmouseover="iconFixerOn('.hover1')" onmouseout="iconFixerOut('.hover1')" id="b1"  class="rMain b1"><img src="images/crown.svg" class="hover1"><a class="text">VipChat 2</a></button>
   <button onclick="joinChat('VIP3');setBack();" onmouseover="iconFixerOn('.hover2')" onmouseout="iconFixerOut('.hover2')" id="b2"  class="rMain b2"><img src="images/crown.svg" class="hover2"><a class="text">VipChat 3</a></button>`
}

function findChannels(){
   document.querySelector('.nav').innerHTML=`
       <button onclick="joinChat('allchat');setBack();allChatFucs()" onmouseover="iconFixerOn('.hover')" onmouseout="iconFixerOut('.hover')" id="b1"  class="bMain b1"><img src="images/globe.svg" class="hover"><a class="text">Allchat</a></button>
       <button onclick="joinChat('class12');setBack();" onmouseover="iconFixerOn('.hover1')" onmouseout="iconFixerOut('.hover1')" id="b1"  class="bMain b1"><img src="images/flag.svg" class="hover1"><a class="text">Class 12</a></button>
       <button onclick="joinChat('class11');setBack();" onmouseover="iconFixerOn('.hover2')" onmouseout="iconFixerOut('.hover2')" id="b2"  class="bMain b2"><img src="images/flag.svg" class="hover2"><a class="text">Class 11</a></button>
       <button onclick="joinChat('class10');setBack();" onmouseover="iconFixerOn('.hover3')" onmouseout="iconFixerOut('.hover3')" id="b3" class="bMain b3"><img src="images/flag.svg" class="hover3"><a class="text">Class 10</a></button>
       <button onclick="joinChat('class9');setBack();" onmouseover="iconFixerOn('.hover4')" onmouseout="iconFixerOut('.hover4')" id="b4" class="bMain b4"><img src="images/flag.svg" class="hover4"><a class="text">Class 9</a></button>
       <button onclick="joinChat('class8');setBack();" onmouseover="iconFixerOn('.hover5')" onmouseout="iconFixerOut('.hover5')" id="b5"class="bMain b5"><img src="images/flag.svg" class="hover5"><a class="text">Class 8</a></button>
       <button onclick="joinChat('class7');setBack();" onmouseover="iconFixerOn('.hover6')" onmouseout="iconFixerOut('.hover6')" id="b6" class="bMain b6"><img src="images/flag.svg"class="hover6"><a class="text">Class 7</a></button>
       <button onclick="joinChat('class6');setBack();" onmouseover="iconFixerOn('.hover7')" onmouseout="iconFixerOut('.hover7')" id="b6" class="bMain b6"><img src="images/flag.svg" class="hover7"><a class="text">Class 6</a></button>
       <button onclick="joinChat('class5');setBack();" onmouseover="iconFixerOn('.hover8')" onmouseout="iconFixerOut('.hover8')" id="b6" class="bMain b6"><img src="images/flag.svg" class="hover8"><a class="text">Class 5</a></button>`
       document.querySelector('.Rnav').innerHTML=`
       <button onclick="joinChat('allchat');setBack();allChatFucs();" onmouseover="iconFixerOn('.hover')" onmouseout="iconFixerOut('.hover')" id="b1"  class="rMain b1"><img src="images/globe.svg" class="hover"><a class="text">Allchat</a></button>
       <button onclick="joinChat('class12');setBack();" onmouseover="iconFixerOn('.hover1')" onmouseout="iconFixerOut('.hover1')" id="b1"  class="rMain b1"><img src="images/flag.svg" class="hover1"><a class="text">Class 12</a></button>
       <button onclick="joinChat('class11');setBack();" onmouseover="iconFixerOn('.hover2')" onmouseout="iconFixerOut('.hover2')" id="b2"  class="rMain b2"><img src="images/flag.svg" class="hover2"><a class="text">Class 11</a></button>
       <button onclick="joinChat('class10');setBack();" onmouseover="iconFixerOn('.hover3')" onmouseout="iconFixerOut('.hover3')" id="b3" class="rMain b3"><img src="images/flag.svg" class="hover3"><a class="text">Class 10</a></button>
       <button onclick="joinChat('class9');setBack();" onmouseover="iconFixerOn('.hover4')" onmouseout="iconFixerOut('.hover4')" id="b4" class="rMain b4"><img src="images/flag.svg" class="hover4"><a class="text">Class 9</a></button>
       <button onclick="joinChat('class8');setBack();" onmouseover="iconFixerOn('.hover5')" onmouseout="iconFixerOut('.hover5')" id="b5"class="rMain b5"><img src="images/flag.svg" class="hover5"><a class="text">Class 8</a></button>
       <button onclick="joinChat('class7');setBack();" onmouseover="iconFixerOn('.hover6')" onmouseout="iconFixerOut('.hover6')" id="b6" class="rMain b6"><img src="images/flag.svg" class="hover6"><a class="text">Class 7</a></button>
       <button onclick="joinChat('class6');setBack();" onmouseover="iconFixerOn('.hover7')" onmouseout="iconFixerOut('.hover7')" id="b6" class="rMain b6"><img src="images/flag.svg" class="hover7"><a class="text">Class 6</a></button>
       <button onclick="joinChat('class5');setBack(); onmouseover="iconFixerOn('.hover8')" onmouseout="iconFixerOut('.hover8')" id="b6" class="rMain b6"><img src="images/flag.svg"class="hover8"><a class="text">Class 5</a></button>`
       document.querySelectorAll('.bMain').forEach((data)=>data.style.margin='30px 0px 0px 0px');
       document.querySelectorAll('.rMain').forEach((data)=>data.style.margin='20px 0px 0px 0px');
       document.querySelectorAll('.rMain').forEach((data)=>data.style.padding='5px 0px 0px 20px');
       document.querySelectorAll('.rMain').forEach((data)=>data.style.height='40px');
}

function allChatFucs(){
   document.getElementById('navFooter').innerHTML='<img src="images/people.svg">View Members';
   document.getElementById('navFooterR').innerHTML='<img src="images/people.svg">View Members';
   document.getElementById('navFooter').style.opacity='0.3'
   document.getElementById('navFooterR').style.opacity='0.3'
}


function getSettings(){
   var checkState
   if(localStorage.displayMode==='LIGHT'){
      checkState='checked="true"'
   }else if(localStorage.displayMode==='DARK'){
      checkState=''
   }
   document.querySelector('.nav').innerHTML=`
   <img class="backbtn" onclick="setBack()" src="images/back-arrow.svg">
   <div class="setContainer sCon1">Dark team or light?
   <div class = 'toggle-switch'>
   <label class='label'>
       <input class="input" id="mChanger" type = 'checkbox' ${checkState}>
       <span onclick="setMode()" class = 'slider'></span>
   </label>
</div></div><br>
<div class="setContainer sCon2">
AutoScroll?
<label class="Atoggle toggleB1">
</label>
</div><br>`
   document.querySelector('.Rnav').innerHTML=`
   <img class="Rbackbtn" onclick="setBack()" src="images/back-arrow.svg">
   <div class="setContainer sCon1">Dark team or light?
   <div class = 'toggle-switch'>
   <label class='label'>
       <input class="input" id="mChanger" type = 'checkbox' ${checkState}>
       <span onclick="setMode()" class = 'slider'></span>
   </label>
</div></div><br>
<div class="setContainer sCon2">
AutoScroll?
<label class="Atoggle toggleB2">
</label>
</div><br>`
if(!localStorage.getItem('AutoScroll')){
   localStorage.setItem('AutoScroll','ON');
   }else if(localStorage.getItem('AutoScroll')==='OFF'){
       document.querySelector('.toggleB1').innerHTML=`	<input class="Atoggle-checkbox" type="checkbox">
       <div onclick="changeAutoScroll()" class="Atoggle-switch"></div>
       <span class="Atoggle-label"></span>`
       document.querySelector('.toggleB2').innerHTML=`	<input class="Atoggle-checkbox" type="checkbox">
       <div onclick="changeAutoScroll()" class="Atoggle-switch"></div>
       <span class="Atoggle-label"></span>`
   }else{
      document.querySelector('.toggleB1').innerHTML=`	<input class="Atoggle-checkbox" type="checkbox" checked>
      <div onclick="changeAutoScroll()" class="Atoggle-switch"></div>
      <span class="Atoggle-label"></span>`
      document.querySelector('.toggleB2').innerHTML=`	<input class="Atoggle-checkbox" type="checkbox" checked>
      <div onclick="changeAutoScroll()" class="Atoggle-switch"></div>
      <span class="Atoggle-label"></span>`
   }

}

function setMode(){
   var parsedPro=JSON.parse(localStorage.Profile)
   console.log('setMode')
   if(localStorage.displayMode==='LIGHT'){
      localStorage.displayMode='DARK'
      changeMode('DARK')
      socket.emit('profileScreenUpdate',{Name:parsedPro.name,ID:parsedPro.id,IP:parsedPro.ip,Mode:'DARK'})
   }else if(localStorage.displayMode==='DARK'){
      localStorage.displayMode='LIGHT'
      changeMode('LIGHT')
      socket.emit('profileScreenUpdate',{Name:parsedPro.name,ID:parsedPro.id,IP:parsedPro.ip,Mode:'LIGHT'})
   }
}