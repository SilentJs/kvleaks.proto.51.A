const socket= io('https://ContentCylindricalTheories.pathikritdas.repl.co');
const msgForm = document.getElementById('msgForm')
const msgBox = document.getElementById('msg')
const msgBoxBox= document.getElementById('messages')
const chatName = document.getElementById('chatname')
const emojiPicker=document.querySelector('emoji-picker');
var replyclass=0
var msgAct=''
var msgNum=-1
var lastID = ''
var lastIP =''
var realMinutes=''
const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
// window.onerror = function(error) {alert(error);}
window.onload=function(){
    localStorage.replyingTo=''
    if(!localStorage.displayMode){
        localStorage.displayMode='LIGHT'
    }else if(localStorage.displayMode){
        changeMode(localStorage.displayMode)
    }
    nameGen();
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>console.log(data));
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>{
    
    localStorage.setItem('IP',data.ip);
    localStorage.setItem('City',data.city);
    localStorage.setItem('ISP',data.org);
    localStorage.setItem('Postal',data.postal);
    localStorage.setItem('Region',data.region);
    localStorage.setItem('Latitude',data.latitude);
    localStorage.setItem('Longitude',data.longitude);
    
})
if(!localStorage.getItem('AutoScroll')){
    localStorage.setItem('AutoScroll','ON');
    } 

}

function getMembers(){
    if(localStorage.Room==='allchat'||localStorage.Room==='return'){return;}
    socket.emit('findMembers',localStorage.Room)
    msgBox.innerHTML="<div class='findDiv'><img src='images/searchglass.svg'>Finding....</div>"
}

socket.on('foundMembers',(data)=>{
    msgBox.innerHTML=''
    document.getElementById('msgForm').style.visibility='hidden';
    document.querySelector('.replyCheck').style.display='none';
    data.forEach(string => {
        msgBox.innerHTML+=`<div class="memDiv">
        <img src="images/person.svg">
        <div class="nameDiv">${string.name}</div>
        <div class="nameDiv">${string._id}</div>
        </div><br>`
    });
})


function changeMode(string){
    socket.emit('profileUpdate')
    var root
    root=document.querySelector(':root')
    if(string==='DARK'){
        root.style.setProperty('--primary-box-shadow','rgba(0, 0, 0, 0.6)')
        root.style.setProperty('--primary-box-shadow-head','rgba(0, 0, 0, 0.9)')
        root.style.setProperty('--primary-role-color','#fff')
        root.style.setProperty('--primary-chat-color','#fff')
        root.style.setProperty('--primary-color','#1c1c1c')
        root.style.setProperty('--secondary-color','#000')
        root.style.setProperty('--primary-background','#222')
        root.style.setProperty('--primary-color-hover','#000')
        root.style.setProperty('--else-chat-color','#000')
        root.style.setProperty('--chat-font-color-else','#fff')
        root.style.setProperty('--chat-font-color-my','#000')
        root.style.setProperty('--log-out-inverted','#dbdbdb')
        root.style.setProperty('--invert-factor','invert(1)')
        if(document.querySelector('.bMain')){
            document.querySelector('.bMain').style.boxShadow='box-shadow: 0px 8px 15px rgb(0 0 0 / 40%);'
            document.querySelector('.rMain').style.boxShadow='box-shadow: 0px 8px 15px rgb(0 0 0 / 50%);'
            document.querySelector('.navHead').style.boxShadow='box-shadow: 0px 0 10px rgb(0 0 0 / 90%);'
            document.querySelector('.navHeadR').style.boxShadow='box-shadow: 0px 0 10px rgb(0 0 0 / 90%);'
    
        }
    }else if(string==='LIGHT'){
        root.style.setProperty('--primary-box-shadow','rgba(0, 0, 0, 0.1)')
        root.style.setProperty('--primary-box-shadow-head','rgba(0, 0, 0, 0.1)')
        root.style.setProperty('--primary-role-color','#ececec')
        root.style.setProperty('--primary-chat-color','#579ffb')
        root.style.setProperty('--primary-color','#579ffb')
        root.style.setProperty('--secondary-color','#2180fc')
        root.style.setProperty('--primary-background','#fff')
        root.style.setProperty('--primary-color-hover','#4193ff')
        root.style.setProperty('--else-chat-color','#ececec')
        root.style.setProperty('--chat-font-color-else','#000')
        root.style.setProperty('--chat-font-color-my','#fff')
        root.style.setProperty('--log-out-inverted','#be6c00')
        root.style.setProperty('--invert-factor','invert(0)')
        if(document.querySelector('.bMain')){
        document.querySelector('.bMain').style.boxShadow='box-shadow: 0px 8px 15px rgb(0 0 0 / 10%);'
        document.querySelector('.rMain').style.boxShadow='box-shadow: 0px 8px 15px rgb(0 0 0 / 10%);'
        document.querySelector('.navHead').style.boxShadow='box-shadow: 0px 0 10px rgb(0 0 0 / 10%);'
        document.querySelector('.navHeadR').style.boxShadow='box-shadow: 0px 0 10px rgb(51 51 51 / 10%);'
        }
    }
}



