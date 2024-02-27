let homebut=document.getElementById("homebut");
let hotelbut=document.getElementById("hotelbut");
let flightbut=document.getElementById("flightbut");
let home=document.getElementById("home");
let hotel=document.getElementById("hotel");
let  flight=document.getElementById("flight");
 let p=document.createElement("p");
 var flag=true;
homebut.addEventListener("click",(()=>
{ 
  
    if(flag==true)
    { 
         p.innerHTML=`<p>savour the local flavours of a place, and prefer the comforts of a homely environment,Jingle Holiday Bazar Homestays is the answer.Jingle Holiday Bazar already has over 3500 homestay properties and is expanding fast. It has a stronghold in South India and across most hill stations of North India, with these places providing unique homestay experiences to customers. Some of its most popular homestay destinations are Goa, Manali, Shimla, Coorg, Wayanad, among other places.</p>`;
        home.append(p);
        flag=false;
    }
    else
    {
        p.innerHTML=``;
        home.append(p);
        flag=true;

    }
   

}))
var flag=true;
hotelbut.addEventListener("click",(()=>
{
  
    if(flag==true)
    {
         p.innerHTML=`<p>moment you secure confirmed flight ticket booking in your hand. The entire activity of searching air connectivity between two cities, checking the schedule of the flight and zeroing in on one that's most convenient to you can feel like a lot of work especially if you are in a hurry to book your flights.</p>`;
        hotel.append(p);
        flag=false;
    }
    else
    {
        p.innerHTML=``;
        hotel.append(p);
        flag=true;

    }
   

}))
var flag=true;
flightbut.addEventListener("click",(()=>
{
  
    if(flag==true)
    {
         p.innerHTML=`<p>moment you secure confirmed flight ticket booking in your hand. The entire activity of searching air connectivity between two cities, checking the schedule of the flight and zeroing in on one that's most convenient to you can feel like a lot of work especially if you are in a hurry to book your flights.</p>`;
        flight.append(p);
        flag=false;
    }
    else
    {
        p.innerHTML=``;
        flight.append(p);
        flag=true;

    }
   

}))

// gellary image add
let navbut=document.getElementById("#navi");
let nav=document.getElementsByTagName("nav");

navbut.addEventListener("click",(()=>{
    nav[0].style.background="yellow";
    

}))







