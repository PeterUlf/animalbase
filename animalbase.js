"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let currentAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};
//----------------------------------CODE PUJ
const myHeading = document.querySelectorAll("#sorting > th");
const myButtons = document.querySelectorAll(".filter");

function start( ) {
    console.log("ready");

    // TODO: Add event-listeners to filter and sort buttons
   //----------------------------------CODE PUJ
    myHeading.forEach(button => {
        button.addEventListener("click", sortButtonClick)
    });

    myButtons.forEach(botton => {
        botton.addEventListener("click", filterBottonClick)
    });
    loadJSON();
}

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );
    currentAnimals = allAnimals.filter(allAnimals => true);
    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}

//--------------------------------------SORT

function sortButtonClick(){
    console.log("sortButton");
 
    //const sort = this.dataset.sort;
    if (this.dataset.action === "sort" ){
        clearAllSort();
        console.log("forskellig fra sorted", this.dataset.action);
        this.dataset.action = "sorted";
    } else {

        if (this.dataset.sortDirection === "asc") {

            this.dataset.sortDirection = "desc";
            console.log("sortdir desc", this.dataset.sortDirection);
        } else {
            this.dataset.sortDirection = "asc";
            console.log("sortdir asc", this.dataset.sortDirection);
        }      
    }
    mySort(this.dataset.sort, this.dataset.sortDirection);
}

function clearAllSort(){
    console.log("clearAllSort");
    myHeading.forEach(botton => {
        botton.dataset.action  ="sort";
    });
}

function mySort(sortBy, sortDirection){
    console.log(`mySort-, ${sortBy} sortDirection-  ${sortDirection}  `);
    let desc =1;

    if (sortDirection === "desc"){
        desc = -1;
    } 

   currentAnimals.sort(function (a, b) {
       var x = a[sortBy];
       var y = b[sortBy];
        if (x < y) { return -1*desc; }
        if (x > y) { return 1*desc; }
        return 0;
    });

    displayList(currentAnimals);
}

//--------------------------------------FILTER

function filterBottonClick(){
    const filter =this.dataset.filter;
    clearAllSort();
    myFilter(filter);
}

function myFilter(filter){
    console.log("myFilter", filter);
    if (filter === "*"){
        currentAnimals = allAnimals.filter(allAnimals => true);
        displayList(currentAnimals);    
    } else 
    { 
         currentAnimals = allAnimals.filter(animal => animal.type === filter);
        displayList(currentAnimals);
    }
}