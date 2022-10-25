// KANVQLMBB5DC97YV6AUZE4JS5
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

const search_content = document.getElementById("search_bar");
const API_KEY = "KANVQLMBB5DC97YV6AUZE4JS5";

const date = new Date();

const date_to_be_used = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;


const city_name=document.getElementById("city_name");
const temp_max=document.getElementById("temp_max");
const temp_min=document.getElementById("temp_min");
const feels_like=document.getElementById("feels_like");
const desc=document.getElementById("desc");
const humidity=document.getElementById("humidity");

const error=document.getElementById("error");
let glob_res="-1";
let temperature_turn="C";

let dark_mode_state="W";


document.getElementById("search_btn").addEventListener("click", (e) => {
  if(search_content.value!==""){
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search_content.value}/${date_to_be_used}?key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((res) => {
    //   console.log(res);
         glob_res=res;
         city_name.innerHTML="";
         temp_max.innerHTML="";
         temp_min.innerHTML="";
         feels_like.innerHTML="";
         desc.innerHTML="";
         humidity.innerHTML="";
         error.innerHTML="";

         city_name.textContent=res.resolvedAddress;
         if(temperature_turn=="C"){
            temp_max.textContent=`⬆ ${convert_To_Celsius(res.days[0].tempmax)}`;
            temp_min.textContent=`⬇ ${convert_To_Celsius(res.days[0].tempmin)}`;
            feels_like.innerHTML=`<i class="fa-solid fa-person"></i> ${convert_To_Celsius(res.days[0].feelslike)}`;
         }else{
           temp_max.textContent=`⬆ ${res.days[0].tempmax}°F`;
           temp_min.textContent=`⬇ ${res.days[0].tempmin}°F`;
           feels_like.innerHTML=`<i class="fa-solid fa-person"></i> ${res.days[0].feelslike}°F`;
         }
         desc.textContent=res.days[0].description;
         
         if(dark_mode_state=="W")desc.classList.add("left_indent_effect_white_mode");
         else desc.classList.add("left_indent_effect_dark_mode");
         humidity.innerHTML=`<span id="change_text">HUM</span> : ${res.days[0].humidity}%`; 
         document.getElementById("change_text").style.fontSize="1rem";
    })
    .catch((err) =>{
        glob_res="-1";
        city_name.innerHTML="";
        temp_max.innerHTML="";
        temp_min.innerHTML="";
        feels_like.innerHTML="";
        desc.innerHTML="";
        desc.classList.remove("left_indent_effect_white_mode");
        desc.classList.remove("left_indent_effect_dark_mode");
        humidity.innerHTML="";
        error.innerHTML="";

        error.textContent="Error! Please Try Again 😓";
    });
  }
});

const change_temp_unit=document.getElementById("change_temp_unit");
const change_temp_unit_text=document.getElementById("change_temp_unit_text");

change_temp_unit.addEventListener("click",e=>{
    if(temperature_turn=="C")temperature_turn="F";
    else temperature_turn="C";
     
     if(glob_res!="-1"){
        
        if(temperature_turn=="F"){
          temp_max.textContent=`⬆ ${glob_res.days[0].tempmax}°F`;// in Farenheit
          temp_min.textContent=`⬇ ${glob_res.days[0].tempmin}°F`;// in Farenheit
          feels_like.innerHTML=`<i class="fa-solid fa-person"></i> ${glob_res.days[0].feelslike}°F`;
          change_temp_unit_text.textContent="fahrenheit";
          // change_temp_unit_text.style.color="#B93160";
        }else{
           temp_max.textContent=`⬆ ${convert_To_Celsius(glob_res.days[0].tempmax)}`;// in Farenheit
           temp_min.textContent=`⬇ ${convert_To_Celsius(glob_res.days[0].tempmin)}`;// in Farenheit
           feels_like.innerHTML=`<i class="fa-solid fa-person"></i> ${convert_To_Celsius(glob_res.days[0].feelslike)}`;     
           change_temp_unit_text.textContent="celsius";  
          //  change_temp_unit_text.style.color="#5800FF";

        }
     }
});


