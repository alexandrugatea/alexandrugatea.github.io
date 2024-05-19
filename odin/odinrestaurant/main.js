/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/odinrestaurant/scss/style.scss":
/*!********************************************!*\
  !*** ./src/odinrestaurant/scss/style.scss ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/odinrestaurant/js/contact.js":
/*!******************************************!*\
  !*** ./src/odinrestaurant/js/contact.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ contact; }
/* harmony export */ });
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ "./src/odinrestaurant/js/container.js");


function contact (sectionId) {
    const contactSection = document.createElement("div");
    contactSection.classList.add("tab");
    contactSection.id = sectionId;

    const container = (0,_container__WEBPACK_IMPORTED_MODULE_0__["default"])();

    const contactContent = document.createElement("div");
    contactContent.classList.add("contact-content");

    const title = document.createElement("h2");
    title.textContent = "Contact Us";

    const address = document.createElement("p");
    address.innerHTML = "<strong>Address:</strong> </br>123 Bifrost Lane, Asgard, Norse Realm";

    const phoneNumber = document.createElement("p");
    phoneNumber.innerHTML = "<strong>Phone:</strong> </br>+1 (800) 555-ODIN";

    const mapTitle = document.createElement("h3");
    mapTitle.textContent = "Map to Valhalla";

    const mapImage = document.createElement("img");
    mapImage.src = "images/map.webp";
    mapImage.alt = "Map to Valhalla";

    contactContent.appendChild(title);
    contactContent.appendChild(address);
    contactContent.appendChild(phoneNumber);
    contactContent.appendChild(mapTitle);
    contactContent.appendChild(mapImage);

    container.appendChild(contactContent);

    contactSection.appendChild(container);


    return contactSection;
}

/***/ }),

/***/ "./src/odinrestaurant/js/container.js":
/*!********************************************!*\
  !*** ./src/odinrestaurant/js/container.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
}

/* harmony default export */ __webpack_exports__["default"] = (createContainer);

/***/ }),

/***/ "./src/odinrestaurant/js/content.js":
/*!******************************************!*\
  !*** ./src/odinrestaurant/js/content.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPageContent: function() { return /* binding */ createPageContent; }
/* harmony export */ });
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options */ "./src/odinrestaurant/js/options.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home */ "./src/odinrestaurant/js/home.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu */ "./src/odinrestaurant/js/menu.js");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact */ "./src/odinrestaurant/js/contact.js");


// Import page sections





function createPageContent() {
    
    const header    = document.querySelector('.header');
    const content   = createContentElement();
    
    const homeSection = (0,_home__WEBPACK_IMPORTED_MODULE_1__["default"])(_options__WEBPACK_IMPORTED_MODULE_0__.menuOptions.home);
    const menuSection = (0,_menu__WEBPACK_IMPORTED_MODULE_2__["default"])(_options__WEBPACK_IMPORTED_MODULE_0__.menuOptions.menu);
    const contactSection = (0,_contact__WEBPACK_IMPORTED_MODULE_3__["default"])(_options__WEBPACK_IMPORTED_MODULE_0__.menuOptions.contact);
    
    content.appendChild(homeSection);
    content.appendChild(menuSection);
    content.appendChild(contactSection);
    
    header.after(content);
}

function createContentElement() {
    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.id = 'content';

    return contentElement;
}



/***/ }),

/***/ "./src/odinrestaurant/js/header.js":
/*!*****************************************!*\
  !*** ./src/odinrestaurant/js/header.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ "./src/odinrestaurant/js/container.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options */ "./src/odinrestaurant/js/options.js");
/* harmony import */ var _logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logo */ "./src/odinrestaurant/js/logo.js");





function createHeader() {
  
    const header = document.createElement('header');
    header.classList.add('header');
    header.id = 'header';

    const container = (0,_container__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const menu      = createMenuContainer();
    const nav       = createNav();
    const logo      = createLogoContainer();
    const logoLink  = (0,_logo__WEBPACK_IMPORTED_MODULE_2__["default"])();
    logo.appendChild(logoLink);
    
    for (const [item, link] of Object.entries(_options__WEBPACK_IMPORTED_MODULE_1__.menuOptions)) {
        createMenuItem(menu, item, link);
    }
    
    nav.appendChild(logo);
    nav.appendChild(menu);
    container.appendChild(nav);
    header.appendChild(container);
    document.body.prepend(header);

    return header;
}

function createNav() {
    const nav = document.createElement('div');
    nav.classList.add('nav');
    return nav;
}

function createMenuContainer() {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    return menu;
}

function createLogoContainer() {
    const logo = document.createElement('div');
    logo.classList.add('logo-container');
    return logo;
}

function createMenuItem(parent,item, link) {
    const menuLink = document.createElement('div');
    menuLink.classList.add('menu-link');
    menuLink.textContent = item;
    menuLink.setAttribute('target', link);
    parent.appendChild(menuLink);
}

/* harmony default export */ __webpack_exports__["default"] = (createHeader);

/***/ }),

/***/ "./src/odinrestaurant/js/home.js":
/*!***************************************!*\
  !*** ./src/odinrestaurant/js/home.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ home; }
/* harmony export */ });
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs */ "./src/odinrestaurant/js/tabs.js");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container */ "./src/odinrestaurant/js/container.js");



