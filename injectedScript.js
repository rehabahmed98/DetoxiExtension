console.log("E7na fel injecteddd dlwa2tyyyy")
var els = document.getElementsByClassName("tweet");
for(var z = 0; z < els.length; z++) {
  els[z].addEventListener('click', function(){
    var c = decodeURI(this.getAttribute("data-original-content"));
    // this.parentNode.innerHTML = c;
    this.parentNode.innerHTML = "<span style='color: white;'>" + c + "</span>";
  });
}