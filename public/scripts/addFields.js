
var elementNumber = 0;
var ingredientNumber = 0;
var stepNumber = 0;
function increment(type){
  if(type === 1){
    ingredientNumber += 1;
  }else if(type === 2){
    stepNumber += 1;
  }
  elementNumber += 1;
}

function removeElement(parentDiv, childDiv){
  if (childDiv === parentDiv){
    alert("Error: Parent Cannot Be Deleted");
  }
  else if (document.getElementById(childDiv)){
    var child = document.getElementById(childDiv);
    var parent = document.getElementById(parentDiv);
    parent.removeChild(child);
    if(parentDiv === "ingredients"){
      ingredientNumber -= 1;
    }else {
      stepNumber -= 1;
    }
  }
  else{
    alert("Error Removing This Item");
    return false;
  }
}

function addIngredient(){
  var r = document.createElement('div');
  var l = document.createElement('Label');
  var y = document.createElement("INPUT");
  var g = document.createElement("A");
  var t = document.createTextNode("\u00D7");
  increment(1);
  l.innerHTML = "Ingredient " + ingredientNumber + ":";
  r.appendChild(l);
  y.setAttribute("type", "text");
  y.setAttribute("placeholder", "Ingredient");
  y.setAttribute("required", "true");
  g.appendChild(t);
  y.setAttribute("Name", "ingredient_" + elementNumber);
  r.appendChild(y);
  g.setAttribute("onclick", "removeElement('ingredients','id_" + elementNumber + "')");
  r.appendChild(g);
  r.setAttribute("id", "id_" + elementNumber);
  r.setAttribute("class", "input-container");
  document.getElementById("ingredients").appendChild(r);
}

function addStep(){
  var r = document.createElement('div');
  var l = document.createElement('Label');
  var y = document.createElement("TEXTAREA");
  var g = document.createElement("A");
  var t = document.createTextNode("\u00D7");
  increment(2);
  l.innerHTML = "Step " + stepNumber + ":";
  r.appendChild(l);
  y.setAttribute("cols", "17");
  y.setAttribute("placeholder", "Your Instruction Here");
  y.setAttribute("required", "true");
  g.appendChild(t);
  y.setAttribute("Name", "step_" + elementNumber);
  r.appendChild(y);
  g.setAttribute("onclick", "removeElement('steps','id_" + elementNumber + "')");
  r.appendChild(g);
  r.setAttribute("id", "id_" + elementNumber);
  r.setAttribute("class", "input-container");
  document.getElementById("steps").appendChild(r);
}
