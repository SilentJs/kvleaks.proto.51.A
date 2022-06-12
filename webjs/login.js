function handleCredentialResponse(response) {
    // const responsePayload = decodeJwtResponse(response.credential);
    const responsePayload=parseJwt(response.credential)
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    console.log("Encoded JWT ID token: " + response.credential);
    localStorage.clear()
    localStorage.setItem('Name',responsePayload.name)
    localStorage.setItem('ID',responsePayload.sub)
    localStorage.setItem('Email',responsePayload.email)
    localStorage.setItem('Pfp',responsePayload.picture)
    document.querySelector(".one-tap-signinB").innerHTML=`<div onclick ="signOut()" class="signOutB">Signout <img src="${localStorage.Pfp}"><div class='name'>${localStorage.Name}</div></div>`
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
    
  }
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
window.onload = function () {
    if(!localStorage.Email){
        google.accounts.id.initialize({
            client_id: "613459978793-siulbcg86o106re849evbjosagsgirp3.apps.googleusercontent.com", // Replace with your Google Client ID
            callback: handleCredentialResponse,
            context: "use", // We choose to handle the callback in client side, so we include a reference to a function that will handle the response
          });
          // You can skip the next instruction if you don't want to show the "Sign-in" button
          google.accounts.id.renderButton(
            document.querySelector(".one-tap-signinB"), // Ensure the element exist and it is a div to display correcctly
            {theme: "outline", size: "large" }  // Customization attributes
          );
          google.accounts.id.prompt();
    }else{
        document.querySelector(".one-tap-signinB").innerHTML=`<div onclick ="signOut()" class="signOutB">Signout <img src="${localStorage.Pfp}"><div class='name'>${localStorage.Name}</div></div>`
    }
     // Display the One Tap dialog
  }

  function signOut(){
      localStorage.clear();
      window.location.href='index.html'
  }
