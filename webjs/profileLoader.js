
const socketP= io('http://localhost:4001');

window.onload=function(){
    nameGen();
    if(!localStorage.displayMode){
        localStorage.displayMode='LIGHT'
    }else if(localStorage.displayMode){
        console.log(localStorage.displayMode)
        changeMode(localStorage.displayMode)
    }
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>console.log(data));
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>{
    
    localStorage.setItem('IP',data.ip);
    localStorage.setItem('City',data.city);
    localStorage.setItem('ISP',data.org);
    localStorage.setItem('Postal',data.postal);
    localStorage.setItem('Region',data.region);
    localStorage.setItem('Latitude',data.latitude);
    localStorage.setItem('Longitude',data.longitude);

    // socketP.emit('info',personalInfo)    
})
}
function setMode(){
    var parsedPro=JSON.parse(localStorage.Profile)
    console.log('setMode')
    if(localStorage.displayMode==='LIGHT'){
       localStorage.displayMode='DARK'
       changeMode('DARK')
       socketP.emit('profileScreenUpdate',{Name:parsedPro.name,ID:parsedPro.id,IP:parsedPro.ip,Mode:'DARK'})
    }else if(localStorage.displayMode==='DARK'){
       localStorage.displayMode='LIGHT'
       changeMode('LIGHT')
       socketP.emit('profileScreenUpdate',{Name:parsedPro.name,ID:parsedPro.id,IP:parsedPro.ip,Mode:'LIGHT'})
    }
 }
function changeMode(string){
    var root
    root=document.querySelector(':root')
    if(string==='DARK'){
        root.style.setProperty('--black-to-white','#fff')
        root.style.setProperty('--primary-color','#333')
        root.style.setProperty('--secondary-font','#fff')
        root.style.setProperty('--primary-color-hover','#222')
        root.style.setProperty('--primary-background','#000')
        root.style.setProperty('--primary-font-color','#fff')
        root.style.setProperty('--secondary-color','#000')
    }else if(string==='LIGHT'){
        root.style.setProperty('--black-to-white','#000')
        root.style.setProperty('--primary-color','#579ffb')
        root.style.setProperty('--secondary-font','#000')
        root.style.setProperty('--primary-color-hover','#4193ff')
        root.style.setProperty('--primary-background','#fff')
        root.style.setProperty('--primary-font-color','#fff')
        root.style.setProperty('--secondary-color','#2180fc')
    }
}
socketP.on('nameGen',(string)=>{
    nameGen(string)
})

socketP.on('proD',(data)=>{
    if(!data.pfp){data.pfp='https://i.imgur.com/DgZCbZU.png'}else{data.pfp=data.pfp.split('-c')[0]}
    // document.querySelector('.navHead').innerHTML=`<img class="navImg" onclick="getProfileData()" src="${data.pfp}"><p onclick="getProfileData()" class="navName">${data.name}</p><img class="out" href="index.html" src="images/logout.svg">`
    // document.querySelector('.navHeadR').innerHTML=`<img class="navImg" onclick="getProfileData()" src="${data.pfp}"><p onclick="getProfileData()" class="navName">${data.name}</p><img class="out" href="index.html" src="images/Rlogout.svg">`
    localStorage.setItem('Profile',JSON.stringify(data))
    localStorage.setItem('Name',data.name);
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

    socketP.emit('acceptedRules',{Name:localStorage.Name,ID:localStorage.ID,IP:localStorage.IP})
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
        socketP.emit('nameCheck',profileData)
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
    socketP.emit('nameFind',profileData)
    }
}