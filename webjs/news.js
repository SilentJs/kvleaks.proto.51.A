
var attachmentsArr=[]
var boxData = document.getElementById('searchBox')
var postBox = document.getElementById('posts')
var msgBox = document.getElementById('msgBox')
var msgBoxData={}
var newsdata=[]
var tagsData=[]
var msgTags=[]
var dadarray=[]
var reqAmt=0
var smallCaseStore=''
var Cooldown=''
var timestamp=''
var realMinutes=0
var realSeconds=0
const socket= io('http://localhost:4000');
localStorage.setItem('searching','false')


socket.on('newsdata',(data)=>{

    for(let i=0;i<70;i++){
        if(data[i]){
        dadarray.push(data[i])
        messageOut(data[i]);
        document.querySelectorAll('.post')[0].scrollIntoView({block: "end"})
        }
    }
})

function messageOut(data){
    var attBlock=''
    var attNum=0
    if(!data.tags[0]){
        data.tags[0]=''
        tag0=''
    }else if(data.tags[0]){
        tag0=`<a onclick="console.log('clicked')" class="tag">#${data.tags[0]}</a>`
    }

    if(!data.tags[1]){
        data.tags[1]=''
        tag1=''
    }else if(data.tags[1]){
        tag1=`<a onclick="console.log('clicked')" class="tag">#${data.tags[1]}</a>`
    }

    if(!data.tags[2]){
        data.tags[2]=''
        tag2=''
    }else if(data.tags[2]){
        tag2=`<a onclick="console.log('clicked')" class="tag">#${data.tags[2]}</a>`
    }

    data.Attachments.forEach((data)=>{
        if(data){
        attNum+=1
        }
    })

    if(!data.Pfp){
        data.Pfp='https://i.imgur.com/DgZCbZU.png'
    }else if(data.Pfp){
        data.Pfp=data.Pfp.split('-c')[0]
    }
    if(attNum===1){
        attBlock=`<div class="attBlock"><div class="atts" onclick="makeSlideshow('${data.Attachments};');"><p>${attNum}</p>Attachment</div><img src="${data.Attachments[0]}"></div>`
    }else if(attNum!=0){
        attBlock=`<div class="attBlock"><div class="atts" onclick="makeSlideshow('${data.Attachments}');"><p>${attNum}</p>Attachments</div><img src="${data.Attachments[0]}"></div>`
    }
    postBox.innerHTML=`<div class="post">
        <img class="pfp" src='${data.Pfp}'>
        <a class='postPoster'>${data.Name}</a>
        <a class='timestamp'>${data.Time}</a>
        <p class="postTopic">${data.Topic}</p>
        <p class="postContent">${data.Content}</p>
        ${attBlock}
        <div class="Att"><a class="attachments">${data.Attachments[0]}<br>${data.Attachments[1]}<br>${data.Attachments[2]}</a></div>
        <p class="postTags">${tag0}${tag1}${tag2}</p><br>
        <button class="likebut${data._id}" id="likebtn" onclick="like('${data._id}');"><i class="fa-regular fa-thumbs-up"></i>  Like</button>
        <button class="dislikebut${data._id}" id="dislikebtn"  onclick="dislike('${data._id}');"><i class="fa-regular fa-thumbs-down"></i>  Dislike</button><br>
        <a id="like${data._id}">Likes: ${data.Likes}</a><br>
        <a id="dislike${data._id}">Dislikes: ${data.Dislikes}</a><br>
    </div>`+postBox.innerHTML

    if(localStorage.getItem('ID')){
        if(data.LikedIDs.includes(localStorage.getItem('ID'))){
            chLikeB(data._id);
        }else{
            normLikeB(data._id);
        }
        if(data.DislikedIDs.includes(localStorage.getItem('ID'))){
            chDislikeB(data._id);
        }else{
            normDislikeB(data._id);
        }
    }else{
        if(data.Likedips.includes(localStorage.getItem('IP'))){
            chLikeB(data._id);
        }else{
            normLikeB(data._id);
        }
        if(data.Dislikedips.includes(localStorage.getItem('IP'))){
            chDislikeB(data._id);
        }else{
            normDislikeB(data._id);
        }
    }
    
}

