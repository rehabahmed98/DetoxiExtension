
var els = document.getElementsByClassName("tweet");
for(var z = 0; z < els.length; z++) {
  els[z].addEventListener('click', function(){
    var c = decodeURI(this.getAttribute("data-original-content"));
    if(this.parentNode!=null){
      this.parentNode.classList.remove("squished")
      this.parentNode.innerHTML = "<span style='color: white;'>" + c + "</span>";
      }
  });
}