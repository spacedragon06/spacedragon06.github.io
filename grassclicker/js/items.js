let items = [
  {
    amount: 0,
    price: 100,
    grass: 1,
    type: "normal",
    element: "lawnmoweramount",
  },
  {
    amount: 0,
    price: 1100,
    grass: 20,
    type: "normal",
    element: "grassfieldamount",
  },
  {
    amount: 0,
    price: 4000,
    grass: 2,
    type: "special",
    handler: "buyCloudSeeder()",
  },
  {
    amount: 0,
    price: 10000,
    grass: 100,
    type: "normal",
    element: "grassfarmamount",
  },
  {
    amount: 0,
    price: 1000000,
    grass: 10,
    type: "special",
    handler: "buyArtificialIsland()",
  },
];

function buyItem(item) {
  if (grass < item.price) {
    window.alert("not enough grass");
  } else {
    grass -= item.price;
    item.amount += 1;
    document.getElementById(item.element).innerHTML = item.amount;
    refreshGrass();
  }
}

function incrementGrass() {
  items.forEach(function (item) {
    console.log(item);
    gras += item.grass * item.amount;
    try {
      document.getElementById(item.element).innerHTML = item.amount;
    } catch (err) {}
  });
  return gras;
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