function makeSlideshow(string){
    document.querySelector('.navmain').style.display='none';
    document.querySelector('.postSec').style.display='none';
    document.querySelector('.msgSec').style.display='none';
    document.querySelector('html').style.background='black'
    var SSatts=[]
    var someHtml=`<div class="exitB"><a onclick="destroySlideshow();"><i class="fa-solid fa-xmark" style="font-size: 40px;"></a></i></div><div class="slideshow-container">`
    var someHtmlDots=`<div class="dots">`
    randString=string.split(',') 

    randString.forEach((item)=>{
        if(item){
            SSatts.push(item);
        }
    });
    for(let i=0;i<SSatts.length;i++){
        someHtml+=`<div class="mySlides fade">
        <div class="numbertext">${i+1}/${SSatts.length}</div>
        <img src="${SSatts[i]}" style="width:100%">
      </div>`
      someHtmlDots+=`<span class="dot" onclick="currentSlide(${i+1})"></span>`
    }
    someHtmlDots=someHtmlDots+`<div>`
    someHtml=someHtml+`<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
  </div><br>`+someHtmlDots
    document.querySelector('.Slideshow').innerHTML=someHtml
    showSlides(1);

}

function destroySlideshow(){
    document.querySelector('.Slideshow').innerHTML=`<div class="Slideshow">
    <div class="slideshow-container" style="display:none;"><div class="mySlides fade">
      <div class="numbertext">1/6</div>
      <img src="https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg" style="width:100%">
    </div><div class="mySlides fade">
      <div class="numbertext">2/6</div>
      <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg" style="width:100%">
    </div><div class="mySlides fade">
      <div class="numbertext">3/6</div>
      <img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" style="width:100%">
    </div><div class="mySlides fade">
      <div class="numbertext">4/6</div>
      <img src="https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg" style="width:100%">
    </div><div class="mySlides fade">
      <div class="numbertext">5/6</div>
      <img src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" style="width:100%">
    </div><div class="mySlides fade">
      <div class="numbertext">6/6</div>
      <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" style="width:100%">
    </div>  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
  </div>
  <br>
  
  <div style="text-align:center;display:none;">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
  </div>
  </div>`
    document.querySelector('.navmain').style.display='flex';
    document.querySelector('.postSec').style.display='block';
    document.querySelector('.msgSec').style.display='block';
    document.querySelector('html').style.background='white'
    
}


function hideTagsBar(){
    document.getElementById('tagsbar').style.display='none'
    document.getElementById('topicbar').style.display='block'
    document.querySelector('.dropdown-content').style.display='none'
}
function hideTopicBar(){
    document.getElementById('tagsbar').style.display='block'
    document.getElementById('topicbar').style.display='none'
    document.querySelector('.dropdown-content').style.display='none'
}
function showDropdown(){
    document.querySelector('.dropdown-content').style.display='block'
}
socket.on('newMsg',(data)=>{
    console.log(data);
    if(localStorage.searching!='true'){
        messageOut(data)
    }
    dadarray.push(data);
})
socket.on('updateMsgBox',()=>{
    msgBox.box1.value=''
    msgBox.box2.value=''
    msgBox.box3.value=''
    msgBox.box4.value=''
})

function multipleExist(arr, values) {
    return values.every(value => {
    return arr.includes(value);
    });
}


boxData.addEventListener('submit',e=>{
    e.preventDefault()
    if(boxData.box1.value.includes('#')){
        if(!boxData.box1.value){
            return;
        }
        localStorage.setItem('searching','true');
        postBox.innerHTML=''
        if(boxData.box1.value){
        let searchData=boxData.box1.value.replaceAll('#',' ').split(' ')
        tagsData=[]
        searchData.forEach(element => {
            if(element!=''){
                tagsData.push(element);
            }
        });
        for (let i = 0; i < 70; i++) {
            if(dadarray[i]){
                if(multipleExist(dadarray[i].tags,tagsData)){
                    messageOut(dadarray[i])
                }
            }
        }
        }
    
    }
})



function clearSBox(){
    boxData.box1.value=''
    localStorage.setItem('searching','false');
    postBox.innerHTML=''
        for(let i=0;i<70;i++){
            if(dadarray[i]){
            messageOut(dadarray[i]);
            document.querySelectorAll('.post')[0].scrollIntoView()
            }
        }
}
function like(check){
    if(document.querySelector('.likebut'+check).style.backgroundColor!='#cafaff'){
        document.querySelector('.likebut'+check).style.backgroundColor='#cafaff'
    }else if(document.querySelector('.likebut'+check).style.backgroundColor==='#f0efef'){
        document.querySelector('.likebut'+check).style.backgroundColor='#f0efef'
    }
    if(localStorage.getItem('ID')){
    var randArray = [check,localStorage.getItem('ID')]
    socket.emit('idlike',randArray);
    }else{
    var randArray = [check,localStorage.getItem('IP')]
    socket.emit('iplike',randArray);
    }
}
function dislike(check){
    if(document.querySelector('.dislikebut'+check).style.backgroundColor!='#cafaff'){
        document.querySelector('.dislikebut'+check).style.backgroundColor='#cafaff'
    }else{
        document.querySelector('.dislikebut'+check).style.backgroundColor='#f0efef'
    }
    
    if(localStorage.getItem('ID')){
    var randArray = [check,localStorage.getItem('ID')]
    socket.emit('iddislike',randArray);
    }else{
    var randArray = [check,localStorage.getItem('IP')]
    socket.emit('ipdislike',randArray);
    }
}


