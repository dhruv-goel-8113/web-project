const submitBtn=document.getElementById("submitBtn");
const cityName=document.getElementById("cityName");
const cityname=document.getElementById("cityname");
const temp=document.getElementById("temp");
const temp_status=document.getElementById("temp_status");
const datahide=document.querySelector(".middle_layer");
const day=document.getElementById("day");
const today_date=document.getElementById("today_date");

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

const date=new Date();
day.innerText=`${days[date.getDay()]}`;
today_date.innerText=`${date.getDate()}${months[date.getMonth()]}`;
const getInfo=async(event)=>{
    event.preventDefault();
    // alert("hii");
    let cityval=cityName.value;
    if(cityval===""){
        cityname.innerText="Plz enter city to search";
        datahide.classList.add("data_hide");
    }
    else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=73ec77780ed4c58add6659acc28fe4f1`;
            const response=await fetch(url);
            // console.log(response.json()); ----promise----
            const objdata=await response.json();
            console.log(objdata);
            const arrData=[objdata];
            cityname.innerText=`${arrData[0].name},${arrData[0].sys.country}`
            temp.innerText=`${arrData[0].main.temp}`;
            // const objdata=JSON.parse(response.json());
            // console.log(objdata);
            // temp_status.innerText=`${arrData[0].weather[0].main}`
            const tempMood=arrData[0].weather[0].main;
            if(tempMood==="Clear"){
                temp_status.innerHTML="<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            else if(tempMood==="Clouds"){
                temp_status.innerHTML="<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            }
            else if(tempMood==="Rain"){
                temp_status.innerHTML="<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>"; 
            }
            else{
                temp_status.innerHTML="<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            datahide.classList.remove("data_hide");
        }
        catch{
            cityname.innerText="City not found";
            datahide.classList.add("data_hide");
        }
    }
}
submitBtn.addEventListener("click",getInfo);