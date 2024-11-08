let grass = 0;
let lawnMultiplier = 0;
let grassFields = 0;
let grassFarms = 0;
let grassFieldAmount = 20;
let grassFarmAmount = 100;
let artificialIslandSpawned = Boolean();
window.onload = function () {
  scoreTxt = document.createElement("div");
  scoreTxt.style.alignSelf = "center";
  scoreTxt.style.flex = 1;
  scoreTxt.style.width = "400px";
  document.getElementById("outerContainer").append(scoreTxt);
  scoreTxt.id = "score";
  scoreTxt.innerHTML = grass;
  refreshScreenOrientation();
  screen.orientation.onchange = "refreshScreenOrientation();";
};
function touchGrass() {
  grass = grass + 1;
  scoreTxt.innerHTML = grass;
}
function buyLawnMower() {
  if (grass < 100) {
    window.alert("not enough grass");
  } else {
    grass = grass - 100;
    lawnMultiplier = lawnMultiplier + 1;
    updateLawnMower();
    refreshGrass();
  }
}
function updateLawnMower() {
  document.getElementById("lawnmoweramount").innerHTML = lawnMultiplier;
}
function buyGrassField() {
  if (grass < 1100) {
    window.alert("not enough grass");
  } else {
    grass = grass - 1100;
    grassFields = grassFields + 1;
    updateGrassField();
    refreshGrass();
  }
}
function updateGrassField() {
  document.getElementById("grassfieldamount").innerHTML = grassFields;
}
function buyCloudSeeder() {
  if (grass < 4000) {
    window.alert("not enough grass");
  } else {
    grass = grass - 4000;
    grassFieldAmount = grassFieldAmount + 2;
    refreshGrass();
  }
}
function buyGrassFarm() {
  if (grass < 10000) {
    window.alert("not enough grass");
  } else {
    grass = grass - 10000;
    grassFarms = grassFarms + 1;
    updateGrassFarm();
    refreshGrass();
  }
}
function updateGrassFarm() {
  document.getElementById("grassfarmamount").innerHTML = grassFarms;
}
function buyGrassFarm() {
  if (grass < 100000) {
    window.alert("not enough grass");
  } else {
    grass = grass - 100000;
    grassFarms = grassFarms + 1;
    refreshGrass();
  }
}
function spawnArtificialIsland() {
  artificialIslandBtn = document.createElement("button");
  artificialIslandBtn.innerHTML =
    "Artificial Island <br /><sub>increases grass produced by grass farm | price 1000000</sub>";
  artificialIslandBtn.onclick = function () {
    buyArtificialIsland();
  };
  artificialIslandBtn.addEventListener("click", buyArtificialIsland());
  artificialIslandBtn.id = "artificialisland";
  document.getElementById("shop").append(artificialIslandBtn);
}
function buyArtificialIsland() {
  if (artificialIslandSpawned) {
    if (grass < 1000000) {
      window.alert("not enough grass");
    } else {
      grass = grass - 1000000;
      grassFarmAmount = grassFarmAmount + 5;
    }
  }
}
setInterval(function () {
  if (grass >= 1000000 && !artificialIslandSpawned) {
    spawnArtificialIsland();
    artificialIslandSpawned = true;
  }
  grass = grass + lawnMultiplier;
  grass = grass + grassFields * grassFieldAmount;
  grass = grass + grassFarms * grassFarmAmount;
  scoreTxt.innerHTML = grass;
}, 1000);
function refreshGrass() {
  scoreTxt.innerHTML = grass;
}
function refreshScreenOrientation() {
  if (screen.orientation.type == "portrait-primary") {
    document.getElementById("container").style.flexDirection = "column";
  }
  if (screen.orientation.type == "landscape-primary") {
    document.getElementById("container").style.flexDirection = "row";
  }
}
function saveAll() {
  localStorage.setItem("grass", grass);
  localStorage.setItem("lawnMultiplier", lawnMultiplier);
  localStorage.setItem("grassFields", grassFields);
  localStorage.setItem("grassFarms", grassFarms);
  localStorage.setItem("grassFieldAmount", grassFieldAmount);
  localStorage.setItem("grassFarmAmount", grassFarmAmount);
  localStorage.setItem("artificialIslandSpawned", artificialIslandSpawned);
}
function loadAll() {
  grass = Number(localStorage.getItem("grass"));
  lawnMultiplier = Number(localStorage.getItem("lawnMultiplier"));
  grassFields = Number(localStorage.getItem("grassFields"));
  grassFarms = Number(localStorage.getItem("grassFarms"));
  grassFieldAmount = Number(localStorage.getItem("grassFieldAmount"));
  grassFarmAmount = Number(localStorage.getItem("grassFarmAmount"));
  artificialIslandSpawned = localStorage.getItem("artificialIslandSpawned");
  updateLawnMower();
  updateGrassField();
  updateGrassFarm();
  refreshGrass();
}
function resetSave() {
  localStorage.clear();
}