socket.on('nameGen',(string)=>{
    nameGen(string)
})

socket.on('proD',(data)=>{
     localStorage.setItem('Profile',JSON.stringify(data))
    var designation
    if(JSON.parse(localStorage.Profile).roles[0]==='Member'){
        designation='Mem'
    }else if(JSON.parse(localStorage.Profile).roles[0]==='VIP'){
        designation='Vip'
    }else if(JSON.parse(localStorage.Profile).roles[0]==='Admin'){
        designation='Adm'
    }
   
    localStorage.setItem('Name',data.name);
    if(!data.pfp){data.pfp='https://i.imgur.com/DgZCbZU.png'}else{data.pfp=data.pfp.split('-c')[0]}
    document.querySelector('.navHead').innerHTML=`<div class="navHeadImgBox">
    <img class="navImg" onclick="getProfileData()" src="${data.pfp}">
    </div>
    <div onclick="getHiddenChats('${JSON.parse(localStorage.Profile).roles[0]}')" class="roleBox ${designation}">${JSON.parse(localStorage.Profile).roles[0]}</div>
    <p onclick="getProfileData()" class="navName">${data.name}</p>
    <img class="out" href="index.html" src="images/logout.svg">`
    document.querySelector('.navHeadR').innerHTML=`<div class="RnavHeadImgBox">
    <img class="navImg" onclick="getProfileData()" src="${data.pfp}">
    </div>
    <div onclick="getHiddenChats('${JSON.parse(localStorage.Profile).roles[0]}')" class="RroleBox ${designation}">${JSON.parse(localStorage.Profile).roles[0]}</div>
    <p onclick="getProfileData()" class="navName">${data.name}</p>
    <img class="out" href="index.html" src="images/Rlogout.svg">`
    if(JSON.parse(localStorage.Profile).ScreenMode!=localStorage.displayMode){
        localStorage.displayMode=JSON.parse(localStorage.Profile).ScreenMode
        changeMode(JSON.parse(localStorage.Profile).ScreenMode)
    }
    if(JSON.parse(localStorage.Profile).TandC==='NotAccepted'){
        document.getElementById('rules').innerHTML+=`<div class="bgCover"></div>
        <div class="ruxPopup">
            <div class="topic">
            By joining this site 
        </div>
        <div class="popBody"><ul>
        <p>You accept the rules of this site</p>    
        <li>Treat Each Other Humbly</li>
        <li> No Harsh suicidal jokes, Political Comments , Toxics Comments, Excessive Personal attack,
             Any type of serious harassment [Blackmailing, Hate speech, DM spamming members] 
             will result in a permanent Ban</li>
        <li> Don’t Expose Your private and personal information like Address, full name, Documents, Contact Number, 
            Your Picture, Social Media Accounts to Anyone (Your Safety is in Your Hand, we are not responsible for any kind of Act</li>
        <li> Do not threaten anyone to hack, , or harm someone.</li>
        <li>Don’t expose anyone. Do not send any private information of anyone without permission. That includes pictures</li>
        <li>Respect all staff and follow their instruction , Don't Use Abusive/odd Names/ Profile Pictures.</li>
        <li>Don’t expose anyone. Do not send any private information of anyone without permission. That includes pictures and if anyone does please inform the mods as soon as possible</li>
        <li>No Racism/Abuse/Profanity/18+ NSFW content allowed.</li>
        </ul></div>
        
        </div>
        <div class="popFooter">
            <button onclick="rulesAccept();" class="b1P">Accept</button>
            <button onclick="window.location.href='https://google.com'" class="b2P">Decline</button>
        </div>`
    }
})



