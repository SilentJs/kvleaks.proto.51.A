
const socket= io('https://userdetailsdb.the-karambitkar.repl.co/')

socket.on('showData',(string)=>{
    string.forEach(data => {
        pushAnns(data)
    });
    document.getElementById('annBox').innerHTML=`<div class="annPost" style="border-bottom: 3px var(--break-line-color) solid;font-size: 20px;padding-bottom: 0px;
    margin: -10px 0px;">
    <p><bold>Annoucements</bold></p><br>
    <div class="line" style="margin-top: -32px;">OK</div>
    <button onclick="window.location.href='index.html'" class="b1"><img class="bImg" src="images/home.svg">Home</button>
    <button onclick="window.location.href='chat.html'" class="b2"><img class="bImg" src="images/chat.svg">Chatpage</button>
    <button onclick="window.location.href='news.html'" class="b3"><img class="bImg" src="images/news.svg">Newspage</button>
    </div><br>`+document.getElementById('annBox').innerHTML
})

function pushAnns(data){
    document.getElementById('annBox').innerHTML=`
    <div class="annPost">
    <a class="topic"><img src="images/announcement.svg"><bold>${data.Topic}</bold></a>
    <br>
    <div class="line">OK</div>
    <p>${data.Message}</p>
    <a class="footer">${data.Content}</a>
    </div><br>`+document.getElementById('annBox').innerHTML
}