const convert_To_Celsius=(temp)=>{
     let newTemp=(temp-32)/1.8000;
     return Math.round(newTemp * 10) / 10+"°C"
}


//Implementing Dark Mode
const dark_mode=document.getElementById("dark_mode");

const main=document.getElementById("main");
const weather_info=document.getElementById("weather_info");

const dark_mode_text=document.getElementById("dark_mode_text");

dark_mode.addEventListener("click",e=>{
     if(dark_mode_state=="W"){   
        main.classList.remove("main_white_mode");
        main.classList.add("main_dark_mode"); 
        
        weather_info.classList.remove("weather_info_white_mode");
        weather_info.classList.add("weather_info_dark_mode");

        change_temp_unit_text.classList.remove("change_temp_unit_text_white_mode");
        change_temp_unit_text.classList.add("change_temp_unit_text_dark_mode");

        dark_mode_text.classList.remove("dark_mode_text_white_mode");
        dark_mode_text.classList.add("dark_mode_text_dark_mode");

        city_name.classList.remove("city_name_white_mode");
        city_name.classList.add("city_name_dark_mode");

        temp_max.classList.remove("temp_max_white_mode");
        temp_max.classList.add("temp_max_dark_mode");

        temp_min.classList.remove("temp_min_white_mode");
        temp_min.classList.add("temp_min_dark_mode");

        feels_like.classList.remove("feels_like_white_mode");
        feels_like.classList.add("feels_like_dark_mode");

        humidity.classList.remove("humidity_white_mode");
        humidity.classList.add("humidity_dark_mode");

        desc.classList.remove("desc_white_mode");
        desc.classList.add("desc_dark_mode");

        dark_mode.classList.remove("dark_mode_white_mode");
        dark_mode.classList.add("dark_mode_dark_mode");

        error.classList.remove("error_white_mode");
        error.classList.add("error_dark_mode");
        
        if(glob_res!=-1){
        desc.classList.remove("left_indent_effect_white_mode");
        desc.classList.add("left_indent_effect_dark_mode");
        }

        dark_mode_state="B";
     }else if(dark_mode_state=="B"){
        main.classList.remove("main_dark_mode");  
        main.classList.add("main_white_mode");

        weather_info.classList.remove("weather_info_dark_mode");
        weather_info.classList.add("weather_info_white_mode");

        change_temp_unit_text.classList.remove("change_temp_unit_text_dark_mode");
        change_temp_unit_text.classList.add("change_temp_unit_text_white_mode");

        dark_mode_text.classList.remove("dark_mode_text_dark_mode");
        dark_mode_text.classList.add("dark_mode_text_white_mode");

        city_name.classList.remove("city_name_dark_mode");
        city_name.classList.add("city_name_white_mode");

        temp_max.classList.remove("temp_max_dark_mode");
        temp_max.classList.add("temp_max_white_mode");

        temp_min.classList.remove("temp_min_dark_mode");        
        temp_min.classList.add("temp_min_white_mode");

        feels_like.classList.remove("feels_like_dark_mode");
        feels_like.classList.add("feels_like_white_mode");

        humidity.classList.remove("humidity_dark_mode");
        humidity.classList.add("humidity_white_mode");

        desc.classList.remove("desc_dark_mode");
        desc.classList.add("desc_white_mode");

        dark_mode.classList.remove("dark_mode_dark_mode");
        dark_mode.classList.add("dark_mode_white_mode");

        error.classList.remove("error_dark_mode");
        error.classList.add("error_white_mode");
        
        if(glob_res!=-1){
        desc.classList.remove("left_indent_effect_dark_mode");
        desc.classList.add("left_indent_effect_white_mode");
        }

        dark_mode_state="W";
     }
});




