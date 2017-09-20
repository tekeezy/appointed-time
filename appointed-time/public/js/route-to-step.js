(function() {
  if (localStorage.getItem("joined") && CURRENT_STEP != 3
        && ! localStorage.getItem("checked_time")) {
    window.location = "./step-3.html";
  }

  if (localStorage.getItem("checked_time") && CURRENT_STEP != 4) {
    window.location = "./step-4.html";
  }
})();