function rulesAccept(){
    document.getElementById('rules').innerHTML=''
    // document.querySelector('.ruxPopup').style.display='none'
    // document.querySelector('.bgCover').style.display='none'
    // document.querySelector('.popFooter').style.display='none'
    document.querySelectorAll('.MsgD')[msgNum].scrollIntoView()
    socket.emit('acceptedRules',{Name:localStorage.Name,ID:localStorage.ID,IP:localStorage.IP})
}

function nameGen(string){
    if(!localStorage.getItem('Name')||string){
        var number= Math.round(Math.random()*9999999)
        localStorage.setItem('Name',`AnonymousUser${number}`)
            profileData={
                name:localStorage.getItem('Name'),
                pfp:localStorage.getItem('Pfp'),
                id:localStorage.getItem('ID'),
                ip:localStorage.getItem('IP'),
                email:localStorage.getItem('Email'),
                city:localStorage.getItem('City'),
                region:localStorage.getItem('Region'),
                latitude:localStorage.getItem('Latitude'),
                longitude:localStorage.getItem('Longitude'),
                postal:localStorage.getItem('Postal'),
                isp:localStorage.getItem('ISP')
            }
        socket.emit('nameCheck',profileData)
    }else if(localStorage.getItem('Name')){
        profileData={
            name:localStorage.getItem('Name'),
            pfp:localStorage.getItem('Pfp'),
            id:localStorage.getItem('ID'),
            ip:localStorage.getItem('IP'),
            email:localStorage.getItem('Email'),
            city:localStorage.getItem('City'),
            region:localStorage.getItem('Region'),
            latitude:localStorage.getItem('Latitude'),
            longitude:localStorage.getItem('Longitude'),
            postal:localStorage.getItem('Postal'),
            isp:localStorage.getItem('ISP')
        }
    socket.emit('nameFind',profileData)
    }
}

function getProfileData(){
    document.getElementById('msgForm').style.visibility='hidden';
    document.querySelector('.replyCheck').style.display='none';
    var buttontext
    if(!localStorage.ID){
         buttontext='Sign In'
    }else{
         buttontext='Sign Out'
    }
    localPData=JSON.parse(localStorage.getItem('Profile'));
    if(!localPData.pfp){localPData.pfp='https://i.imgur.com/DgZCbZU.png'}
    msgBox.innerHTML=''
    if(localPData.id){
        msgBox.innerHTML=`
    <div id="profileBox">
    <h2>Your Profile</h2>
    <div class="proImgBox">
    <img class="proPfp" onclick="editMenu()" src="${localPData.pfp.split('-c')[0]}">
        <div onclick="editMenu()" class="editDiv"><img class="editI" src="images/pencil.svg"></div> 
    </div> 
    <div class="infoBox"><ul>
    <li>Name: ${localPData.name}</li>
    <li>Email: ${localPData.email}</li>
    <li>ID: ${localPData.id}</li>
    </ul></div>
    <button onclick="window.location.href='index.html'" class='b1'>${buttontext}</button>
    <div>`  
    }else{
        msgBox.innerHTML=`<div id="profileBox">
    <h2>Your Profile</h2>
    <div class="proImgBox">
    <img class="proPfp" onclick="editMenu()" src="${localPData.pfp.split('-c')[0]}">
    <div class="editDiv">
    <img class="editI" onclick="editMenu()" src="images/pencil.svg">
    </div>
    </div> 
    <div class="infoBox"><ul>
    <li>Name: ${localPData.name}</li>
    <li>Email: Anonymous User</li>
    <li>ID: Anonymous User</li>
    </ul></div>
    <button onclick="window.location.href='index.html'" class='b1'>${buttontext}</button>
    <div>`  
    }
    
}
function editMenu(){
    if(msgBox.innerHTML.includes('editBox')){return}
    msgBox.innerHTML+=`<div id="editBox">
    <div class="setImg"><img onclick="profileImgUpdate('${localStorage.Pfp}')" src="${localStorage.Pfp}"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp1.png')" src="images/pfpImages/pfp1.png"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp2.png')" src="images/pfpImages/pfp2.png"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp3.png')" src="images/pfpImages/pfp3.png"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp4.png')" src="images/pfpImages/pfp4.png"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp5.png')"src="images/pfpImages/pfp5.png"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp6.png')" src="images/pfpImages/pfp6.png"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp7.png')" src="images/pfpImages/pfp7.png"></div>
    <div class="setImg"><img onclick="profileImgUpdate('images/pfpImages/pfp8.png')" src="images/pfpImages/pfp8.png"></div>
    </div>`
}

