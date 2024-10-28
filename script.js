const validCountries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", 
  "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
  "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", 
  "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", 
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", 
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", 
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", 
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
  "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
  "Portugal", "Qatar", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", 
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", 
  "Yemen", "Zambia", "Zimbabwe"
];

htmlMain = `
    <div class="box box-main flex flex-col bg-white text-black shadow-2xl-top">
        <img class="block image-main" alt="Country Flag" src="">
        <div class="box-select flex flex-col flex-1 justify-evenly">
            <div class="div-21 flex mx-auto">
                <h1 class="text-info">Country Name</h1>
                <h1 class="font-bold text-info ml-4 text-center name-main"></h1>
            </div>
            <div class="div-22 flex mx-auto">
                <h1 class="text-info">Capital Name</h1>
                <h1 class="text-info ml-4 text-center capital-main"></h1>
            </div>
            <div class="div-23 flex mx-auto">
                <h1 class="text-info">Population</h1>
                <h1 class="text-info ml-4 text-center population-main"></h1>
            </div>
            <div class="div-24 flex mx-auto">
                <h1 class="text-info">Continents</h1>
                <h1 class="text-info ml-4 text-center continents-main"></h1> 
            </div>
            <div class="div-25 flex mx-auto">
                <h1 class="text-info">Currency</h1>
                <h1 class="text-info ml-4 text-center currency-main"></h1> 
            </div>
        </div>
    </div>
`;
htmlNeigh = `
    <div class="box box-neigh flex flex-col bg-white text-black shadow-2xl-top">
        <img class="block image-neigh" alt="Neighbour Flag" src="">
        <div class="box-select neigh-change flex flex-col flex-1 justify-evenly">
            <div class="div-31 flex mx-auto">
                <h1 class="neigh-info text-info">Country Name</h1>
                <h1 class="neigh-info font-bold text-info ml-4 text-center name-neigh"></h1>
            </div>
            <div class="div-32 flex mx-auto">
                <h1 class="neigh-info text-info">Capital Name</h1>
                <h1 class="neigh-info text-info ml-4 text-center capital-neigh"></h1>
            </div>
            <div class="div-33 flex mx-auto">
                <h1 class="neigh-info text-info">Population</h1>
                <h1 class="neigh-info text-info ml-4 text-center population-neigh"></h1>
            </div>
            <div class="div-34 flex mx-auto">
                <h1 class="neigh-info text-info">Continents</h1>
                <h1 class="neigh-info text-info ml-4 text-center continents-neigh"></h1> 
            </div>
            <div class="div-35 flex mx-auto">
                <h1 class="neigh-info text-info">Currency</h1>
                <h1 class="neigh-info text-info ml-4 text-center currency-neigh"></h1> 
            </div>
        </div>
    </div>
`;

// Function Area Start
let text = "Country Explorer";
let typingTextElement = document.querySelector(".text-middle");
let index = 0;
const textMiddle = function() {
    if (index < text.length) {
        typingTextElement.textContent += text[index];
        index++;
        setTimeout(textMiddle, 180);
    }
};



