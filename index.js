const firebaseConfig = {
    apiKey: "AIzaSyCiJOiJQeFXPjFtFwVbC4vJCVyX39S_ybA",
    authDomain: "livelocate-a06fd.firebaseapp.com",
    projectId: "livelocate-a06fd",
    storageBucket: "livelocate-a06fd.appspot.com",
    messagingSenderId: "369891747654",
    appId: "1:369891747654:web:7f5d9b1e2e7dfbf29a2747",
    databaseURL:"https://livelocate-a06fd-default-rtdb.firebaseio.com/"
  };

  firebase.initializeApp(firebaseConfig);

  // Reference messages collection
  
  const remadd = document.querySelector("#remadd");
const fulladd = document.querySelector("#fulladd");
const longi = document.querySelector("#longi");
document.querySelector("#but").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        longi.textContent = `Latitude: ${latitude} & Longitude: ${longitude}`;
        getuseraddress(latitude, longitude);
      },
      (error) => {
          longi.textContent = error.message;
        }
        );
    }
});
let apikey = "957b3a7378604fe19100717762f8c275";
let endpoint = "https://api.opencagedata.com/geocode/v1/json";
const getuseraddress = async (latitude, longitude) => {
  let query = `${latitude},${longitude}`;
  let urlapi = `${endpoint}?key=${apikey}&q=${query}&pretty=1`;

  try {
    const res = await fetch(urlapi);
    const data = await res.json();
    fulladd.textContent = "Full Address: " + data.results[0].formatted;
    const { neighbourhood, county, state, country } =
      data.results[0].components;
    remadd.textContent = `Address: ${neighbourhood}, ${county}. ${state}, ${country}`;
    saveMessage(neighbourhood,county,state,country)
  } catch (error) {
    console.log(error);
    longi.textContent=`${error}`
  }
};

function saveMessage(neighbourhood,county,state,country){
    var messagesRef = firebase.database().ref(`location/${state}`);
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    neighbourhood: neighbourhood,
    county:county,
    state:state,
    country:country,
  });
}