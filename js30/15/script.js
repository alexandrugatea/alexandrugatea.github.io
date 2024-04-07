(function () {

    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const checkAllBtn = document.getElementById("checkAll");
    const uncheckAllBtn = document.getElementById("uncheckAll");
    const clearSorageBtn = document.getElementById("clearStorage");


    function addItem(e) {
        e.preventDefault();
        const text = (this.querySelector('[name=item]')).value;
        const item = {
            text,
            done: false
        };
        items.push(item);
        populateList(items, itemsList);
        localStorage.setItem('items', JSON.stringify(items));
        this.reset();
    };

    function populateList(plates = [], platesList) {
        platesList.innerHTML = plates.map((plate, i) => {
            return `       
        <li>
          <input type="checkbox" id="item${i}" data-index="${i}" ${plate.done ? 'checked' : ""} >
          <label for="item${i}">${plate.text}</label>
        </li>
      `
        }).join("");
    };

    function toggleDone(e) {
        if (!e.target.matches('input')) return; // skip unless it's an input
        const el = e.target;
        const index = el.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
    }

    function checkAll() {
        items.forEach(item => item.done = true);
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
    }

    function uncheckAll(e) {
        items.forEach(item => item.done = false);
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
    }

    function clearSorage() {
        localStorage.removeItem('items');
        while (items.length > 0) {
            items.pop();
        }
        itemsList.innerHTML = "";
    }

    addItems.addEventListener("submit", addItem);
    populateList(items, itemsList);

    itemsList.addEventListener("click", toggleDone);
    checkAllBtn.addEventListener("click", checkAll);
    uncheckAllBtn.addEventListener("click", uncheckAll);
    clearSorageBtn.addEventListener("click", clearSorage);

})();