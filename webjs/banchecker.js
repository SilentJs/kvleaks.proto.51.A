
const socketW=io('https://userdetailsdb.the-karambitkar.repl.co/')
var banG=-1
var banR=-1

if(localStorage.getItem('Banned')==='true'){
    banText();
}

socketW.on('connect',()=>{
    if(localStorage.Profile){
        socketW.emit('banCheck',(JSON.parse(localStorage.Profile)))
    }

})
socketW.on('ban',()=>{
    localStorage.setItem('Banned','true');
    banG+=1
    if(banG===0){
       banText();
    }
})
socketW.on('banRemoved',()=>{
    banR+=1
    if(banR===0&&localStorage.getItem('Banned')==='true'){
        localStorage.setItem('Banned','false');
        banRemoved()
        return;
    }
})
function banText(){
    document.querySelector('body').innerHTML=`<div>You are banned from https://kvleaks.netlify.app for your ban appeal talk to us at noobassnigga@nigga.com</div>`
    document.querySelector("div").style.background='white'
    document.querySelector("*").style.background='white'
    console.warn('You are banned from https://kvleaks.netlify.app for your ban appeal talk to us at noobassnigga@nigga.com')
    return;
}
function banRemoved(){
    document.querySelector('body').innerHTML=`<div>Your ban is removed</div>`
    document.querySelector("div").style.background='white'
    document.querySelector("*").style.background='white'
    console.warn('Your ban is removed')
    return;
}
    


    