const homePageContent = {
    hero: {
        title: `Welcome to Odin's`,
        text: `Step into a realm where the legends of Norse mythology come alive. At Odin's, you are not just a guest, but a warrior embarking on a culinary journey through the Nine Realms. Indulge in the feast of the gods, savor the mead of Valhalla, and experience flavors as timeless as the tales of old.`,
        button: {
            title: 'Discover the Menu',
            link: 'menu'
        }

    }
}


function home (sectionId) {
    const homeSection = document.createElement("div");
    homeSection.classList.add("tab");
    homeSection.id = sectionId;

    const hero = createHero();

    homeSection.appendChild(hero);

    return homeSection;
}

function createHero() {
    const hero = document.createElement("div");
    hero.classList.add("hero");

    const container = (0,_container__WEBPACK_IMPORTED_MODULE_1__["default"])();

    const heroTitle = document.createElement("h1");
    heroTitle.textContent = homePageContent.hero.title;
    heroTitle.classList.add("hero-title");
    

    const heroText = document.createElement("p");
    heroText.textContent = homePageContent.hero.text;
    heroText.classList.add("hero-text");


    const heroButton = document.createElement("div");
    heroButton.textContent = homePageContent.hero.button.title;
    heroButton.setAttribute("target", homePageContent.hero.button.link);
    heroButton.classList.add("hero-button");

    heroButton.addEventListener("click", function() {
        (0,_tabs__WEBPACK_IMPORTED_MODULE_0__.toggleTabVisibility)(homePageContent.hero.button.link);
        (0,_tabs__WEBPACK_IMPORTED_MODULE_0__.toggleActiveStateOnMenuItem)(homePageContent.hero.button.link)
    })

    container.appendChild(heroTitle);
    container.appendChild(heroText);
    container.appendChild(heroButton);
    hero.appendChild(container);

    return hero;
}

/***/ }),

/***/ "./src/odinrestaurant/js/logo.js":
/*!***************************************!*\
  !*** ./src/odinrestaurant/js/logo.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createLogoElement; }
/* harmony export */ });
function createLogoElement() {
    const logo = document.createElement('a');
    logo.href = '/';
    logo.classList.add('logo');
    logo.textContent = `Odin's`;

    return logo;
}


/***/ }),

/***/ "./src/odinrestaurant/js/menu.js":
/*!***************************************!*\
  !*** ./src/odinrestaurant/js/menu.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ menu; }
/* harmony export */ });
/* harmony import */ var _menuData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menuData.js */ "./src/odinrestaurant/js/menuData.js");
/* harmony import */ var _container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container.js */ "./src/odinrestaurant/js/container.js");
// menu.js



function menu(sectionId) {
    const menuSection = document.createElement("div");
    menuSection.classList.add("tab");
    menuSection.id = sectionId;

    const container = (0,_container_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

    for (const [category, dishes] of Object.entries(_menuData_js__WEBPACK_IMPORTED_MODULE_0__.menuData)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('menu-category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('menu-category-title');
        categoryTitle.textContent = category; // No need to capitalize here, handle it in CSS
        categoryDiv.appendChild(categoryTitle);

        const dishesContainer = document.createElement('div');
        dishesContainer.classList.add('menu-category-dishes');


        dishes.forEach(dish => {
            const dishDiv = document.createElement('div');
            dishDiv.classList.add('dish');

            const dishImageContainer = document.createElement('div');
            dishImageContainer.classList.add('dish-image-container');

            const dishTextContainer = document.createElement('div');
            dishTextContainer.classList.add('dish-text-container');

            const dishTitle = document.createElement('h3');
            dishTitle.textContent = dish.title;
            dishTitle.classList.add('dish-title');
            
            const dishImage = document.createElement('img');
            dishImage.src = dish.image;
            dishImage.alt = dish.title;
            
            const ingredientsList = document.createElement('ul');
            ingredientsList.classList.add('dish-ingredients');
            
            dish.ingredients.forEach(ingredient => {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = ingredient;
                ingredientsList.appendChild(ingredientItem);
            });

            const purchase = document.createElement('button');
            purchase.textContent = 'Order';
            purchase.classList.add('dish-order');


            const priceAndWeight = document.createElement('div');
            priceAndWeight.classList.add('dish-price-and-weight');
            
            const weight = document.createElement('p');
            weight.textContent = `Weight: ${dish.weight}`;
            weight.classList.add('dish-weight');
            
            const price = document.createElement('p');
            price.textContent = `Price ${dish.price}`;
            price.classList.add('dish-price');
            
            
            dishImageContainer.appendChild(dishImage);
            dishImageContainer.appendChild(purchase);
            dishTextContainer.appendChild(dishTitle);
            dishTextContainer.appendChild(ingredientsList);
            priceAndWeight.appendChild(weight);
            priceAndWeight.appendChild(price);
            dishTextContainer.appendChild(priceAndWeight);


            dishDiv.appendChild(dishImageContainer);
            dishDiv.appendChild(dishTextContainer);
            
            
            dishesContainer.appendChild(dishDiv);
            
            
            categoryDiv.appendChild(dishesContainer);
        });

        container.appendChild(categoryDiv);
        menuSection.appendChild(container);
    }

    return menuSection;
}

/***/ }),

