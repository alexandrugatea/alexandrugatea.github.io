(function () {
    console.clear();
    const btn = document.querySelector('#buttonOnce');

    const family1 = document.getElementById("family1");
    const family1Members = family1.querySelectorAll('div')
    const family2 = document.getElementById("family2");
    const family2Members = family2.querySelectorAll('div')
    const family3 = document.getElementById("family3");
    const family3Members = family3.querySelectorAll('div')

    family1Members.forEach((member) => member.addEventListener("click", logFamilyOne));
    family2Members.forEach((member) => member.addEventListener("click", logFamilyTwo , { capture: true }));
    family3Members.forEach((member) => member.addEventListener("click", logFamilyThree));

    family1Members.forEach((member) => member.addEventListener("transitionend", removeAnimation));
    family2Members.forEach((member) => member.addEventListener("transitionend", removeAnimation));
    family3Members.forEach((member) => member.addEventListener("transitionend", removeAnimation));

    function removeAnimation(e) {
        console.log(e);
        if (e.propertyName !== "box-shadow") return;
        e.target.classList.remove("animate");
    }

    function logFamilyOne(e) {   
        document.getElementById(e.currentTarget.id).classList.add('animate');
        console.log("%cDemonstration of Bubbling Events", "color: #ff0000; font-size: 18px;");
        console.log("You clicked on %s, but current element is %s", e.target.id, e.currentTarget.id);
    }

    function logFamilyTwo(e) {        
        console.log("%cDemonstration of Capturing Events", "color: #ffc300; font-size: 18px;");
        console.log("You clicked on %s, but current element is %s", e.target.id, e.currentTarget.id);
        document.getElementById(e.currentTarget.id).classList.add('animate');
    }

    function logFamilyThree(e) { 
        e.stopPropagation(); 
        document.getElementById(e.currentTarget.id).classList.add('animate');

        console.log("%cDemonstration of StopPropagation", "color: #0000ff; font-size: 18px;");
        console.log("You clicked on %s, but current element is %s", e.target.id, e.currentTarget.id);
    }


    btn.addEventListener('click', () => {
        alert("You clicked me once, that's enough")
    }, {
        once: true // only allow one click event, then remove the event listener
    });
})();