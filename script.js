const BASE_URL = "https://geo.ipify.org/api/v2/country,city?apiKey=at_3xkaA5UMUdpGLdNUmcf1GKhwouSS0&ipAddress=";

let inputBtn = document.getElementById("btn");
let userInput = document.getElementById("user-input");
let ipAddress = "";

let ip = document.getElementById("ip-address");
let loc = document.getElementById("location");
let time = document.getElementById("timezone");
let isp = document.getElementById("isp");

// User Device IP Address - on page load ------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', ()=> {
  updateInfo();
})

// User Input IP Address -------------------------------------------------------------------------

// input by clicking button ----------------------------------------------------------------------

inputBtn.addEventListener("click", (e) => {
  validateIp();
});

// input by enter key -----------------------------------------------------------------------------

userInput.addEventListener("keydown", (e)=> {

  if(e.keyCode === 13){
    userInput.blur();
    validateIp();
  }

})

// validate ipAdress ---------------------------------------------------------------------------

let validateIp = () => {

  ipAddress = userInput.value;

  if (ipAddress != "") {
    updateInfo();
  }

}

// fetching info using API ----------------------------------------------------------------------

let updateInfo = async () => {
  let URL = `${BASE_URL}${ipAddress}`;
  let response = await fetch(URL);
  let data = await response.json();

  if (response.status == 200){ 
      ip.textContent = data.ip;
      isp.textContent = data.isp;
      loc.textContent = data.location.city + ", " + data.location.country;
      time.textContent = "UTC " + data.location.timezone;

      let lat = data.location.lat;
      let lng = data.location.lng;

      generateMap(lat,lng);
    }

    else{
      invalidInput();
    }
};

// Map using Leaflet JS API-------------------------------------------------------------------------------------

let map;
let marker;

let generateMap = (latitude,longitude) => {

  const isMobile = window.innerWidth <= 768;

  if (!map) {
    map = L.map("map", { zoomControl: !isMobile });
  }
    map.setView([latitude, longitude], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


  if (marker){
    map.removeLayer(marker);
  }
  marker = L.marker([latitude, longitude]).addTo(map);
    
}

// invalidInput -------------------------------------------------------------------------------------

let invalidInput = () => {
  console.log("ERROR - PLEASE ENTER VALID ADDRESS OR DOMAIN");
  alert("Invalid IP Address !");
}
