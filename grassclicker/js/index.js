let grass = 0;
let grassPerSecond = 0;

function shortenValue(x) {
  if (x / 1000 >= 1 && x / 1000 < 1000) {
    return x / 1000 + "K";
  } else if (x / 10 ** 6 >= 1 && x / 10 ** 6 < 1000) {
    return x / 10 ** 6 + "M";
  } else if (x / 10 ** 9 >= 1 && x / 10 ** 9 < 1000) {
    return x / 10 ** 9 + "B";
  } else if (x / 10 ** 12 >= 1) {
    return x / 10 ** 12 + "T";
  } else {
    return x;
  }
}

class ItemEntry {
  constructor(item, name, desc, type) {
    let container = document.createElement("md-list-item");
    container.setAttribute("onclick", `buyItem(${item});`);

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
      this.desc = desc + " | price " + shortenValue(this.price);
    } else {
      this.desc =
        this.grass +
        " grass per second" +
        " | price " +
        shortenValue(this.price);
    }
    this.entry = new ItemEntry(
      "items." + item,
      this.name,
      this.desc,
      this.type
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
    ""
  ),
  cloudseeder: new Item(
    0,
    4000,
    25,
    "Cloud Seeder",
    "normal",
    "cloudseeder",
    "",
    ""
  ),
  grassfarm: new Item(
    0,
    10000,
    100,
    "Grass Farm",
    "normal",
    "grassfarm",
    "",
    ""
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
    setGrassPerSecond();
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
  cps.innerHTML = grassPerSecond;
}

function setGrassPerSecond() {
  let item;
  let g = 0;
  for (i = 0; i < Object.keys(items).length; i++) {
    item = items[Object.keys(items)[i]];
    g += item.grass * item.amount;
  }
  grassPerSecond = g;
}

function checkMilestone() {}

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
  /*if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classlist.add("dark");
    document.getElementById("darkmode").selected = true;
  }*/
}
function updateMode() {
  if (document.getElementById("darkmode").selected == true) {
    document.body.classList.replace("dark", "light");
  }
  if (document.getElementById("darkmode").selected == false) {
    document.body.classList.replace("light", "dark");
  }
}
function saveAll() {
  localStorage.setItem("grass", grass);
  let itemsS = JSON.stringify(items);
  localStorage.setItem("items", itemsS);
}
function loadAll() {
  grass = Number(localStorage.getItem("grass"));
  itemsD = Object(localStorage.getItem("items"));
  items = JSON.parse(itemsD);
  let item;
  for (i = 0; i < Object.keys(items).length; i++) {
    item = items[Object.keys(items)[i]];
    item.entry.amount.innerHTML = item.amount;
  }
  refreshGrass();
  setGrassPerSecond();
}
function resetSave() {
  localStorage.clear();
}

function main() {
  cps = document.getElementById("cps");
  scoreTxt = document.createElement("div");
  scoreTxt.style.alignSelf = "center";
  scoreTxt.style.flex = 1;
  scoreTxt.style.width = "400px";
  document.getElementById("outerContainer").append(scoreTxt);
  scoreTxt.id = "score";
  scoreTxt.innerHTML = grass;

  refreshScreenOrientation();
  screen.orientation.onchange = "refreshScreenOrientation();";
  //updateMode();
  //document.getElementById("darkmode").addEventListener("change", updateMode());
  setInterval(function () {
    grass = incrementGrass(grass);
    refreshGrass();
  }, 1000);
}
main();
