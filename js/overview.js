let subscreiberCount=0;

window.onload=function(){
  checkLoginandGetData('https://youtubechannelbackend.herokuapp.com/admin/admin_info','GET',(data)=>{
    console.log(data);
    setEverythingInPlace(data);
    // setting the review info
    fetch("https://youtubechannelbackend.herokuapp.com/user/riviews").then(res=>res.json())
    .then(data=>{
      setReviewsInDom(data);
    }).catch(()=>{
      toast("Network issue");
    });
    // setting the blog info
    fetch("https://youtubechannelbackend.herokuapp.com/user/blog_posts").then(res=>res.json())
    .then(data=>{
      document.getElementById("blog-count").innerText=data.length;
    }).catch(()=>{
      toast("Network issue");
    });
    // setting the contact info
    fetch("https://youtubechannelbackend.herokuapp.com/admin/contact_msgs",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${getToken()}`
      }
    }).then(res=>res.json())
    .then(data=>{
      document.getElementById("contact-count").innerText=data.length;
    }).catch(()=>{
      toast("Network issue");
    });

    //setting channel info:
    setChannelInfo();

    
  },()=>{
    toast("You aren't signed in");
    setTimeout(()=>{
      location.reload();
    },400);
    location.href="./login.html";
  })
}

function setEverythingInPlace(data){
  let nameCont=document.getElementById("admin-name");
  let idCont=document.getElementById("admin-id");
  nameCont.innerText=data.info.name;
  idCont.innerText=data.info.userId;
  document.getElementById("edit-button").href=`/update_admin_info.html?id=${data.info._id}`;
  document.getElementById("edit-button").parentNode.addEventListener("click",()=>{
    redirect(`/update_admin_info.html?id=${data.info._id}`);
  })
}

function setReviewsInDom(data) {
  let reviewCount=data.length;
  let sumOfReviews=0;
  let fiveStarReviewCount=data.filter((currentValue)=>{
    return currentValue.stars==5;
  }).length;
  let fourStarReviewCount=data.filter((currentValue)=>{
    return currentValue.stars==4;
  }).length;
  let threeStarReviewCount=data.filter((currentValue)=>{
    return currentValue.stars==3;
  }).length;
  let twoStarReviewCount=data.filter((currentValue)=>{
    return currentValue.stars==2;
  }).length;
  let oneStarReviewCount=data.filter((currentValue)=>{
    return currentValue.stars==1;
  }).length;
  document.getElementById("five-star-review-count").innerText=fiveStarReviewCount;
  document.getElementById("four-star-review-count").innerText=fourStarReviewCount;
  document.getElementById("three-star-review-count").innerText=threeStarReviewCount;
  document.getElementById("two-star-review-count").innerText=twoStarReviewCount;
  document.getElementById("one-star-review-count").innerText=oneStarReviewCount;
  document.getElementById("review-count").innerText=reviewCount;
  data.forEach(element=>{
    sumOfReviews+=parseInt(element.stars);
  });
  let avgReview=(sumOfReviews/reviewCount).toString();
  if(avgReview.length>3){
    avgReview=avgReview.substr(0,4);
  }
  document.getElementById("avg-review").innerText=avgReview;
}

function logout() {
  document.cookie="token=;expires=Tue, 05 Jul 2022 05:47:27 UTC;path=/;";
  location.href="./login.html";
}

function setChannelInfo(){
  const subsCont=document.getElementById("subs-count");
  const viewCont=document.getElementById("view-count");
  const vidCont=document.getElementById("vid-count");
  fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC_WEKTDIsKSRq8cwQN27Kow&key=AIzaSyBMzS5a6nbvEljzUGgf-AI-BVMLF6JOCIQ").then(res=>res.json())
  .then(data=>{
    subsCont.innerHTML=data.items[0].statistics.subscriberCount;
    viewCont.innerHTML=data.items[0].statistics.viewCount;
    vidCont.innerHTML=data.items[0].statistics.videoCount;
    subscreiberCount=data.items[0].statistics.subscriberCount;
    //setting milestones
    setMileStones();
  })
}

function setMileStones(){
  const silver=document.querySelector(".silver-progress");
  const gold=document.querySelector(".gold-progress");
  const diamond=document.querySelector(".diamond-progress");
  const red_diamond=document.querySelector(".red-diamond-progress");
  if(subscreiberCount<100000){
    silver.style.width=`${(subscreiberCount/100000)*100}%`;
  }else{
    silver.style.width=`100%`;
  }
  if(subscreiberCount<1000000){
    gold.style.width=`${(subscreiberCount/1000000)*100}%`;
  }else{
    gold.style.width=`100%`;
  }

  if(subscreiberCount<10000000){
    diamond.style.width=`${(subscreiberCount/10000000)*100}%`;
  }else{
    diamond.style.width=`100%`;
  }

  if(subscreiberCount<100000000){
    red_diamond.style.width=`${(subscreiberCount/100000000)*100}%`;
  }else{
    red_diamond.style.width=`100%`;
  }
}

