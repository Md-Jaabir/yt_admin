// firebase config
function firebaseInit(){
  const firebaseConfig = {
    apiKey: "AIzaSyDj43waeEkgb9rCdsEfG6iu7Iyb-kKuREI",
    authDomain: "yt-backend-8ccb3.firebaseapp.com",
    projectId: "yt-backend-8ccb3",
    storageBucket: "yt-backend-8ccb3.appspot.com",
    messagingSenderId: "989114939703",
    appId: "1:989114939703:web:36e4b7889540215d0842b2",
    measurementId: "G-TXNKQ97S46"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  coverRef=firebase.storage().ref().child("/covers");

  thumbRef=firebase.storage().ref().child("/thumbnils");
}

function searchToObj(){
  let searchObj={};
  
}

function cookieToObj(){
  let cookies={
    
  }
  document.cookie.split(";").forEach(cookie=>{
    let key=cookie.split("=")[0].trim();
    let value=cookie.split("=")[1];
    cookies[key]=value;
  });
  return cookies;
}

function getToken(){
  let token=cookieToObj().token;
  return token;
}

function showLoadingScreen(){
  document.querySelector("html").style.overflow="hidden";
  document.querySelector(".loadingScreen").classList.remove("hidden");
}

function hideLoadingScreen(){
  document.querySelector("html").style.overflow="auto";
  document.querySelector(".loadingScreen").classList.add("hidden");
}

function toast(text){
  document.querySelector(".toast").style.display="flex";
  document.querySelector(".toast").style.opacity="1";
  document.querySelector(".toast").innerHTML=text;
  setTimeout(()=>{
    document.querySelector(".toast").style.opacity="0";
    setTimeout(()=>{
      document.querySelector(".toast").style.display="none";
    },1100)
  },2000)
}

function checkLoginandGetData(url,method,success,error){
  showLoadingScreen();
  fetch(url,{
    method:method,
    headers:{
      "Authorization":`Bearer ${getToken()}`,
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
  .then(data=>{
    if(data.message=='error'){
      // hideLoadingScreen();
      error();
    }else{
      hideLoadingScreen();
      success(data);
    }
  })
  .catch(err=>{
    hideLoadingScreen();
    toast("Network issue");
  })
}

function deleteContact(id){
  showLoadingScreen();
  fetch(`https://youtubechannelbackend.herokuapp.com/admin/delete_contact`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${getToken()}`
    },
    body:JSON.stringify({
      contactId:id,
    })
  }).then(res=>res.json())
  .then(()=>{
    location.reload();
  }).catch(()=>{
    toast("Network issue");
  })
  
}

class blogComment{
  constructor(blogId,name,comment,date){
    this.name=name;
    this.blogId=blogId;
    this.date=date;
    this.comment=comment;
  }
  saveToServer(){
      this.infoObj={
        name:this.name,
        blogId:this.blogId,
        comment:this.comment,
        date:this.date
      }
      fetch("https://youtubechannelbackend.herokuapp.com/user/publish_comment", {
        method: "POST",
        body: JSON.stringify(this.infoObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then((data)=>{
      location.reload();
      console.log(data);
    })
    .catch(()=>{
      toast("Network issue");
    })
  }
}



function showDialogue (handleFile){
  inp=document.createElement("input");
  inp.type="file";
  inp.classList.add("hidden");
  inp.click();
  inp.addEventListener("change",()=>{
    handleFile(inp.files[0]);
  })
}

const uploadCover=(file,success)=>{
    let fileRef=coverRef.child(Date.now()+file.name);
    task=fileRef.put(file,{
      contentType:file.type
    })

    task.then(response=>{
      console.log(response);
      return response.ref.getDownloadURL();
    }).then(url=>{
      success(url);
    }).catch(()=>{
      console.log("error");
    });
}

const uploadThumb=(file,success)=>{
    let fileRef=thumbRef.child(Date.now()+file.name);
    task=fileRef.put(file,{
      contentType:file.type
    })

    task.then(response=>{
      console.log(response);
      return response.ref.getDownloadURL();
    }).then(url=>{
      success(url);
    }).catch((err)=>{
      console.log(err);
    });
}

function setLoadingText(text){
  document.querySelector(".loadingScreen h2").innerHTML=text;
}


class blog{
  constructor(title,cover,content,date){
    this.title=title;
    this.cover=cover;
    this.content=content;
    this.date=date;
  }
  saveToServer(){
      this.infoObj={
        title:this.title,
        coverImageUrl:this.cover,
        content:this.content,
        date:this.date,
      }
      fetch("https://youtubechannelbackend.herokuapp.com/admin/publish_blog", {
        method: "POST",
        body: JSON.stringify(this.infoObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":`Bearer ${getToken()}`
        }
    })
    .then(response => response.json())
    .then((data)=>{
      console.log(data);
      // hideLoadingScreen();
      location.href="./success.html?msg=Success! Your blog has been published successfully &backpath=./blogs.html";
      setTimeout(()=>{
        location.reload();
      },400);
    })
    .catch((err)=>{
      toast("Network issue");
      hideLoadingScreen();
      console.log(err);
    })
  }
}

function searchToObj(){
  let key,value;
  let searchObj={}
  let searchStr=location.search.trim().replace("?","").replaceAll("%20"," ");
  searchArr=searchStr.split("&");
  searchArr.forEach(element=>{
    key=element.trim().split("=")[0].trim();
    value=element.trim().split("=")[1].trim();
    searchObj[key]=value;
  });
  return searchObj;
}