msgBox.addEventListener('submit',e=>{
    e.preventDefault();
    attachmentsArr=[]
    today =new Date();
    if(msgBox.box3.value){
        var attachments=msgBox.box3.value.split(" ")
        var att1
        var att2 
        var att3 
        attachments.forEach((data)=>attachmentsArr.push(data));
    }


  

    if(today.getMinutes()<10){
        realMinutes=`0${today.getMinutes()}`
    }else{
        realMinutes=today.getMinutes();
    }
    if(today.getSeconds()<10){
        realSeconds=`0${today.getSeconds()}`
    }else{
        realSeconds=today.getSeconds();
    }
    let searchData=msgBox.box4.value.replaceAll('#',' ').split(' ')
    msgTags=[]
    searchData.forEach(element => {
        if(element!=''){
            msgTags.push(element);
        }
    });
    e.preventDefault();
    pfpvar=localStorage.getItem('Pfp')
    Cooldown=`${today.getDate()} ${today.getMonth()+1} ${today.getFullYear()} ${today.getHours()} ${realMinutes} ${realSeconds}`
    timestamp=`${today.getDate()+'/'+`${today.getMonth()+1}`+'/'+today.getFullYear()+' '+today.getHours()+':'+realMinutes}`
    msgBoxData={
        Name:localStorage.getItem('Name'),
        Pfp:localStorage.getItem('Pfp'),
        Topic:msgBox.box1.value,
        Content:msgBox.box2.value,
        Attachments:attachmentsArr,
        tags:msgTags,
        ip:localStorage.getItem('IP'),
        Likes:'0',
        Dislikes:"0",
        Pfp:pfpvar,
        Time:timestamp,
        Cooldown
    }
    
    socket.emit('post',msgBoxData); 
    Cooldown=``
    timestamp=``
})
var coolDownClock
socket.on('cooldown',(string)=>{
    if(!coolDownClock){
        CDclock();
    }else if(coolDownClock){
        clearInterval(coolDownClock)
        coolDownClock=null
        CDclock();
    }
    function CDclock(){
        coolDownClock=setInterval(function(){
            if(parseInt(string)>-1){
                mins=Math.floor(parseInt(string)/60)
                secs=parseInt(string)%60
                if(secs<10){
                    secs=`0${secs}`
                }
                document.querySelector('.cdButton').style.background='#e38585'
                document.querySelector('.cdButton').style.fontSize='24px'
                document.querySelector('.cdButton').textContent=`Cooldown ${mins}:${secs}`
                string=parseInt(string-1)
            }else{
                clearInterval(coolDownClock)
                coolDownClock=null;
                document.querySelector('.cdButton').style.background='#579ffb'
                document.querySelector('.cdButton').style.fontSize='30px'
                document.querySelector('.cdButton').textContent=`Post`
            }    
        },1000)
    }
})



socket.on('chLikeB',(any)=>{
    chLikeB(any);
})
socket.on('normDislikeB',(any)=>{
    normDislikeB(any);
})
socket.on('normLikeB',(any)=>{
    normLikeB(any);
})
socket.on('chDislikeB',(any)=>{
    chDislikeB(any);
})
function chLikeB(any){
    document.querySelector('.likebut'+any).style.backgroundColor='#cafaff'
    document.querySelector('.likebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-up"></i>  Liked`
}
function normLikeB(any){
    document.querySelector('.likebut'+any).style.backgroundColor='#fff'
    document.querySelector('.likebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-up"></i>  Like`

}
function chDislikeB(any){
    document.querySelector('.dislikebut'+any).style.backgroundColor='#cafaff'
    document.querySelector('.dislikebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-down"></i>  Disliked`
}
function normDislikeB(any){
   document.querySelector('.dislikebut'+any).style.backgroundColor='#fff'
   document.querySelector('.dislikebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-down"></i>  Dislike`
}

socket.on('iLike',(string)=>{
    var change = document.getElementById('like'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])+1
    var noog=document.getElementById('like'+string).innerHTML='Likes: '+parse
})
socket.on('dLike',(string)=>{
    var change = document.getElementById('like'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])-1
    var noog=document.getElementById('like'+string).innerHTML='Likes: '+parse
})
socket.on('iDislike',(string)=>{
    var change = document.getElementById('dislike'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])+1
    var noog=document.getElementById('dislike'+string).innerHTML='Dislikes: '+parse
})
socket.on('dDislike',(string)=>{
    var change = document.getElementById('dislike'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])-1
    var noog=document.getElementById('dislike'+string).innerHTML='Dislikes: '+parse
})

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


