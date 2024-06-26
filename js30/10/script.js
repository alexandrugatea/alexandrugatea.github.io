(function () {
    const checkboxes = document.querySelectorAll('.inbox [type=checkbox]');
    let lastChecked;
    checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));

    function handleCheck(e) {
        // Check if SHIFT was down
        // and check if checkboxes are checked, not unchecked
        let inBetween = false;
        if (e.shiftKey) {
            // select all in between
            // loop over evesy single checkbox
            checkboxes.forEach(checkbox => {
                if (checkbox === this || checkbox === lastChecked) {
                    inBetween = !inBetween;
                }

                if (inBetween) {
                    checkbox.checked = lastChecked.checked;
                }

            })
        }

        lastChecked = this;
    }
})();