let video_cont=document.querySelector(".videos");
checkLoginandGetData("https://youtubechannelbackend.herokuapp.com/admin/admin_info","GET",onSuccess,()=>{
  toast("You aren't signed in");
  setTimeout(()=>{
    location.reload();
  },400);
  location.href="./login.html";
});

function onSuccess(data){
  showLoadingScreen();
  fetch("https://youtubechannelbackend.herokuapp.com/user/videos")
  .then(res=>res.json())
  .then(videos=>{
    hideLoadingScreen();
    appendVideos(videos);
    document.querySelector(".add-btn").classList.remove("hidden");
  })
  .catch(()=>{
    hideLoadingScreen();
    toast("Network issue");
  });
}


function appendVideos(videos){
  videos.forEach(video=>{
    video_cont.innerHTML+=`<div class="video my-16 px-10 w-ful flex flex-col justify-center shadow-sm pb-7 rounded-md">
        <img class="h-44 x:h-52 sm:h-60 md:h-44" src="${video.thumbUrl}" alt="" class="thumbUrl">
        <span onclick="redirect('${video.videoUrl}')" class="hover:text-white w-fit material-symbols-outlined relative text-6xl top-[-106px] left-[42%] text-[#ff1f78] cursor-pointer">play_circle</span>
        <h2 class="title text-xl font-['Poppins'] font-bold mt-5">${video.title}</h2>
        <div class="options flex justify-between mt-5 px-7">
          <div class="view">
            <span onclick="redirect('${video.videoUrl}')" class="w-fit material-symbols-outlined text-[#ff1f78] cursor-pointer">visibility</span>
          </div>
          <div class="edit-delete flex w-20 justify-end">
            <span onclick="deleteVideo('${video._id}')" class="w-fit material-symbols-outlined text-[#ff1f78] cursor-pointer">delete</span>
          </div>
        </div>
      </div>`;
  })
}

function deleteVideo(id){
  showLoadingScreen();
  fetch('https://youtubechannelbackend.herokuapp.com/admin/delete_video',{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${getToken()}`
    },
    body:JSON.stringify({videoId:id})
  }).then(res=>res.json())
  .then(data=>{
    // hideLoadingScreen();
    if(data.message=='error'){
      toast("Unauthenticated users can't delete videos");
      location.href="./login.html";
      return;
    }
    whenDeleted(data);
  })
  .catch(()=>{
    // hideLoadingScreen();
    toast("Network issue");
  })
}

const whenDeleted=()=>{
  location.reload();
}