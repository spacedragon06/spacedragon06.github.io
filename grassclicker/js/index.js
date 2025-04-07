let grass = 0;

class ItemEntry {
  constructor(item, name, desc, type) {
    let container = document.createElement("md-list-item");
    container.setAttribute("onclick", `buyItem(${item})");`);

    let headline = document.createElement("div");
    headline.setAttribute("slot", "headline");
    headline.innerHTML = name;

    let descelem = document.createElement("div");
    descelem.setAttribute("slot", "supporting-text");
    descelem.innerHTML = desc;

    let amount = document.createElement("div");
    amount.setAttribute("slot", "trailing-supporting-text");
    if (type != "special") {
      amount.innerHTML = "0";
    }

    container.append(headline);
    container.append(descelem);
    container.append(amount);
    document.getElementById("shop").append(container);

    this.desc = descelem;
    this.amount = amount;
  }
}

class Item {
  constructor(amount, price, grass, name, type, item, handler, desc) {
    this.amount = amount;
    this.price = price;
    this.grass = grass;
    this.name = name;
    this.type = type;
    if (this.type == "special") {
      this.desc = desc + " | price " + this.price;
    } else {
      this.desc = this.grass + " grass per second" + " | price " + this.price;
    }
    this.entry = new ItemEntry(
      "items." + item,
      this.name,
      this.desc,
      this.type,
    );
    this.handler = handler;
  }
}

let items = {
  lawnmower: new Item(0, 100, 1, "Lawnmower", "normal", "lawnmower", "", ""),
  grassfield: new Item(
    0,
    1100,
    7,
    "Grass Field",
    "normal",
    "grassfield",
    "",
    "",
  ),
  cloudseeder: new Item(
    0,
    4000,
    2,
    "Cloud Seeder",
    "special",
    "cloudseeder",
    "buyCloudSeeder()",
    "Increase grass produced by Grass Field",
  ),
  grassfarm: new Item(
    0,
    10000,
    100,
    "Grass Farm",
    "normal",
    "grassfarm",
    "",
    "",
  ),
  artificialisland: new Item(
    0,
    1000000,
    10,
    "Artificial Island",
    "special",
    "artificialisland",
    "buyArtificialIsland()",
    "Increase grass produced by Grass Farm",
  ),
};

function buyItem(item) {
  if (grass < item.price) {
    window.alert("not enough grass");
  } else {
    grass -= item.price;
    if (item.type == "normal") {
      item.amount += 1;
      item.entry.amount.innerHTML = item.amount;
    } else if (item.type == "special") {
      eval(item.handler);
    }
    refreshGrass();
  }
}

function incrementGrass(gras) {
  let item;
  for (i = 0; i < Object.keys(items).length; i++) {
    item = items[Object.keys(items)[i]];
    gras += item.grass * item.amount;
  }
  return gras;
}

function touchGrass() {
  grass += 1;
  scoreTxt.innerHTML = grass;
}

function refreshGrass() {
  scoreTxt.innerHTML = grass;
}

function buyCloudSeeder() {
  parsed = items.grassfield.entry.desc.innerHTML.split(" ");
  refreshGrass();
}

function refreshScreenOrientation() {
  if (screen.orientation.type == "portrait-primary") {
    document.getElementById("container").style.flexDirection = "column";
  }
  if (screen.orientation.type == "landscape-primary") {
    document.getElementById("container").style.flexDirection = "row";
  }
}
function setMode() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classlist.add("dark");
    document.getElementById("darkmode").selected = true;
  }
}
function updateMode() {
  if (document.getElementById("darkmode").selected == false) {
    document.body.classList.replace("dark", "light");
  }
  if (document.getElementById("darkmode").selected == true) {
    document.body.classList.replace("light", "dark");
  }
}
function saveAll() {
  localStorage.setItem("grass", grass);
  localStorage.setItem("items", items);
}
function loadAll() {
  grass = Number(localStorage.getItem("grass"));
  items = Object(localStorage.getItem("items"));
  for (i = 0; i < Object.keys(items).length; i++) {
    item = items[Object.keys(items)[i]];
    item.entry.amount = item.amount;
  }
  refreshGrass();
}
function resetSave() {
  localStorage.clear();
}

window.addEventListener("DOMContentLoaded", function () {
  scoreTxt = document.createElement("div");
  scoreTxt.style.alignSelf = "center";
  scoreTxt.style.flex = 1;
  scoreTxt.style.width = "400px";
  document.getElementById("outerContainer").append(scoreTxt);
  scoreTxt.id = "score";
  scoreTxt.innerHTML = grass;

  refreshScreenOrientation();
  screen.orientation.onchange = "refreshScreenOrientation();";
  updateMode();
  document.getElementById("darkmode").addEventListener("change", updateMode());
  setInterval(function () {
    grass = incrementGrass(grass);
    refreshGrass();
  }, 1000);
});
