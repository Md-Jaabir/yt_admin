//https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCOb_zBJ_4ghA8-korV7HKmA&key=AIzaSyBMzS5a6nbvEljzUGgf-AI-BVMLF6JOCIQ

document.querySelector(".links").classList.add("hidden");

function openLinks(){
  document.querySelector(".links").classList.remove("hidden");
  setTimeout(()=>{
    document.querySelector(".links").style.right="0";
    document.querySelector("html").style.overflow="hidden";
  },10);
}


function closeLinks(){
  document.querySelector(".links").style.right="-190px";
  setTimeout(()=>{
    document.querySelector(".links").classList.add("hidden");
    document.querySelector("html").style.overflow="auto";
  },300)  
}

function redirect(url){
  location.href=url;
}