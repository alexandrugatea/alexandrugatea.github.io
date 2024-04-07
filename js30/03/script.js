(function () {

    const inputs = document.querySelectorAll(".controls input");
    
    function handleUpdate() {
        const suffix = this.dataset.sizing || "";
        document.getElementById("js30ProjectContent").style.setProperty(`--${this.name}`, this.value + suffix)
    };
    
    inputs.forEach(input => input.addEventListener("input", handleUpdate));
})();