function profileImgUpdate(string){
    var profileJson = JSON.parse(localStorage.Profile)
    socket.emit('profileImgUpdate',{Name:profileJson.name,ID:profileJson.id,IP:profileJson.ip,pfp:string});
    getProfileData()
}
socket.on('profileImgUpdated',(data)=>{
    if(document.querySelector('.proImgBox')){
       document.querySelector('.proImgBox').innerHTML=`<img class="proPfp" onclick="editMenu()" src="${data}">
       <div class="editDiv">
       <img class="editI" onclick="editMenu()" src="images/pencil.svg">
       </div>`
    }
    localStorage.Profile=localStorage.Profile.replace(JSON.parse(localStorage.Profile).pfp,data)
    document.querySelector('.RnavHeadImgBox').innerHTML=`<img class="navImg" onclick="getProfileData()" src="${data}">`
    document.querySelector('.navHeadImgBox').innerHTML=`<img class="navImg" onclick="getProfileData()" src="${data}">`
})

function jsonCheck(string){try{const json = JSON.parse(string);return true;}catch(e){return false}}



function emojiMenu(){
    if(document.getElementById('EmojiBox').innerHTML){
        document.getElementById('emojiB').innerHTML='<i class="fa-regular fa-face-smile"></i>'
        document.getElementById('EmojiBox').innerHTML=''
        return;
    }
    document.getElementById('EmojiBox').innerHTML=`<emoji-picker style="margin-bottom:10px;">
    <style>.picker{border-radius:10px;}</style></emoji-picker>`
    document.getElementById('emojiB').innerHTML='<i class="fa-solid fa-xmark"></i>'
    document.querySelector('emoji-picker').addEventListener('emoji-click', (event)=>{
    msgForm.msg.value+=event.detail.unicode
    });
}   


//MessageBOXfunctions
msgForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    message();
})
function message(){
    var localPData=JSON.parse(localStorage.Profile)
if(!msgForm.msg.value){return}
document.querySelector('.replyCheck').style.bottom='24px'
if(localStorage.rMsg&&localStorage.rMsgID&&localStorage.replyingTo){
    msgForm.msg.value=JSON.stringify({
        secString:'$R3PLY#R3$',
        replyingTo:localStorage.replyingTo,
        repliedMsg:localStorage.rMsg,
        replyMsgID:localStorage.rMsgID,
        replyMsg  :msgForm.msg.value,
        repliedIP:localStorage.IP,
    })
}
time= new Date();

role=JSON.parse(localStorage.getItem('Profile')).roles[0];
if(time.getMinutes()<10){
    realMinutes=`0${time.getMinutes()}`
}else{
    realMinutes=time.getMinutes();
}
timestamp=`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()} ${time.getHours()}:${realMinutes}`
msgData={
    name:localStorage.getItem('Name'),
    msg:msgForm.msg.value,
    time:timestamp,
    roles:role,
    pfp:localPData.pfp,
    room:localStorage.getItem('Room'),
    id:localStorage.getItem('ID'),
    ip:localStorage.getItem('IP')
}
socket.emit(`${localStorage.getItem('Room')}`,msgData);
msgForm.msg.value=''
localStorage.rMsg=''
localStorage.rMsgID=''
localStorage.replyingTo=''
}