const getMainInfo = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    const data = await response.json();
    addInformationMain(data);

    // Algo for different neighbours each time 
    let arr = data[0].borders;
    if (Array.isArray(arr) && arr.length >= 2){
      let i = Math.floor(Math.random() * arr.length);
      const neigh1 = arr[i];
      arr = arr.filter(num => num!==arr[i]);
      i = Math.floor(Math.random() * arr.length);
      const neigh2 = arr[i];
      getNeighInfo(neigh1, renderNeigh1Div());
      getNeighInfo(neigh2, renderNeigh2Div());
      if(document.querySelector(".text-dark-mode").textContent=="Dark Mode" && !document.querySelector(".box-select").classList.contains("bg-change")){
          toggleDarkAndLightModeForBoxes();
      } 
    // Algo ends
    }
    else{ // If only Main is there , no Neighbour
      if(document.querySelector(".text-dark-mode").textContent=="Dark Mode" && !document.querySelector(".box-select").classList.contains("bg-change")){
        toggleDarkAndLightModeForBoxes();
    } 
    }
}
  catch (err) {
    console.error("Error Occured During Fetching : ", err);
  }
};
const getNeighInfo = async function (country , neighContainer) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${country}`
    );
    const data = await response.json();
    addInformationNeigh(data, neighContainer);
  }
  catch (err) {
    console.error("Error Occured During Fetching : ", err);
  }
};

const renderMainDiv = function () {
  const temp = document.createElement("div");
  temp.innerHTML = htmlMain;
  const newElement = temp.querySelector(".box");
  document
    .querySelector(".parent")
    .insertAdjacentElement("afterbegin", newElement);
};

const renderNeigh1Div = function () {
  const temp = document.createElement("div");
  temp.innerHTML = htmlNeigh;
  const newElement = temp.querySelector(".box");
  document
    .querySelector(".parent")
    .insertAdjacentElement("beforeend", newElement);
  return newElement;
};
const renderNeigh2Div = function () {
  const temp = document.createElement("div");
  temp.innerHTML = htmlNeigh;
  const newElement = temp.querySelector(".box");
  document
    .querySelector(".parent")
    .insertAdjacentElement("afterbegin", newElement);
  return newElement;
};

const resultDisplay = function () {
  document.querySelector(".total-main").classList.remove("flex");
  document.querySelector(".total-main").classList.add("hidden");
  document.querySelector(".total-boxes").classList.add("grid");
  document.querySelector(".total-boxes").classList.remove("hidden");
};

const resultHide = function () {
  document.querySelector(".total-main").classList.add("flex");
  document.querySelector(".total-main").classList.remove("hidden");
  document.querySelector(".total-boxes").classList.remove("grid");
  document.querySelector(".total-boxes").classList.add("hidden");
};

const removeAllElements = function () {
  document.querySelector(".parent").replaceChildren();
};

const addInformationMain = function (data) {
    document.querySelector(".name-main").textContent = data[0].name.common;
    document.querySelector(".capital-main").textContent = data[0].capital;
     document.querySelector(".population-main").textContent = (data[0].population/1000000).toFixed(2) + " " + "million";
    // Population calculation
    document.querySelector(".image-main").src = data[0].flags.png;
    document.querySelector(".continents-main").textContent = data[0].continents;
    const currencyCode = Object.keys(data[0].currencies)[0];
    document.querySelector(".currency-main").textContent =
      currencyCode + " " + "(" + data[0].currencies[currencyCode].symbol + ")";
};
const addInformationNeigh = function (data, neighContainer) {
    neighContainer.querySelector(".name-neigh").textContent = data[0].name.common;
    neighContainer.querySelector(".capital-neigh").textContent = data[0].capital;
    neighContainer.querySelector(".image-neigh").src = data[0].flags.png;
    // Population calculation
    neighContainer.querySelector(".population-neigh").textContent = (data[0].population / 1000000).toFixed(2) + " million";
    neighContainer.querySelector(".continents-neigh").textContent = data[0].continents;
    const currencyCode = Object.keys(data[0].currencies)[0];
    neighContainer.querySelector(".currency-neigh").textContent =
      currencyCode + " (" + data[0].currencies[currencyCode].symbol + ")";
  };
const isCountryValid = inputCountry => validCountries.some(country => country.toLowerCase() === inputCountry.toLowerCase());;
const toggleDarkAndLightModeForMain = function(){                                              // Dark Mode Function
  // Mode Change Toggle Button                                       
  document.querySelector("body").classList.toggle("bg-change");
  document.querySelector(".text-dark-mode").classList.toggle("text-change");
  document.querySelector(".div-dark-mode").classList.toggle("flex-row-reverse");
  document.querySelector(".div-dark-mode").classList.toggle("bg-white-green");
  document.querySelector(".div-dark-mode").classList.toggle("bg-black-white");
  if(document.querySelector(".div-dark-mode").classList.contains("bg-black-white"))
    document.querySelector(".text-dark-mode").textContent = "Dark Mode";
  if(document.querySelector(".div-dark-mode").classList.contains("bg-white-green"))
    document.querySelector(".text-dark-mode").textContent = "Light Mode";

    //Navbar
    document.querySelector(".nav").classList.toggle("bg-change-navbar");
    document.querySelector(".nav").classList.toggle("bg-emerald-500");
    // Select all elements with the class 'nav-item'
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.toggle('text-change-nav-item');
      item.classList.toggle('text-white');
    });
    // Country Explorer
    document.querySelector(".heading").classList.toggle("text-change");
    document.querySelector(".heading").classList.toggle("text-emerald-500");
    // Border
    document.querySelector(".box-border").classList.toggle("border-change");
    document.querySelector(".box-border").classList.toggle("border-emerald-200");
    // Enter Any Country
    document.querySelector(".box-text").classList.toggle("text-change");
    document.querySelector(".box-text").classList.toggle("text-emerald-500");
    // Country...
    document.querySelector(".val-input").classList.toggle("bg-change-input");
    document.querySelector(".val-input").classList.toggle("text-change");
    // Reset
    document.querySelector(".btn-reset").classList.toggle("bg-emerald-500");
    document.querySelector(".btn-reset").classList.toggle("bg-change-btn");
    document.querySelector(".btn-reset").classList.toggle("text-change-btn");
    document.querySelector(".btn-reset").classList.toggle("text-white");
    // Submit
    document.querySelector(".btn-submit").classList.toggle("bg-emerald-500");
    document.querySelector(".btn-submit").classList.toggle("bg-change-btn");
    document.querySelector(".btn-submit").classList.toggle("text-change-btn");
    document.querySelector(".btn-submit").classList.toggle("text-white");
    // Close
    document.querySelector(".btn-close").classList.toggle("bg-emerald-500");
    document.querySelector(".btn-close").classList.toggle("bg-change-btn");
    document.querySelector(".btn-close").classList.toggle("text-change-btn");
    document.querySelector(".btn-close").classList.toggle("text-white");
    document.querySelector(".btn-close").classList.toggle("hover:text-white");
    return 1;
  }
  const toggleDarkAndLightModeForBoxes = function(){
    // Box Background
    const boxes = document.querySelectorAll(".box-select");
    boxes.forEach(box =>{
    box.classList.toggle("bg-change");
    });
    // Box Text Color
    const allTexts = document.querySelectorAll(".text-info");
    allTexts.forEach(text =>{
      text.classList.toggle("text-change");
    });
    
  };
  const setPreviousModeInfo = function(){
    if(document.querySelector(".text-dark-mode").textContent=="Dark Mode"){
      localStorage.clear();
      localStorage.setItem("darkMode","true");
    }
    else{
      localStorage.clear();
      localStorage.setItem("darkMode","false");
    }

  };
  const getPreviousModeInfo = function(){
    if(localStorage.getItem("darkMode")=="true"){
      toggleDarkAndLightModeForMain();
      toggleDarkAndLightModeForBoxes();
    }
  };
// Function Area End
getPreviousModeInfo(); // To Get The Info About The Last Mode Selected 
textMiddle(); // Initial Text Animation Function call 
document.querySelector(".btn-submit").addEventListener("click", function () {
  // Submit Button Event
  let inputCountry = document.querySelector(".val-input").value;
  if(!isCountryValid(inputCountry)){
    document.querySelector(".error").classList.remove("hidden");
    return;
  }
  if(!document.querySelector(".error").classList.contains("hidden")){
    document.querySelector(".error").classList.add("hidden")
  }
  getMainInfo(inputCountry);
  renderMainDiv();
  resultDisplay();
});

document.querySelector(".btn-reset").addEventListener("click", function () {
  // Reset Button Event
  document.querySelector(".val-input").value = "";
  if(!document.querySelector(".error").classList.contains("hidden")){
    document.querySelector(".error").classList.add("hidden")
  }
});

document.addEventListener("keydown", function (e) {
  // Enter Button Event
  let inputCountry = document.querySelector(".val-input").value;
  if (e.key == "Enter" && !document.querySelector(".total-main").classList.contains("hidden") && inputCountry!='') {
      if(!isCountryValid(inputCountry)){
        document.querySelector(".error").classList.remove("hidden");
        return;
      }
      if(!document.querySelector(".error").classList.contains("hidden")){
        document.querySelector(".error").classList.add("hidden");
      }
      getMainInfo(inputCountry);
      renderMainDiv();
      resultDisplay();
  }
});

document.querySelector(".btn-close").addEventListener("click", function () {
  // Close Button Event
  resultHide();
  removeAllElements();
});

document.querySelector(".btn-logo").addEventListener("click", function () {
  // Logo Button Event
  resultHide();
  removeAllElements();
});

const navItems = document.querySelectorAll(".nav .nav-item"); // Navbar Buttons Event
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    const res = item.textContent;
    resultHide();
    removeAllElements();
    if(!document.querySelector(".error").classList.contains("hidden")){
      document.querySelector(".error").classList.add("hidden")
    }
    getMainInfo(res);
    renderMainDiv();
    resultDisplay();
  });
});

document.querySelector(".div-dark-mode").addEventListener("click", function(){ // Dark Mode and Light Mode Toggle Button Event
  toggleDarkAndLightModeForMain();
  if(document.querySelector(".box-main") != undefined)
    toggleDarkAndLightModeForBoxes();
  setPreviousModeInfo();
});