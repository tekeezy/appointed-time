(function() {
  if (localStorage.getItem("joined") && CURRENT_STEP < 3) {
    window.location = "./step-3.html";
  }
})();