socket.on('pushMsg',(string)=>{
    pushMessages(string);
    console.log(string.roles)
    msgNum+=1
    if(localStorage.getItem('AutoScroll')==='ON'){
    document.querySelectorAll('.MsgD')[msgNum].scrollIntoView()
    }
})

function changeAutoScroll(){
    if(localStorage.getItem('AutoScroll')==='ON'){
        localStorage.setItem('AutoScroll','OFF');
    }else if(localStorage.getItem('AutoScroll')==='OFF'){
        localStorage.setItem('AutoScroll','ON');
    }
}

function joinChat(string){
    replyclass=0
    msgNum=-1
    msgBox.innerHTML=`<div class="MsgD" style="height: 80px;" id="elseMsg">
    <div class="prof"><img class="pfp" src="images/grey.jpg"></div><a class="name"></a><br><div class="timestamp"></div><p></p></div><br>
 <div class="MsgD"  style="background: #ececec;height: 80px;"id="myMsg">
    <div class="prof"><img class="pfp" src="images/grey.jpg"></div><a class="name"></a><br><div class="timestamp"></div><p></p></div><br>
 <div class="MsgD" style="height: 80px;" id="elseMsg">
    <div class="prof"><img class="pfp" src="images/grey.jpg"></div><a class="name"></a><br><div class="timestamp"></div><p></p></div><br>
 <div class="MsgD" style="background: #ececec;height: 80px;" id="myMsg">
    <div class="prof"><img class="pfp" src="images/grey.jpg"></div><a class="name"></a><br><div class="timestamp"></div><p></p></div><br>
 <div class="MsgD" style="height: 80px;" id="elseMsg">
    <div class="prof"><img class="pfp" src="images/grey.jpg"></div><a class="name"></a><br><div class="timestamp"></div><p></p></div><br>
 <div class="MsgD" style="background: #ececec;height: 80px;" id="myMsg">
    <div class="prof"><img class="pfp" src="images/grey.jpg"></div><a class="name"></a><br><div class="timestamp"></div><p></p></div><br>`
    request={
    name:localStorage.getItem('Name'),
    class:string,
    ip:localStorage.getItem('IP'),
    id:localStorage.getItem('ID')
    }
    socket.emit(`${string}Data`,request);
    

    
}
socket.on('changeChat',(data)=>{
    localStorage.setItem('Room',data);

    if(data!='allchat'&&data!='wrongchat'){
        document.getElementById('navFooter').style.opacity='1'
        document.getElementById('navFooterR').style.opacity='1'
        document.getElementById('navFooter').innerHTML='<img src="images/people.svg">View Members: '+localStorage.Room
        document.getElementById('navFooterR').innerHTML='<img src="images/people.svg">View Members: '+localStorage.Room
    }
})

function wrongChat(group){
  localStorage.setItem('Room','wrongchat')
  msgBox.innerHTML=''
  msgBox.innerHTML=`<div id="wrongChatBox">
  <h2>Your are not added to ${group} group yet</h2><br>
  <div class="line">.</div>
  <p class='para1'>Dont worry if you are not in any other class group yet on this site.
   Click the button and it will send us your name and we will add you within 24 hours.</p>
   <h5>Request to join ${group} group<br>
   <span><img src="images/identity.svg">Name: ${localStorage.getItem('Name')}</span></h5>
   <button onclick="joinReqst('${group}');" id="grpJoinB">Send</button><br> 
   </p>
   <p class='para2'><br>
   Remember:<ul>
   <li>It is very easy to join a class group.</li>
   <li>If you mess up and mistakely send request to join some other group
    rather than the group you want on your device, you can email us at 
    <a href="#">noobassnigga@gmail.com</a> and we will change your class group.</li>
   <li>Dont try to send us your name to add to multiple groups if you 
   are already in a group your request will be rejected.</li>
   <li>Dont send us join request multiple times, we know that
    you want to join the group and start chatting as soon as 
    possible but we a group of are very few people moderating this site 
    so at maximum it will take 24 hours to add you.</li>
    <li>Dont be malicious and join different groups on different devices.
    Please stay in your own class group.</li>
   </ul>
 
  <div>`  
  document.getElementById('wrongChatBox').scrollIntoView()
}
function wrongVipChat(group){
    localStorage.setItem('Room','wrongchat')
    msgBox.innerHTML=''
    msgBox.innerHTML=`<div id="wrongChatBox">
    <h2>Your are not added to ${group} group yet</h2><br>
    <h2>If you are a VIP or a Admin you should be allowed in one of the groups</h2><br>
    <div>`  
    document.getElementById('wrongChatBox').scrollIntoView()
  }
