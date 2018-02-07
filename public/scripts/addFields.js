
var elementNumber = 0;
function increment(){
  elementNumber += 1;
}

function removeElement(parentDiv, childDiv){
  if (childDiv == parentDiv){
    alert("Error: Parent Cannot Be Deleted");
  }
  else if (document.getElementById(childDiv)){
    var child = document.getElementById(childDiv);
    var parent = document.getElementById(parentDiv);
    parent.removeChild(child);
  }
  else{
    alert("Error Removing This Item");
    return false;
  }
}

function addIngredient(){
  var r = document.createElement('span');
  var y = document.createElement("INPUT");
  var g = document.createElement("A");
  var t = document.createTextNode("\u00D7");
  y.setAttribute("type", "text");
  y.setAttribute("placeholder", "Ingredient");
  g.appendChild(t);
  increment();
  y.setAttribute("Name", "ingredient_" + elementNumber);
  r.appendChild(y);
  g.setAttribute("onclick", "removeElement('recipeForm','id_" + elementNumber + "')");
  r.appendChild(g);
  r.setAttribute("id", "id_" + elementNumber);
  document.getElementById("recipeForm").appendChild(r);
}

function addStep(){
  var r = document.createElement('span');
  var y = document.createElement("TEXTAREA");
  var g = document.createElement("A");
  var t = document.createTextNode("\u00D7");
  y.setAttribute("cols", "17");
  y.setAttribute("placeholder", "Your Instruction Here");
  g.appendChild(t);
  increment();
  y.setAttribute("Name", "step_" + elementNumber);
  r.appendChild(y);
  g.setAttribute("onclick", "removeElement('recipeForm','id_" + elementNumber + "')");
  r.appendChild(g);
  r.setAttribute("id", "id_" + elementNumber);
  document.getElementById("recipeForm").appendChild(r);
}