/***/ "./src/odinrestaurant/js/menuData.js":
/*!*******************************************!*\
  !*** ./src/odinrestaurant/js/menuData.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   menuData: function() { return /* binding */ menuData; }
/* harmony export */ });
const menuData = {
    "Starters": [
        {
            title: 'Viking Platter',
            ingredients: ['Smoked Salmon', 'Pickled Herring', 'Dill', 'Caper', 'Rye Bread'],
            weight: '300g',
            price: '$12',
            image: 'images/dish_starter_viking.webp'
        },
        {
            title: 'Asgardian Soup',
            ingredients: ['Root Vegetables', 'Lamb', 'Barley', 'Herbs', 'Broth'],
            weight: '250g',
            price: '$8',
            image: 'images/dish_starter_soup.webp'
        },
        {
            title: 'Odin’s Delight',
            ingredients: ['Cheese', 'Dried Fruits', 'Nuts', 'Honey', 'Herbs'],
            weight: '200g',
            price: '$10',
            image: 'images/dish_starter_delight.webp'
        }
    ],
    "Main Dishes": [
        {
            title: 'Thor’s Hammer Steak',
            ingredients: ['Beef', 'Garlic', 'Rosemary', 'Butter', 'Salt'],
            weight: '500g',
            price: '$25',
            image: 'images/dish_main_steak.webp'
        },
        {
            title: 'Freyja’s Feast',
            ingredients: ['Chicken', 'Thyme', 'Lemon', 'Honey', 'Pepper'],
            weight: '450g',
            price: '$20',
            image: 'images/dish_main_feast.webp'
        },
        {
            title: 'Loki’s Trick',
            ingredients: ['Pork', 'Apple', 'Sage', 'Mustard', 'Onion'],
            weight: '400g',
            price: '$22',
            image: 'images/dish_main_trick.webp'
        }
    ],
    "Desserts": [
        {
            title: 'Valhalla Cake',
            ingredients: ['Chocolate', 'Cream', 'Berries', 'Sugar', 'Flour'],
            weight: '150g',
            price: '$7',
            image: 'images/dish_dessert_cake.webp'
        },
        {
            title: 'Norse Pudding',
            ingredients: ['Milk', 'Eggs', 'Vanilla', 'Sugar', 'Nutmeg'],
            weight: '130g',
            price: '$6',
            image: 'images/dish_dessert_pudding.webp'
        },
        {
            title: 'Mjolnir Mousse',
            ingredients: ['Chocolate', 'Cream', 'Sugar', 'Mint', 'Butter'],
            weight: '140g',
            price: '$8',
            image: 'images/dish_dessert_mousse.webp'
        }
    ]
};


/***/ }),

/***/ "./src/odinrestaurant/js/options.js":
/*!******************************************!*\
  !*** ./src/odinrestaurant/js/options.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   menuOptions: function() { return /* binding */ menuOptions; }
/* harmony export */ });
const menuOptions = {
    home: 'home',
    menu:  'menu',
    contact: 'contact',
};

/***/ }),

/***/ "./src/odinrestaurant/js/tabs.js":
/*!***************************************!*\
  !*** ./src/odinrestaurant/js/tabs.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupTabSwitching: function() { return /* binding */ setupTabSwitching; },
/* harmony export */   toggleActiveStateOnMenuItem: function() { return /* binding */ toggleActiveStateOnMenuItem; },
/* harmony export */   toggleTabVisibility: function() { return /* binding */ toggleTabVisibility; }
/* harmony export */ });
function setupTabSwitching() {
  const menuItems = document.querySelectorAll('.menu-link');
  const tabs = document.querySelectorAll('.tab');

  menuItems[0].classList.add('active');
  tabs[0].classList.add('active');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('target');
      toggleActiveStateOnMenuItem(targetId);
      toggleTabVisibility(targetId);
    });
  });

}

function toggleActiveStateOnMenuItem(targetId) {
  const menuItems = document.querySelectorAll('.menu-link');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
  
  const current = document.querySelector("[target=" + targetId + "]");
  current.classList.toggle('active');
}

function toggleTabVisibility(targetId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  const current = document.getElementById(targetId)
  current.classList.toggle('active');
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*************************************!*\
  !*** ./src/odinrestaurant/index.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/header */ "./src/odinrestaurant/js/header.js");
/* harmony import */ var _js_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/content */ "./src/odinrestaurant/js/content.js");
/* harmony import */ var _js_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/tabs */ "./src/odinrestaurant/js/tabs.js");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/style.scss */ "./src/odinrestaurant/scss/style.scss");