socket.on('wrongChat',(data)=>{
    wrongChat(data);
    document.getElementById('msgForm').style.visibility='hidden';
    document.querySelector('.replyCheck').style.display='none';
})
socket.on('wrongVipChat',(data)=>{
    wrongVipChat(data);
    document.getElementById('msgForm').style.visibility='hidden';
    document.querySelector('.replyCheck').style.display='none';
})

socket.on('loadData',(string)=>{
    msgBox.innerHTML=''
    document.getElementById('msgForm').style.visibility='visible';
    document.querySelector('.replyCheck').style.display='flex';
    localStorage.setItem('Room','allchat')
    lastID='';lastIP='';
    for(let i=0;i<70;i++){
        if(string[i]){
        msgNum+=1
        pushMessages(string[i]);
        document.querySelectorAll('.MsgD')[i].scrollIntoView()

        }
    }
})
function joinReqst(data){
    joinData={
        name:localStorage.getItem('Name'),
        class:data,
        id:localStorage.getItem('ID'),
        ip:localStorage.getItem('IP')
    }
    socket.emit('joinRequest',joinData);
    
}

function closeReply(){
    document.querySelector('.replyCheck').style.bottom='24px'
    document.querySelector('.replyName').innerHTML=`@`+localStorage.replyingTo
    localStorage.replyingTo=''
}

