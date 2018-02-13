function toggleDelete() {
  var buttons = document.getElementsByClassName("delete");
  for (var i = 0;i < buttons.length; i += 1){
    if (buttons[i].style.display !== 'inline-block') {
      buttons[i].style.display = 'inline-block';
    }
    else {
      buttons[i].style.display = 'none';
    }
  }
}