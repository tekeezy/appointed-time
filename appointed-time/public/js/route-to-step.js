(function() {
  if (localStorage.getItem("joined") && CURRENT_STEP != 3
        && ! localStorage.getItem("checked_time")) {
    window.location = "./step-3.html";
  }
})();