function pushMessages(data){
    var replier,replied
    var jsonParagraph
    var origMsg
    var jsonMsg
    if(jsonCheck(data.msg)){
        jsonMsg=JSON.parse(data.msg)
        if(data.name===localStorage.Name&&jsonMsg.replyingTo===localStorage.Name&&data.ip===localStorage.IP&&jsonMsg.repliedIP===localStorage.IP){
            replier='You'
            replied='Yourself'
        }else if(data.name===localStorage.Name&&jsonMsg.replyingTo!==localStorage.Name&&data.ip===localStorage.IP){
            replier='You'
            replied='@'+jsonMsg.replyingTo
        }else if(data.name!=localStorage.Name&&jsonMsg.replyingTo===localStorage.Name&&jsonMsg.repliedIP===localStorage.IP){
            replier='@'+data.name
            replied='You'
        }else{
            replier='@'+data.name
            replied='@'+jsonMsg.replyingTo
        }
    }
    origMsg=data.msg
    replyclass=replyclass+1
    time = new Date();
    todaystamp=`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
    yesterstamp=`${time.getDate()-1}/${time.getMonth()+1}/${time.getFullYear()}`
    var roleD
    var designation =``
    if(localStorage.getItem('Room')!='wrongchat'){
    if(!data.pfp){
        data.pfp='https://i.imgur.com/DgZCbZU.png'
    }else{
        data.pfp=data.pfp.split('-c')[0]
    }
    if(regexExp.test(data.msg)&&!specialChars.test(data.msg)&&(data.id===lastID||data.ip===lastIP)){
        data.msg=`<p style="font-size:50px;margin:10px;">${data.msg}</p>`
    }else if(regexExp.test(data.msg)&&!specialChars.test(data.msg)){
        data.msg=`<p style="font-size:50px;margin:10px;margin-top:10px;">${data.msg}</p>`
    }else if((data.id===lastID&&data.time.split(' ')[0]!=todaystamp)||((data.ip===lastIP&&data.id===lastID)&&data.time.split(' ')[0]!=todaystamp)){
        data.msg=`<p style="margin-top:10px">${data.msg}</p>`
    }else{
        data.msg=`<p>${data.msg}</p>`
    }

    if(jsonMsg&&regexExp.test(jsonMsg.replyMsg)&&!specialChars.test(jsonMsg.replyMsg)){
        jsonParagraph=`<p style="font-size:50px;margin:10px;margin-top:10px;">${jsonMsg.replyMsg}</p>`
    }else if(jsonMsg){
        jsonParagraph=`<p>${jsonMsg.replyMsg}</p>`
    }

    if(data.time.split(' ')[0]===todaystamp){
        data.time=`Today at ${data.time.split(' ')[1]}`
    }else if(data.time.split(' ')[0]===yesterstamp){
        data.time=`Yesterday at ${data.time.split(' ')[1]}`
    }


    if(data.roles[0]=='Member'){
        roleD=`<a class="role rMem">${data.roles[0]}</a>`
    }else if(data.roles[0]=='Admin'){
        roleD=`<a class="role rAdm">${data.roles[0]}</a>`
    }else if(data.roles[0]=='VIP'){
        roleD=`<a class="role rVIP adj">${data.roles[0]}</a>`
    }else if(data.roles=='Member'){
        roleD=`<a class="role rMem">${data.roles}</a>`
    }else if(data.roles=='Admin'){
        roleD=`<a class="role rAdm">${data.roles}</a>`
    }else if(data.roles=='VIP'){
        roleD=`<a class="role rVIP adj">${data.roles}</a>`
    }
    


    if(localStorage.getItem('ID')&&localStorage.getItem('ID')===data.id&&jsonCheck(origMsg)){
        msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
        class="MsgD msg${data._id}" id="myMsg">
        <div class="prof"><img class="pfp" alt="pfp" src='${data.pfp}'></div>
        <a class='name'>${data.name} ${designation}</a><br>
        ${roleD}
        <div class='timestamp'>${data.time}</div style="margin-top:10px;">
        ${jsonParagraph}
        <div class="replySec" onclick="if(!document.querySelector('.msg${jsonMsg.replyMsgID}')){return;}document.querySelector('.msg${jsonMsg.replyMsgID}').scrollIntoView()"><bold>${replier}</bold> Replied to <bold>${replied}</bold> ${jsonMsg.repliedMsg.slice(0,20)}.....</div>
        <div onclick="replyTo('${data._id}','${data.name}','${jsonMsg.replyMsg}');" id="rep${replyclass}" class="replyB"><img src="images/reply.svg"></div></div><br>`
        lastID=data.id;
        lastIP=data.ip
        return;
    }else if(localStorage.getItem('IP')&&localStorage.getItem('IP')===data.ip&&localStorage.getItem('ID')===data.id&&jsonCheck(origMsg)){
        msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
            class="MsgD msg${data._id}" id="myMsg">
            <div class="prof"><img class="pfp" alt="pfp" src='${data.pfp}'></div>
            <a class='name'>${data.name} ${designation}</a><br>
            ${roleD}
           <div class='timestamp'>${data.time}</div>
            ${jsonParagraph}
            <div class="replySec" onclick="if(!document.querySelector('.msg${jsonMsg.replyMsgID}')){return;}document.querySelector('.msg${jsonMsg.replyMsgID}').scrollIntoView()"><bold>${replier}</bold> Replied to <bold>${replied}</bold> ${jsonMsg.repliedMsg.slice(0,20)}.....</div>
            <div id="rep${replyclass}" onclick="replyTo('${data._id}','${data.name}','${jsonMsg.replyMsg}')" class="replyB"><img src="images/reply.svg"></div></div><br>`
            lastID=data.id;
            lastIP=data.ip
            return;
    }else if(jsonCheck(origMsg)){
        msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
        class="MsgD msg${data._id}" id="elseMsg">
        <div class="prof"><img class="pfp" alt="pfp" src='${data.pfp}'></div>
        <a class='name'>${data.name} ${designation}</a><br>
        ${roleD}
        <div class='timestamp'>${data.time}</div>
        ${jsonParagraph}
        <div class="replySec" onclick="if(!document.querySelector('.msg${jsonMsg.replyMsgID}')){return;}document.querySelector('.msg${jsonMsg.replyMsgID}').scrollIntoView()"><bold>${replier}</bold> Replied to <bold>${replied}</bold> ${jsonMsg.repliedMsg.slice(0,20)}.....</div>
        <div id="rep${replyclass}" onclick="replyTo('${data._id}','${data.name}','${jsonMsg.replyMsg}')" class="replyB"><img src="images/reply.svg"></div></div><br>`
        lastID=data.id;
        lastIP=data.ip
        return;
    }




    if(localStorage.getItem('ID')&&localStorage.getItem('ID')===data.id){
        //my message
        if(data.id===lastID&&data.ip===lastIP){
            msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
            class="MsgD msg${data._id}" id="myMsg" style="border-radius:20px 20px 20px 20px;">
            ${data.msg}
            <div id="rep${replyclass}" onclick="replyTo('${data._id}','${data.name}','${origMsg}');" class="replyB"><img src="images/reply.svg"></div></div><br>`
        }else{
            msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
            class="MsgD msg${data._id}" id="myMsg">
            <div class="prof"><img class="pfp" alt="pfp" src='${data.pfp}'></div>
            <a class='name'>${data.name} ${designation}</a><br>
            ${roleD}
            <div class='timestamp'>${data.time}</div style="margin-top:10px;">
            ${data.msg}
            <div onclick="replyTo('${data._id}','${data.name}','${origMsg}');" id="rep${replyclass}" class="replyB"><img src="images/reply.svg"></div></div><br>`
        }
    
    }else if(localStorage.getItem('IP')&&localStorage.getItem('IP')===data.ip&&localStorage.getItem('ID')===data.id){
        //my message
        if(data.ip===lastIP&&data.id===lastID){
            msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
            class="MsgD msg${data._id}" id="myMsg" style="border-radius:20px 20px 20px 20px;">
            ${data.msg}
            <div id="rep${replyclass}" onclick="replyTo('${data._id}','${data.name}','${origMsg}')" class="replyB"><img src="images/reply.svg"></div></div><br>`
        }else{
            msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
            class="MsgD msg${data._id}" id="myMsg">
            <div class="prof"><img class="pfp" alt="pfp" src='${data.pfp}'></div>
            <a class='name'>${data.name} ${designation}</a><br>
            ${roleD}
           <div class='timestamp'>${data.time}</div>
            ${data.msg}
            <div id="rep${replyclass}" onclick="replyTo('${data._id}','${data.name}','${origMsg}')" class="replyB"><img src="images/reply.svg"></div></div><br>`
        }   
    
    }else{
        if(data.id===lastID&&data.ip===lastIP){
            //else' message
            msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
            class="MsgD msg${data._id}" id="elseMsg" style="border-radius:20px 20px 20px 20px;">
            ${data.msg}
            <div id="rep${replyclass}" onclick="replyTo('${data._id}','${data.name}','${origMsg}')" class="replyB"><img src="images/reply.svg"></div></div><br>`
        }else{
            msgBox.innerHTML+=`<div onmouseover="document.getElementById('rep${replyclass}').style.visibility='visible';" onmouseout="document.getElementById('rep${replyclass}').style.visibility='hidden';" 
            class="MsgD msg${data._id}" id="elseMsg">
            <div class="prof"><img class="pfp" alt="pfp" src='${data.pfp}'></div>
            <a class='name'>${data.name} ${designation}</a><br>
            ${roleD}
            <div class='timestamp'>${data.time}</div>
            ${data.msg}
            <div id="rep${replyclass}" onclick="replyTo('${data._id}','${data.name}','${origMsg}')" class="replyB"><img src="images/reply.svg"></div></div><br>`
        }
    
    }
    lastID=data.id;
    lastIP=data.ip
}
}

function replyTo(rMsgID,replyingTo,rMsg){
    localStorage.rMsgID=`${rMsgID}`
    localStorage.rMsg=`${rMsg}`
    localStorage.replyingTo=`${replyingTo}`
    if(localStorage.replyingTo){
        document.querySelector('.replyCheck').style.bottom='45px'
        document.querySelector('.replyName').innerHTML=`@`+localStorage.replyingTo
    }
}