(0,_js_header__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_js_content__WEBPACK_IMPORTED_MODULE_1__.createPageContent)();
(0,_js_tabs__WEBPACK_IMPORTED_MODULE_2__.setupTabSwitching)();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVGTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0RU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEU7Ozs7Ozs7VUNuQzVFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ051QztBQUNRO0FBQ0g7QUFDNUM7QUFDMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esc0RBQVk7QUFDWiw4REFBaUI7QUFDakIsMkRBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L3Njc3Mvc3R5bGUuc2Nzcz9hZDhhIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbnJlc3RhdXJhbnQvanMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9ob21lLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbnJlc3RhdXJhbnQvanMvbG9nby5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9tZW51RGF0YS5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy90YWJzLmpzIiwid2VicGFjazovL29kaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBjcmVhdGVDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWN0IChzZWN0aW9uSWQpIHtcclxuICAgIGNvbnN0IGNvbnRhY3RTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhY3RTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YWJcIik7XHJcbiAgICBjb250YWN0U2VjdGlvbi5pZCA9IHNlY3Rpb25JZDtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoKTtcclxuXHJcbiAgICBjb25zdCBjb250YWN0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWN0Q29udGVudC5jbGFzc0xpc3QuYWRkKFwiY29udGFjdC1jb250ZW50XCIpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkNvbnRhY3QgVXNcIjtcclxuXHJcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IFwiPHN0cm9uZz5BZGRyZXNzOjwvc3Ryb25nPiA8L2JyPjEyMyBCaWZyb3N0IExhbmUsIEFzZ2FyZCwgTm9yc2UgUmVhbG1cIjtcclxuXHJcbiAgICBjb25zdCBwaG9uZU51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgcGhvbmVOdW1iZXIuaW5uZXJIVE1MID0gXCI8c3Ryb25nPlBob25lOjwvc3Ryb25nPiA8L2JyPisxICg4MDApIDU1NS1PRElOXCI7XHJcblxyXG4gICAgY29uc3QgbWFwVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XHJcbiAgICBtYXBUaXRsZS50ZXh0Q29udGVudCA9IFwiTWFwIHRvIFZhbGhhbGxhXCI7XHJcblxyXG4gICAgY29uc3QgbWFwSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgbWFwSW1hZ2Uuc3JjID0gXCJpbWFnZXMvbWFwLndlYnBcIjtcclxuICAgIG1hcEltYWdlLmFsdCA9IFwiTWFwIHRvIFZhbGhhbGxhXCI7XHJcblxyXG4gICAgY29udGFjdENvbnRlbnQuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgY29udGFjdENvbnRlbnQuYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XHJcbiAgICBjb250YWN0Q29udGVudC5hcHBlbmRDaGlsZChwaG9uZU51bWJlcik7XHJcbiAgICBjb250YWN0Q29udGVudC5hcHBlbmRDaGlsZChtYXBUaXRsZSk7XHJcbiAgICBjb250YWN0Q29udGVudC5hcHBlbmRDaGlsZChtYXBJbWFnZSk7XHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhY3RDb250ZW50KTtcclxuXHJcbiAgICBjb250YWN0U2VjdGlvbi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cclxuXHJcbiAgICByZXR1cm4gY29udGFjdFNlY3Rpb247XHJcbn0iLCJmdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbnRhaW5lcjsiLCJpbXBvcnQge21lbnVPcHRpb25zfSBmcm9tICcuL29wdGlvbnMnXHJcblxyXG4vLyBJbXBvcnQgcGFnZSBzZWN0aW9uc1xyXG5pbXBvcnQgaG9tZSBmcm9tIFwiLi9ob21lXCI7XHJcbmltcG9ydCBtZW51IGZyb20gXCIuL21lbnVcIjtcclxuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhZ2VDb250ZW50KCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBoZWFkZXIgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBjb250ZW50ICAgPSBjcmVhdGVDb250ZW50RWxlbWVudCgpO1xyXG4gICAgXHJcbiAgICBjb25zdCBob21lU2VjdGlvbiA9IGhvbWUobWVudU9wdGlvbnMuaG9tZSk7XHJcbiAgICBjb25zdCBtZW51U2VjdGlvbiA9IG1lbnUobWVudU9wdGlvbnMubWVudSk7XHJcbiAgICBjb25zdCBjb250YWN0U2VjdGlvbiA9IGNvbnRhY3QobWVudU9wdGlvbnMuY29udGFjdCk7XHJcbiAgICBcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaG9tZVNlY3Rpb24pO1xyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChtZW51U2VjdGlvbik7XHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNvbnRhY3RTZWN0aW9uKTtcclxuICAgIFxyXG4gICAgaGVhZGVyLmFmdGVyKGNvbnRlbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb250ZW50RWxlbWVudCgpIHtcclxuICAgIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb250ZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50Jyk7XHJcbiAgICBjb250ZW50RWxlbWVudC5pZCA9ICdjb250ZW50JztcclxuXHJcbiAgICByZXR1cm4gY29udGVudEVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y3JlYXRlUGFnZUNvbnRlbnR9OyIsImltcG9ydCBjcmVhdGVDb250YWluZXIgZnJvbSAnLi9jb250YWluZXInO1xyXG5pbXBvcnQge21lbnVPcHRpb25zfSBmcm9tICcuL29wdGlvbnMnXHJcbmltcG9ydCBjcmVhdGVMb2dvRWxlbWVudCBmcm9tICcuL2xvZ28nO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcclxuICBcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xyXG4gICAgaGVhZGVyLmlkID0gJ2hlYWRlcic7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCk7XHJcbiAgICBjb25zdCBtZW51ICAgICAgPSBjcmVhdGVNZW51Q29udGFpbmVyKCk7XHJcbiAgICBjb25zdCBuYXYgICAgICAgPSBjcmVhdGVOYXYoKTtcclxuICAgIGNvbnN0IGxvZ28gICAgICA9IGNyZWF0ZUxvZ29Db250YWluZXIoKTtcclxuICAgIGNvbnN0IGxvZ29MaW5rICA9IGNyZWF0ZUxvZ29FbGVtZW50KCk7XHJcbiAgICBsb2dvLmFwcGVuZENoaWxkKGxvZ29MaW5rKTtcclxuICAgIFxyXG4gICAgZm9yIChjb25zdCBbaXRlbSwgbGlua10gb2YgT2JqZWN0LmVudHJpZXMobWVudU9wdGlvbnMpKSB7XHJcbiAgICAgICAgY3JlYXRlTWVudUl0ZW0obWVudSwgaXRlbSwgbGluayk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5hdi5hcHBlbmRDaGlsZChsb2dvKTtcclxuICAgIG5hdi5hcHBlbmRDaGlsZChtZW51KTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYXYpO1xyXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBkb2N1bWVudC5ib2R5LnByZXBlbmQoaGVhZGVyKTtcclxuXHJcbiAgICByZXR1cm4gaGVhZGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVOYXYoKSB7XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG5hdi5jbGFzc0xpc3QuYWRkKCduYXYnKTtcclxuICAgIHJldHVybiBuYXY7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1lbnVDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ21lbnUnKTtcclxuICAgIHJldHVybiBtZW51O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMb2dvQ29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbG9nby5jbGFzc0xpc3QuYWRkKCdsb2dvLWNvbnRhaW5lcicpO1xyXG4gICAgcmV0dXJuIGxvZ287XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1lbnVJdGVtKHBhcmVudCxpdGVtLCBsaW5rKSB7XHJcbiAgICBjb25zdCBtZW51TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbWVudUxpbmsuY2xhc3NMaXN0LmFkZCgnbWVudS1saW5rJyk7XHJcbiAgICBtZW51TGluay50ZXh0Q29udGVudCA9IGl0ZW07XHJcbiAgICBtZW51TGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIGxpbmspO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG1lbnVMaW5rKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGVhZGVyOyIsImltcG9ydCB7IHRvZ2dsZUFjdGl2ZVN0YXRlT25NZW51SXRlbSwgdG9nZ2xlVGFiVmlzaWJpbGl0eSB9IGZyb20gXCIuL3RhYnNcIjtcclxuaW1wb3J0IGNyZWF0ZUNvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIjtcclxuXHJcbmNvbnN0IGhvbWVQYWdlQ29udGVudCA9IHtcclxuICAgIGhlcm86IHtcclxuICAgICAgICB0aXRsZTogYFdlbGNvbWUgdG8gT2RpbidzYCxcclxuICAgICAgICB0ZXh0OiBgU3RlcCBpbnRvIGEgcmVhbG0gd2hlcmUgdGhlIGxlZ2VuZHMgb2YgTm9yc2UgbXl0aG9sb2d5IGNvbWUgYWxpdmUuIEF0IE9kaW4ncywgeW91IGFyZSBub3QganVzdCBhIGd1ZXN0LCBidXQgYSB3YXJyaW9yIGVtYmFya2luZyBvbiBhIGN1bGluYXJ5IGpvdXJuZXkgdGhyb3VnaCB0aGUgTmluZSBSZWFsbXMuIEluZHVsZ2UgaW4gdGhlIGZlYXN0IG9mIHRoZSBnb2RzLCBzYXZvciB0aGUgbWVhZCBvZiBWYWxoYWxsYSwgYW5kIGV4cGVyaWVuY2UgZmxhdm9ycyBhcyB0aW1lbGVzcyBhcyB0aGUgdGFsZXMgb2Ygb2xkLmAsXHJcbiAgICAgICAgYnV0dG9uOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGlzY292ZXIgdGhlIE1lbnUnLFxyXG4gICAgICAgICAgICBsaW5rOiAnbWVudSdcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaG9tZSAoc2VjdGlvbklkKSB7XHJcbiAgICBjb25zdCBob21lU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBob21lU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFiXCIpO1xyXG4gICAgaG9tZVNlY3Rpb24uaWQgPSBzZWN0aW9uSWQ7XHJcblxyXG4gICAgY29uc3QgaGVybyA9IGNyZWF0ZUhlcm8oKTtcclxuXHJcbiAgICBob21lU2VjdGlvbi5hcHBlbmRDaGlsZChoZXJvKTtcclxuXHJcbiAgICByZXR1cm4gaG9tZVNlY3Rpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhlcm8oKSB7XHJcbiAgICBjb25zdCBoZXJvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGhlcm8uY2xhc3NMaXN0LmFkZChcImhlcm9cIik7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgY29uc3QgaGVyb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xyXG4gICAgaGVyb1RpdGxlLnRleHRDb250ZW50ID0gaG9tZVBhZ2VDb250ZW50Lmhlcm8udGl0bGU7XHJcbiAgICBoZXJvVGl0bGUuY2xhc3NMaXN0LmFkZChcImhlcm8tdGl0bGVcIik7XHJcbiAgICBcclxuXHJcbiAgICBjb25zdCBoZXJvVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgaGVyb1RleHQudGV4dENvbnRlbnQgPSBob21lUGFnZUNvbnRlbnQuaGVyby50ZXh0O1xyXG4gICAgaGVyb1RleHQuY2xhc3NMaXN0LmFkZChcImhlcm8tdGV4dFwiKTtcclxuXHJcblxyXG4gICAgY29uc3QgaGVyb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBoZXJvQnV0dG9uLnRleHRDb250ZW50ID0gaG9tZVBhZ2VDb250ZW50Lmhlcm8uYnV0dG9uLnRpdGxlO1xyXG4gICAgaGVyb0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgaG9tZVBhZ2VDb250ZW50Lmhlcm8uYnV0dG9uLmxpbmspO1xyXG4gICAgaGVyb0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGVyby1idXR0b25cIik7XHJcblxyXG4gICAgaGVyb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdG9nZ2xlVGFiVmlzaWJpbGl0eShob21lUGFnZUNvbnRlbnQuaGVyby5idXR0b24ubGluayk7XHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtKGhvbWVQYWdlQ29udGVudC5oZXJvLmJ1dHRvbi5saW5rKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVyb1RpdGxlKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZXJvVGV4dCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVyb0J1dHRvbik7XHJcbiAgICBoZXJvLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG4gICAgcmV0dXJuIGhlcm87XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVMb2dvRWxlbWVudCgpIHtcclxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBsb2dvLmhyZWYgPSAnLyc7XHJcbiAgICBsb2dvLmNsYXNzTGlzdC5hZGQoJ2xvZ28nKTtcclxuICAgIGxvZ28udGV4dENvbnRlbnQgPSBgT2RpbidzYDtcclxuXHJcbiAgICByZXR1cm4gbG9nbztcclxufVxyXG4iLCIvLyBtZW51LmpzXHJcbmltcG9ydCB7IG1lbnVEYXRhIH0gZnJvbSAnLi9tZW51RGF0YS5qcyc7XHJcbmltcG9ydCBjcmVhdGVDb250YWluZXIgZnJvbSAnLi9jb250YWluZXIuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVudShzZWN0aW9uSWQpIHtcclxuICAgIGNvbnN0IG1lbnVTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG1lbnVTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YWJcIik7XHJcbiAgICBtZW51U2VjdGlvbi5pZCA9IHNlY3Rpb25JZDtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFtjYXRlZ29yeSwgZGlzaGVzXSBvZiBPYmplY3QuZW50cmllcyhtZW51RGF0YSkpIHtcclxuICAgICAgICBjb25zdCBjYXRlZ29yeURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNhdGVnb3J5RGl2LmNsYXNzTGlzdC5hZGQoJ21lbnUtY2F0ZWdvcnknKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgICAgY2F0ZWdvcnlUaXRsZS5jbGFzc0xpc3QuYWRkKCdtZW51LWNhdGVnb3J5LXRpdGxlJyk7XHJcbiAgICAgICAgY2F0ZWdvcnlUaXRsZS50ZXh0Q29udGVudCA9IGNhdGVnb3J5OyAvLyBObyBuZWVkIHRvIGNhcGl0YWxpemUgaGVyZSwgaGFuZGxlIGl0IGluIENTU1xyXG4gICAgICAgIGNhdGVnb3J5RGl2LmFwcGVuZENoaWxkKGNhdGVnb3J5VGl0bGUpO1xyXG5cclxuICAgICAgICBjb25zdCBkaXNoZXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkaXNoZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbWVudS1jYXRlZ29yeS1kaXNoZXMnKTtcclxuXHJcblxyXG4gICAgICAgIGRpc2hlcy5mb3JFYWNoKGRpc2ggPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkaXNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpc2hEaXYuY2xhc3NMaXN0LmFkZCgnZGlzaCcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGlzaEltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpc2hJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNoLWltYWdlLWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGlzaFRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGlzaFRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzaC10ZXh0LWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGlzaFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgICAgICAgICAgZGlzaFRpdGxlLnRleHRDb250ZW50ID0gZGlzaC50aXRsZTtcclxuICAgICAgICAgICAgZGlzaFRpdGxlLmNsYXNzTGlzdC5hZGQoJ2Rpc2gtdGl0bGUnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc2hJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICBkaXNoSW1hZ2Uuc3JjID0gZGlzaC5pbWFnZTtcclxuICAgICAgICAgICAgZGlzaEltYWdlLmFsdCA9IGRpc2gudGl0bGU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBpbmdyZWRpZW50c0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgICAgICAgICBpbmdyZWRpZW50c0xpc3QuY2xhc3NMaXN0LmFkZCgnZGlzaC1pbmdyZWRpZW50cycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGlzaC5pbmdyZWRpZW50cy5mb3JFYWNoKGluZ3JlZGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5ncmVkaWVudEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICAgICAgaW5ncmVkaWVudEl0ZW0udGV4dENvbnRlbnQgPSBpbmdyZWRpZW50O1xyXG4gICAgICAgICAgICAgICAgaW5ncmVkaWVudHNMaXN0LmFwcGVuZENoaWxkKGluZ3JlZGllbnRJdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwdXJjaGFzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBwdXJjaGFzZS50ZXh0Q29udGVudCA9ICdPcmRlcic7XHJcbiAgICAgICAgICAgIHB1cmNoYXNlLmNsYXNzTGlzdC5hZGQoJ2Rpc2gtb3JkZXInKTtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcmljZUFuZFdlaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBwcmljZUFuZFdlaWdodC5jbGFzc0xpc3QuYWRkKCdkaXNoLXByaWNlLWFuZC13ZWlnaHQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHdlaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgd2VpZ2h0LnRleHRDb250ZW50ID0gYFdlaWdodDogJHtkaXNoLndlaWdodH1gO1xyXG4gICAgICAgICAgICB3ZWlnaHQuY2xhc3NMaXN0LmFkZCgnZGlzaC13ZWlnaHQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHByaWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICBwcmljZS50ZXh0Q29udGVudCA9IGBQcmljZSAke2Rpc2gucHJpY2V9YDtcclxuICAgICAgICAgICAgcHJpY2UuY2xhc3NMaXN0LmFkZCgnZGlzaC1wcmljZScpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRpc2hJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNoSW1hZ2UpO1xyXG4gICAgICAgICAgICBkaXNoSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQocHVyY2hhc2UpO1xyXG4gICAgICAgICAgICBkaXNoVGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNoVGl0bGUpO1xyXG4gICAgICAgICAgICBkaXNoVGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZChpbmdyZWRpZW50c0xpc3QpO1xyXG4gICAgICAgICAgICBwcmljZUFuZFdlaWdodC5hcHBlbmRDaGlsZCh3ZWlnaHQpO1xyXG4gICAgICAgICAgICBwcmljZUFuZFdlaWdodC5hcHBlbmRDaGlsZChwcmljZSk7XHJcbiAgICAgICAgICAgIGRpc2hUZXh0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByaWNlQW5kV2VpZ2h0KTtcclxuXHJcblxyXG4gICAgICAgICAgICBkaXNoRGl2LmFwcGVuZENoaWxkKGRpc2hJbWFnZUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGRpc2hEaXYuYXBwZW5kQ2hpbGQoZGlzaFRleHRDb250YWluZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRpc2hlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNoRGl2KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXRlZ29yeURpdi5hcHBlbmRDaGlsZChkaXNoZXNDb250YWluZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2F0ZWdvcnlEaXYpO1xyXG4gICAgICAgIG1lbnVTZWN0aW9uLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lbnVTZWN0aW9uO1xyXG59IiwiZXhwb3J0IGNvbnN0IG1lbnVEYXRhID0ge1xyXG4gICAgXCJTdGFydGVyc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1Zpa2luZyBQbGF0dGVyJyxcclxuICAgICAgICAgICAgaW5ncmVkaWVudHM6IFsnU21va2VkIFNhbG1vbicsICdQaWNrbGVkIEhlcnJpbmcnLCAnRGlsbCcsICdDYXBlcicsICdSeWUgQnJlYWQnXSxcclxuICAgICAgICAgICAgd2VpZ2h0OiAnMzAwZycsXHJcbiAgICAgICAgICAgIHByaWNlOiAnJDEyJyxcclxuICAgICAgICAgICAgaW1hZ2U6ICdpbWFnZXMvZGlzaF9zdGFydGVyX3Zpa2luZy53ZWJwJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0FzZ2FyZGlhbiBTb3VwJyxcclxuICAgICAgICAgICAgaW5ncmVkaWVudHM6IFsnUm9vdCBWZWdldGFibGVzJywgJ0xhbWInLCAnQmFybGV5JywgJ0hlcmJzJywgJ0Jyb3RoJ10sXHJcbiAgICAgICAgICAgIHdlaWdodDogJzI1MGcnLFxyXG4gICAgICAgICAgICBwcmljZTogJyQ4JyxcclxuICAgICAgICAgICAgaW1hZ2U6ICdpbWFnZXMvZGlzaF9zdGFydGVyX3NvdXAud2VicCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdPZGlu4oCZcyBEZWxpZ2h0JyxcclxuICAgICAgICAgICAgaW5ncmVkaWVudHM6IFsnQ2hlZXNlJywgJ0RyaWVkIEZydWl0cycsICdOdXRzJywgJ0hvbmV5JywgJ0hlcmJzJ10sXHJcbiAgICAgICAgICAgIHdlaWdodDogJzIwMGcnLFxyXG4gICAgICAgICAgICBwcmljZTogJyQxMCcsXHJcbiAgICAgICAgICAgIGltYWdlOiAnaW1hZ2VzL2Rpc2hfc3RhcnRlcl9kZWxpZ2h0LndlYnAnXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIFwiTWFpbiBEaXNoZXNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdUaG9y4oCZcyBIYW1tZXIgU3RlYWsnLFxyXG4gICAgICAgICAgICBpbmdyZWRpZW50czogWydCZWVmJywgJ0dhcmxpYycsICdSb3NlbWFyeScsICdCdXR0ZXInLCAnU2FsdCddLFxyXG4gICAgICAgICAgICB3ZWlnaHQ6ICc1MDBnJyxcclxuICAgICAgICAgICAgcHJpY2U6ICckMjUnLFxyXG4gICAgICAgICAgICBpbWFnZTogJ2ltYWdlcy9kaXNoX21haW5fc3RlYWsud2VicCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdGcmV5amHigJlzIEZlYXN0JyxcclxuICAgICAgICAgICAgaW5ncmVkaWVudHM6IFsnQ2hpY2tlbicsICdUaHltZScsICdMZW1vbicsICdIb25leScsICdQZXBwZXInXSxcclxuICAgICAgICAgICAgd2VpZ2h0OiAnNDUwZycsXHJcbiAgICAgICAgICAgIHByaWNlOiAnJDIwJyxcclxuICAgICAgICAgICAgaW1hZ2U6ICdpbWFnZXMvZGlzaF9tYWluX2ZlYXN0LndlYnAnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnTG9raeKAmXMgVHJpY2snLFxyXG4gICAgICAgICAgICBpbmdyZWRpZW50czogWydQb3JrJywgJ0FwcGxlJywgJ1NhZ2UnLCAnTXVzdGFyZCcsICdPbmlvbiddLFxyXG4gICAgICAgICAgICB3ZWlnaHQ6ICc0MDBnJyxcclxuICAgICAgICAgICAgcHJpY2U6ICckMjInLFxyXG4gICAgICAgICAgICBpbWFnZTogJ2ltYWdlcy9kaXNoX21haW5fdHJpY2sud2VicCdcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgXCJEZXNzZXJ0c1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1ZhbGhhbGxhIENha2UnLFxyXG4gICAgICAgICAgICBpbmdyZWRpZW50czogWydDaG9jb2xhdGUnLCAnQ3JlYW0nLCAnQmVycmllcycsICdTdWdhcicsICdGbG91ciddLFxyXG4gICAgICAgICAgICB3ZWlnaHQ6ICcxNTBnJyxcclxuICAgICAgICAgICAgcHJpY2U6ICckNycsXHJcbiAgICAgICAgICAgIGltYWdlOiAnaW1hZ2VzL2Rpc2hfZGVzc2VydF9jYWtlLndlYnAnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnTm9yc2UgUHVkZGluZycsXHJcbiAgICAgICAgICAgIGluZ3JlZGllbnRzOiBbJ01pbGsnLCAnRWdncycsICdWYW5pbGxhJywgJ1N1Z2FyJywgJ051dG1lZyddLFxyXG4gICAgICAgICAgICB3ZWlnaHQ6ICcxMzBnJyxcclxuICAgICAgICAgICAgcHJpY2U6ICckNicsXHJcbiAgICAgICAgICAgIGltYWdlOiAnaW1hZ2VzL2Rpc2hfZGVzc2VydF9wdWRkaW5nLndlYnAnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnTWpvbG5pciBNb3Vzc2UnLFxyXG4gICAgICAgICAgICBpbmdyZWRpZW50czogWydDaG9jb2xhdGUnLCAnQ3JlYW0nLCAnU3VnYXInLCAnTWludCcsICdCdXR0ZXInXSxcclxuICAgICAgICAgICAgd2VpZ2h0OiAnMTQwZycsXHJcbiAgICAgICAgICAgIHByaWNlOiAnJDgnLFxyXG4gICAgICAgICAgICBpbWFnZTogJ2ltYWdlcy9kaXNoX2Rlc3NlcnRfbW91c3NlLndlYnAnXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59O1xyXG4iLCJleHBvcnQgY29uc3QgbWVudU9wdGlvbnMgPSB7XHJcbiAgICBob21lOiAnaG9tZScsXHJcbiAgICBtZW51OiAgJ21lbnUnLFxyXG4gICAgY29udGFjdDogJ2NvbnRhY3QnLFxyXG59OyIsImZ1bmN0aW9uIHNldHVwVGFiU3dpdGNoaW5nKCkge1xyXG4gIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmsnKTtcclxuICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpO1xyXG5cclxuICBtZW51SXRlbXNbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgdGFic1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXRJZCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCd0YXJnZXQnKTtcclxuICAgICAgdG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtKHRhcmdldElkKTtcclxuICAgICAgdG9nZ2xlVGFiVmlzaWJpbGl0eSh0YXJnZXRJZCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZVN0YXRlT25NZW51SXRlbSh0YXJnZXRJZCkge1xyXG4gIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWxpbmsnKTtcclxuICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgY29uc3QgY3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbdGFyZ2V0PVwiICsgdGFyZ2V0SWQgKyBcIl1cIik7XHJcbiAgY3VycmVudC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlVGFiVmlzaWJpbGl0eSh0YXJnZXRJZCkge1xyXG4gIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJyk7XHJcbiAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gIFxyXG4gIGNvbnN0IGN1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZClcclxuICBjdXJyZW50LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG5leHBvcnQge3NldHVwVGFiU3dpdGNoaW5nLCB0b2dnbGVBY3RpdmVTdGF0ZU9uTWVudUl0ZW0sIHRvZ2dsZVRhYlZpc2liaWxpdHl9XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVIZWFkZXIgZnJvbSAnLi9qcy9oZWFkZXInO1xyXG5pbXBvcnQge2NyZWF0ZVBhZ2VDb250ZW50fSBmcm9tIFwiLi9qcy9jb250ZW50XCI7XHJcbmltcG9ydCB7c2V0dXBUYWJTd2l0Y2hpbmd9IGZyb20gJy4vanMvdGFicyc7XHJcblxyXG5pbXBvcnQgJy4vc2Nzcy9zdHlsZS5zY3NzJztcclxuXHJcblxyXG5cclxuY3JlYXRlSGVhZGVyKCk7XHJcbmNyZWF0ZVBhZ2VDb250ZW50KCk7XHJcbnNldHVwVGFiU3dpdGNoaW5nKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9