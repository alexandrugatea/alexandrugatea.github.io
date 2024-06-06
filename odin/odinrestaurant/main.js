/*! For license information please see main.js.LICENSE.txt */
!(function () {
	"use strict";
	var e = {
			"./src/odinrestaurant/js/contact.js": function (e, t, n) {
				n.r(t),
					n.d(t, {
						default: function () {
							return a;
						},
					});
				var s = n("./src/odinrestaurant/js/container.js");
				function a(e) {
					const t = document.createElement("div");
					t.classList.add("tab"), (t.id = e);
					const n = (0, s.default)(),
						a = document.createElement("div");
					a.classList.add("contact-content");
					const i = document.createElement("h2");
					i.textContent = "Contact Us";
					const r = document.createElement("p");
					r.innerHTML = "<strong>Address:</strong> </br>123 Bifrost Lane, Asgard, Norse Realm";
					const o = document.createElement("p");
					o.innerHTML = "<strong>Phone:</strong> </br>+1 (800) 555-ODIN";
					const d = document.createElement("h3");
					d.textContent = "Map to Valhalla";
					const c = document.createElement("img");
					return (
						(c.src = "images/map.webp"),
						(c.alt = "Map to Valhalla"),
						a.appendChild(i),
						a.appendChild(r),
						a.appendChild(o),
						a.appendChild(d),
						a.appendChild(c),
						n.appendChild(a),
						t.appendChild(n),
						t
					);
				}
			},
			"./src/odinrestaurant/js/container.js": function (e, t, n) {
				n.r(t),
					(t.default = function () {
						const e = document.createElement("div");
						return e.classList.add("container"), e;
					});
			},
			"./src/odinrestaurant/js/content.js": function (e, t, n) {
				n.r(t),
					n.d(t, {
						createPageContent: function () {
							return o;
						},
					});
				var s = n("./src/odinrestaurant/js/options.js"),
					a = n("./src/odinrestaurant/js/home.js"),
					i = n("./src/odinrestaurant/js/menu.js"),
					r = n("./src/odinrestaurant/js/contact.js");
				function o() {
					const e = document.querySelector(".header"),
						t = (function () {
							const e = document.createElement("div");
							return e.classList.add("content"), (e.id = "content"), e;
						})(),
						n = (0, a.default)(s.menuOptions.home),
						o = (0, i.default)(s.menuOptions.menu),
						d = (0, r.default)(s.menuOptions.contact);
					t.appendChild(n), t.appendChild(o), t.appendChild(d), e.after(t);
				}
			},
			"./src/odinrestaurant/js/header.js": function (e, t, n) {
				n.r(t);
				var s = n("./src/odinrestaurant/js/container.js"),
					a = n("./src/odinrestaurant/js/options.js"),
					i = n("./src/odinrestaurant/js/logo.js");
				function r(e, t, n) {
					const s = document.createElement("div");
					s.classList.add("menu-link"), (s.textContent = t), s.setAttribute("target", n), e.appendChild(s);
				}
				t.default = function () {
					const e = document.createElement("header");
					e.classList.add("header"), (e.id = "header");
					const t = (0, s.default)(),
						n = (function () {
							const e = document.createElement("div");
							return e.classList.add("menu"), e;
						})(),
						o = (function () {
							const e = document.createElement("div");
							return e.classList.add("nav"), e;
						})(),
						d = (function () {
							const e = document.createElement("div");
							return e.classList.add("logo-container"), e;
						})(),
						c = (0, i.default)();
					d.appendChild(c);
					for (const [e, t] of Object.entries(a.menuOptions)) r(n, e, t);
					return (
						o.appendChild(d),
						o.appendChild(n),
						t.appendChild(o),
						e.appendChild(t),
						document.body.prepend(e),
						e
					);
				};
			},
			"./src/odinrestaurant/js/home.js": function (e, t, n) {
				n.r(t),
					n.d(t, {
						default: function () {
							return r;
						},
					});
				var s = n("./src/odinrestaurant/js/tabs.js"),
					a = n("./src/odinrestaurant/js/container.js");
				const i = {
					hero: {
						title: "Welcome to Odin's",
						text: "Step into a realm where the legends of Norse mythology come alive. At Odin's, you are not just a guest, but a warrior embarking on a culinary journey through the Nine Realms. Indulge in the feast of the gods, savor the mead of Valhalla, and experience flavors as timeless as the tales of old.",
						button: { title: "Discover the Menu", link: "menu" },
					},
				};
				function r(e) {
					const t = document.createElement("div");
					t.classList.add("tab"), (t.id = e);
					const n = (function () {
						const e = document.createElement("div");
						e.classList.add("hero");
						const t = (0, a.default)(),
							n = document.createElement("h1");
						(n.textContent = i.hero.title), n.classList.add("hero-title");
						const r = document.createElement("p");
						(r.textContent = i.hero.text), r.classList.add("hero-text");
						const o = document.createElement("div");
						return (
							(o.textContent = i.hero.button.title),
							o.setAttribute("target", i.hero.button.link),
							o.classList.add("hero-button"),
							o.addEventListener("click", function () {
								(0, s.toggleTabVisibility)(i.hero.button.link),
									(0, s.toggleActiveStateOnMenuItem)(i.hero.button.link);
							}),
							t.appendChild(n),
							t.appendChild(r),
							t.appendChild(o),
							e.appendChild(t),
							e
						);
					})();
					return t.appendChild(n), t;
				}
			},
			"./src/odinrestaurant/js/logo.js": function (e, t, n) {
				function s() {
					const e = document.createElement("a");
					return (e.href = "/"), e.classList.add("logo"), (e.textContent = "Odin's"), e;
				}
				n.r(t),
					n.d(t, {
						default: function () {
							return s;
						},
					});
			},
			"./src/odinrestaurant/js/menu.js": function (e, t, n) {
				n.r(t),
					n.d(t, {
						default: function () {
							return i;
						},
					});
				var s = n("./src/odinrestaurant/js/menuData.js"),
					a = n("./src/odinrestaurant/js/container.js");
				function i(e) {
					const t = document.createElement("div");
					t.classList.add("tab"), (t.id = e);
					const n = (0, a.default)();
					for (const [e, a] of Object.entries(s.menuData)) {
						const s = document.createElement("div");
						s.classList.add("menu-category");
						const i = document.createElement("h2");
						i.classList.add("menu-category-title"), (i.textContent = e), s.appendChild(i);
						const r = document.createElement("div");
						r.classList.add("menu-category-dishes"),
							a.forEach((e) => {
								const t = document.createElement("div");
								t.classList.add("dish");
								const n = document.createElement("div");
								n.classList.add("dish-image-container");
								const a = document.createElement("div");
								a.classList.add("dish-text-container");
								const i = document.createElement("h3");
								(i.textContent = e.title), i.classList.add("dish-title");
								const o = document.createElement("img");
								(o.src = e.image), (o.alt = e.title);
								const d = document.createElement("ul");
								d.classList.add("dish-ingredients"),
									e.ingredients.forEach((e) => {
										const t = document.createElement("li");
										(t.textContent = e), d.appendChild(t);
									});
								const c = document.createElement("button");
								(c.textContent = "Order"), c.classList.add("dish-order");
								const l = document.createElement("div");
								l.classList.add("dish-price-and-weight");
								const u = document.createElement("p");
								(u.textContent = `Weight: ${e.weight}`), u.classList.add("dish-weight");
								const m = document.createElement("p");
								(m.textContent = `Price ${e.price}`),
									m.classList.add("dish-price"),
									n.appendChild(o),
									n.appendChild(c),
									a.appendChild(i),
									a.appendChild(d),
									l.appendChild(u),
									l.appendChild(m),
									a.appendChild(l),
									t.appendChild(n),
									t.appendChild(a),
									r.appendChild(t),
									s.appendChild(r);
							}),
							n.appendChild(s),
							t.appendChild(n);
					}
					return t;
				}
			},
			"./src/odinrestaurant/js/menuData.js": function (e, t, n) {
				n.r(t),
					n.d(t, {
						menuData: function () {
							return s;
						},
					});
				const s = {
					Starters: [
						{
							title: "Viking Platter",
							ingredients: ["Smoked Salmon", "Pickled Herring", "Dill", "Caper", "Rye Bread"],
							weight: "300g",
							price: "$12",
							image: "images/dish_starter_viking.webp",
						},
						{
							title: "Asgardian Soup",
							ingredients: ["Root Vegetables", "Lamb", "Barley", "Herbs", "Broth"],
							weight: "250g",
							price: "$8",
							image: "images/dish_starter_soup.webp",
						},
						{
							title: "Odin’s Delight",
							ingredients: ["Cheese", "Dried Fruits", "Nuts", "Honey", "Herbs"],
							weight: "200g",
							price: "$10",
							image: "images/dish_starter_delight.webp",
						},
					],
					"Main Dishes": [
						{
							title: "Thor’s Hammer Steak",
							ingredients: ["Beef", "Garlic", "Rosemary", "Butter", "Salt"],
							weight: "500g",
							price: "$25",
							image: "images/dish_main_steak.webp",
						},
						{
							title: "Freyja’s Feast",
							ingredients: ["Chicken", "Thyme", "Lemon", "Honey", "Pepper"],
							weight: "450g",
							price: "$20",
							image: "images/dish_main_feast.webp",
						},
						{
							title: "Loki’s Trick",
							ingredients: ["Pork", "Apple", "Sage", "Mustard", "Onion"],
							weight: "400g",
							price: "$22",
							image: "images/dish_main_trick.webp",
						},
					],
					Desserts: [
						{
							title: "Valhalla Cake",
							ingredients: ["Chocolate", "Cream", "Berries", "Sugar", "Flour"],
							weight: "150g",
							price: "$7",
							image: "images/dish_dessert_cake.webp",
						},
						{
							title: "Norse Pudding",
							ingredients: ["Milk", "Eggs", "Vanilla", "Sugar", "Nutmeg"],
							weight: "130g",
							price: "$6",
							image: "images/dish_dessert_pudding.webp",
						},
						{
							title: "Mjolnir Mousse",
							ingredients: ["Chocolate", "Cream", "Sugar", "Mint", "Butter"],
							weight: "140g",
							price: "$8",
							image: "images/dish_dessert_mousse.webp",
						},
					],
				};
			},
			"./src/odinrestaurant/js/options.js": function (e, t, n) {
				n.r(t),
					n.d(t, {
						menuOptions: function () {
							return s;
						},
					});
				const s = { home: "home", menu: "menu", contact: "contact" };
			},
			"./src/odinrestaurant/js/tabs.js": function (e, t, n) {
				function s() {
					const e = document.querySelectorAll(".menu-link"),
						t = document.querySelectorAll(".tab");
					e[0].classList.add("active"),
						t[0].classList.add("active"),
						e.forEach((e) => {
							e.addEventListener("click", () => {
								const t = e.getAttribute("target");
								a(t), i(t);
							});
						});
				}
				function a(e) {
					document.querySelectorAll(".menu-link").forEach((e) => {
						e.classList.remove("active");
					});
					document.querySelector("[target=" + e + "]").classList.toggle("active");
				}
				function i(e) {
					document.querySelectorAll(".tab").forEach((e) => e.classList.remove("active"));
					document.getElementById(e).classList.toggle("active");
				}
				n.r(t),
					n.d(t, {
						setupTabSwitching: function () {
							return s;
						},
						toggleActiveStateOnMenuItem: function () {
							return a;
						},
						toggleTabVisibility: function () {
							return i;
						},
					});
			},
			"./src/odinrestaurant/scss/style.scss": function (e, t, n) {
				n.r(t);
			},
		},
		t = {};
	function n(s) {
		var a = t[s];
		if (void 0 !== a) return a.exports;
		var i = (t[s] = { exports: {} });
		return e[s](i, i.exports, n), i.exports;
	}
	(n.d = function (e, t) {
		for (var s in t) n.o(t, s) && !n.o(e, s) && Object.defineProperty(e, s, { enumerable: !0, get: t[s] });
	}),
		(n.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(n.r = function (e) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(e, "__esModule", { value: !0 });
		});
	var s = {};
	!(function () {
		n.r(s);
		var e = n("./src/odinrestaurant/js/header.js"),
			t = n("./src/odinrestaurant/js/content.js"),
			a = n("./src/odinrestaurant/js/tabs.js");
		n("./src/odinrestaurant/scss/style.scss");
		(0, e.default)(), (0, t.createPageContent)(), (0, a.setupTabSwitching)();
	})();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxPQUFPbEUsT0FBT21FLFVBQVVDLGVBQWVDLEtBQUtKLEVBQUtDLEVBQU8sRUNDdEdmLEVBQW9CbUIsRUFBSSxTQUFTZixHQUNYLG9CQUFYZ0IsUUFBMEJBLE9BQU9DLGFBQzFDeEUsT0FBTzhELGVBQWVQLEVBQVNnQixPQUFPQyxZQUFhLENBQUVDLE1BQU8sV0FFN0R6RSxPQUFPOEQsZUFBZVAsRUFBUyxhQUFjLENBQUVrQixPQUFPLEdBQ3ZELHVNQ0FBQyxFQUFBQSxFQUFBQSxZQUNBbkcsRUFBQUEsRUFBQUEsc0JBQ0FpRSxFQUFBQSxFQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4vLi9zcmMvb2RpbnJlc3RhdXJhbnQvanMvY29udGFjdC5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9ob21lLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbnJlc3RhdXJhbnQvanMvbG9nby5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9tZW51RGF0YS5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy90YWJzLmpzIiwid2VicGFjazovL29kaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVDb250YWluZXIgZnJvbSBcIi4vY29udGFpbmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWN0KHNlY3Rpb25JZCkge1xyXG5cdGNvbnN0IGNvbnRhY3RTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRjb250YWN0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFiXCIpO1xyXG5cdGNvbnRhY3RTZWN0aW9uLmlkID0gc2VjdGlvbklkO1xyXG5cclxuXHRjb25zdCBjb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoKTtcclxuXHJcblx0Y29uc3QgY29udGFjdENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGNvbnRhY3RDb250ZW50LmNsYXNzTGlzdC5hZGQoXCJjb250YWN0LWNvbnRlbnRcIik7XHJcblxyXG5cdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG5cdHRpdGxlLnRleHRDb250ZW50ID0gXCJDb250YWN0IFVzXCI7XHJcblxyXG5cdGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuXHRhZGRyZXNzLmlubmVySFRNTCA9IFwiPHN0cm9uZz5BZGRyZXNzOjwvc3Ryb25nPiA8L2JyPjEyMyBCaWZyb3N0IExhbmUsIEFzZ2FyZCwgTm9yc2UgUmVhbG1cIjtcclxuXHJcblx0Y29uc3QgcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuXHRwaG9uZU51bWJlci5pbm5lckhUTUwgPSBcIjxzdHJvbmc+UGhvbmU6PC9zdHJvbmc+IDwvYnI+KzEgKDgwMCkgNTU1LU9ESU5cIjtcclxuXHJcblx0Y29uc3QgbWFwVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XHJcblx0bWFwVGl0bGUudGV4dENvbnRlbnQgPSBcIk1hcCB0byBWYWxoYWxsYVwiO1xyXG5cclxuXHRjb25zdCBtYXBJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcblx0bWFwSW1hZ2Uuc3JjID0gXCJpbWFnZXMvbWFwLndlYnBcIjtcclxuXHRtYXBJbWFnZS5hbHQgPSBcIk1hcCB0byBWYWxoYWxsYVwiO1xyXG5cclxuXHRjb250YWN0Q29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcblx0Y29udGFjdENvbnRlbnQuYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XHJcblx0Y29udGFjdENvbnRlbnQuYXBwZW5kQ2hpbGQocGhvbmVOdW1iZXIpO1xyXG5cdGNvbnRhY3RDb250ZW50LmFwcGVuZENoaWxkKG1hcFRpdGxlKTtcclxuXHRjb250YWN0Q29udGVudC5hcHBlbmRDaGlsZChtYXBJbWFnZSk7XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWN0Q29udGVudCk7XHJcblxyXG5cdGNvbnRhY3RTZWN0aW9uLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblxyXG5cdHJldHVybiBjb250YWN0U2VjdGlvbjtcclxufVxyXG4iLCJmdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XHJcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lclwiKTtcclxuXHRyZXR1cm4gY29udGFpbmVyO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250YWluZXI7XHJcbiIsImltcG9ydCB7IG1lbnVPcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xyXG5cclxuLy8gSW1wb3J0IHBhZ2Ugc2VjdGlvbnNcclxuaW1wb3J0IGhvbWUgZnJvbSBcIi4vaG9tZVwiO1xyXG5pbXBvcnQgbWVudSBmcm9tIFwiLi9tZW51XCI7XHJcbmltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhZ2VDb250ZW50KCkge1xyXG5cdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpO1xyXG5cdGNvbnN0IGNvbnRlbnQgPSBjcmVhdGVDb250ZW50RWxlbWVudCgpO1xyXG5cclxuXHRjb25zdCBob21lU2VjdGlvbiA9IGhvbWUobWVudU9wdGlvbnMuaG9tZSk7XHJcblx0Y29uc3QgbWVudVNlY3Rpb24gPSBtZW51KG1lbnVPcHRpb25zLm1lbnUpO1xyXG5cdGNvbnN0IGNvbnRhY3RTZWN0aW9uID0gY29udGFjdChtZW51T3B0aW9ucy5jb250YWN0KTtcclxuXHJcblx0Y29udGVudC5hcHBlbmRDaGlsZChob21lU2VjdGlvbik7XHJcblx0Y29udGVudC5hcHBlbmRDaGlsZChtZW51U2VjdGlvbik7XHJcblx0Y29udGVudC5hcHBlbmRDaGlsZChjb250YWN0U2VjdGlvbik7XHJcblxyXG5cdGhlYWRlci5hZnRlcihjb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ29udGVudEVsZW1lbnQoKSB7XHJcblx0Y29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGNvbnRlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50XCIpO1xyXG5cdGNvbnRlbnRFbGVtZW50LmlkID0gXCJjb250ZW50XCI7XHJcblxyXG5cdHJldHVybiBjb250ZW50RWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlUGFnZUNvbnRlbnQgfTtcclxuIiwiaW1wb3J0IGNyZWF0ZUNvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIjtcclxuaW1wb3J0IHsgbWVudU9wdGlvbnMgfSBmcm9tIFwiLi9vcHRpb25zXCI7XHJcbmltcG9ydCBjcmVhdGVMb2dvRWxlbWVudCBmcm9tIFwiLi9sb2dvXCI7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKSB7XHJcblx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcclxuXHRoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcclxuXHRoZWFkZXIuaWQgPSBcImhlYWRlclwiO1xyXG5cclxuXHRjb25zdCBjb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoKTtcclxuXHRjb25zdCBtZW51ID0gY3JlYXRlTWVudUNvbnRhaW5lcigpO1xyXG5cdGNvbnN0IG5hdiA9IGNyZWF0ZU5hdigpO1xyXG5cdGNvbnN0IGxvZ28gPSBjcmVhdGVMb2dvQ29udGFpbmVyKCk7XHJcblx0Y29uc3QgbG9nb0xpbmsgPSBjcmVhdGVMb2dvRWxlbWVudCgpO1xyXG5cdGxvZ28uYXBwZW5kQ2hpbGQobG9nb0xpbmspO1xyXG5cclxuXHRmb3IgKGNvbnN0IFtpdGVtLCBsaW5rXSBvZiBPYmplY3QuZW50cmllcyhtZW51T3B0aW9ucykpIHtcclxuXHRcdGNyZWF0ZU1lbnVJdGVtKG1lbnUsIGl0ZW0sIGxpbmspO1xyXG5cdH1cclxuXHJcblx0bmF2LmFwcGVuZENoaWxkKGxvZ28pO1xyXG5cdG5hdi5hcHBlbmRDaGlsZChtZW51KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQobmF2KTtcclxuXHRoZWFkZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHRkb2N1bWVudC5ib2R5LnByZXBlbmQoaGVhZGVyKTtcclxuXHJcblx0cmV0dXJuIGhlYWRlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTmF2KCkge1xyXG5cdGNvbnN0IG5hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0bmF2LmNsYXNzTGlzdC5hZGQoXCJuYXZcIik7XHJcblx0cmV0dXJuIG5hdjtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTWVudUNvbnRhaW5lcigpIHtcclxuXHRjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRtZW51LmNsYXNzTGlzdC5hZGQoXCJtZW51XCIpO1xyXG5cdHJldHVybiBtZW51O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMb2dvQ29udGFpbmVyKCkge1xyXG5cdGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGxvZ28uY2xhc3NMaXN0LmFkZChcImxvZ28tY29udGFpbmVyXCIpO1xyXG5cdHJldHVybiBsb2dvO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNZW51SXRlbShwYXJlbnQsIGl0ZW0sIGxpbmspIHtcclxuXHRjb25zdCBtZW51TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0bWVudUxpbmsuY2xhc3NMaXN0LmFkZChcIm1lbnUtbGlua1wiKTtcclxuXHRtZW51TGluay50ZXh0Q29udGVudCA9IGl0ZW07XHJcblx0bWVudUxpbmsuc2V0QXR0cmlidXRlKFwidGFyZ2V0XCIsIGxpbmspO1xyXG5cdHBhcmVudC5hcHBlbmRDaGlsZChtZW51TGluayk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUhlYWRlcjtcclxuIiwiaW1wb3J0IHsgdG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtLCB0b2dnbGVUYWJWaXNpYmlsaXR5IH0gZnJvbSBcIi4vdGFic1wiO1xyXG5pbXBvcnQgY3JlYXRlQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiO1xyXG5cclxuY29uc3QgaG9tZVBhZ2VDb250ZW50ID0ge1xyXG5cdGhlcm86IHtcclxuXHRcdHRpdGxlOiBgV2VsY29tZSB0byBPZGluJ3NgLFxyXG5cdFx0dGV4dDogYFN0ZXAgaW50byBhIHJlYWxtIHdoZXJlIHRoZSBsZWdlbmRzIG9mIE5vcnNlIG15dGhvbG9neSBjb21lIGFsaXZlLiBBdCBPZGluJ3MsIHlvdSBhcmUgbm90IGp1c3QgYSBndWVzdCwgYnV0IGEgd2FycmlvciBlbWJhcmtpbmcgb24gYSBjdWxpbmFyeSBqb3VybmV5IHRocm91Z2ggdGhlIE5pbmUgUmVhbG1zLiBJbmR1bGdlIGluIHRoZSBmZWFzdCBvZiB0aGUgZ29kcywgc2F2b3IgdGhlIG1lYWQgb2YgVmFsaGFsbGEsIGFuZCBleHBlcmllbmNlIGZsYXZvcnMgYXMgdGltZWxlc3MgYXMgdGhlIHRhbGVzIG9mIG9sZC5gLFxyXG5cdFx0YnV0dG9uOiB7XHJcblx0XHRcdHRpdGxlOiBcIkRpc2NvdmVyIHRoZSBNZW51XCIsXHJcblx0XHRcdGxpbms6IFwibWVudVwiLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaG9tZShzZWN0aW9uSWQpIHtcclxuXHRjb25zdCBob21lU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0aG9tZVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhYlwiKTtcclxuXHRob21lU2VjdGlvbi5pZCA9IHNlY3Rpb25JZDtcclxuXHJcblx0Y29uc3QgaGVybyA9IGNyZWF0ZUhlcm8oKTtcclxuXHJcblx0aG9tZVNlY3Rpb24uYXBwZW5kQ2hpbGQoaGVybyk7XHJcblxyXG5cdHJldHVybiBob21lU2VjdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSGVybygpIHtcclxuXHRjb25zdCBoZXJvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRoZXJvLmNsYXNzTGlzdC5hZGQoXCJoZXJvXCIpO1xyXG5cclxuXHRjb25zdCBjb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoKTtcclxuXHJcblx0Y29uc3QgaGVyb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xyXG5cdGhlcm9UaXRsZS50ZXh0Q29udGVudCA9IGhvbWVQYWdlQ29udGVudC5oZXJvLnRpdGxlO1xyXG5cdGhlcm9UaXRsZS5jbGFzc0xpc3QuYWRkKFwiaGVyby10aXRsZVwiKTtcclxuXHJcblx0Y29uc3QgaGVyb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuXHRoZXJvVGV4dC50ZXh0Q29udGVudCA9IGhvbWVQYWdlQ29udGVudC5oZXJvLnRleHQ7XHJcblx0aGVyb1RleHQuY2xhc3NMaXN0LmFkZChcImhlcm8tdGV4dFwiKTtcclxuXHJcblx0Y29uc3QgaGVyb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0aGVyb0J1dHRvbi50ZXh0Q29udGVudCA9IGhvbWVQYWdlQ29udGVudC5oZXJvLmJ1dHRvbi50aXRsZTtcclxuXHRoZXJvQnV0dG9uLnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCBob21lUGFnZUNvbnRlbnQuaGVyby5idXR0b24ubGluayk7XHJcblx0aGVyb0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGVyby1idXR0b25cIik7XHJcblxyXG5cdGhlcm9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdHRvZ2dsZVRhYlZpc2liaWxpdHkoaG9tZVBhZ2VDb250ZW50Lmhlcm8uYnV0dG9uLmxpbmspO1xyXG5cdFx0dG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtKGhvbWVQYWdlQ29udGVudC5oZXJvLmJ1dHRvbi5saW5rKTtcclxuXHR9KTtcclxuXHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGhlcm9UaXRsZSk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGhlcm9UZXh0KTtcclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVyb0J1dHRvbik7XHJcblx0aGVyby5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cclxuXHRyZXR1cm4gaGVybztcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVMb2dvRWxlbWVudCgpIHtcclxuXHRjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcblx0bG9nby5ocmVmID0gXCIvXCI7XHJcblx0bG9nby5jbGFzc0xpc3QuYWRkKFwibG9nb1wiKTtcclxuXHRsb2dvLnRleHRDb250ZW50ID0gYE9kaW4nc2A7XHJcblxyXG5cdHJldHVybiBsb2dvO1xyXG59XHJcbiIsIi8vIG1lbnUuanNcclxuaW1wb3J0IHsgbWVudURhdGEgfSBmcm9tIFwiLi9tZW51RGF0YS5qc1wiO1xyXG5pbXBvcnQgY3JlYXRlQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVudShzZWN0aW9uSWQpIHtcclxuXHRjb25zdCBtZW51U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0bWVudVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhYlwiKTtcclxuXHRtZW51U2VjdGlvbi5pZCA9IHNlY3Rpb25JZDtcclxuXHJcblx0Y29uc3QgY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCk7XHJcblxyXG5cdGZvciAoY29uc3QgW2NhdGVnb3J5LCBkaXNoZXNdIG9mIE9iamVjdC5lbnRyaWVzKG1lbnVEYXRhKSkge1xyXG5cdFx0Y29uc3QgY2F0ZWdvcnlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0Y2F0ZWdvcnlEaXYuY2xhc3NMaXN0LmFkZChcIm1lbnUtY2F0ZWdvcnlcIik7XHJcblxyXG5cdFx0Y29uc3QgY2F0ZWdvcnlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRcdGNhdGVnb3J5VGl0bGUuY2xhc3NMaXN0LmFkZChcIm1lbnUtY2F0ZWdvcnktdGl0bGVcIik7XHJcblx0XHRjYXRlZ29yeVRpdGxlLnRleHRDb250ZW50ID0gY2F0ZWdvcnk7IC8vIE5vIG5lZWQgdG8gY2FwaXRhbGl6ZSBoZXJlLCBoYW5kbGUgaXQgaW4gQ1NTXHJcblx0XHRjYXRlZ29yeURpdi5hcHBlbmRDaGlsZChjYXRlZ29yeVRpdGxlKTtcclxuXHJcblx0XHRjb25zdCBkaXNoZXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0ZGlzaGVzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtZW51LWNhdGVnb3J5LWRpc2hlc1wiKTtcclxuXHJcblx0XHRkaXNoZXMuZm9yRWFjaCgoZGlzaCkgPT4ge1xyXG5cdFx0XHRjb25zdCBkaXNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0ZGlzaERpdi5jbGFzc0xpc3QuYWRkKFwiZGlzaFwiKTtcclxuXHJcblx0XHRcdGNvbnN0IGRpc2hJbWFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGRpc2hJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGlzaC1pbWFnZS1jb250YWluZXJcIik7XHJcblxyXG5cdFx0XHRjb25zdCBkaXNoVGV4dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGRpc2hUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkaXNoLXRleHQtY29udGFpbmVyXCIpO1xyXG5cclxuXHRcdFx0Y29uc3QgZGlzaFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xyXG5cdFx0XHRkaXNoVGl0bGUudGV4dENvbnRlbnQgPSBkaXNoLnRpdGxlO1xyXG5cdFx0XHRkaXNoVGl0bGUuY2xhc3NMaXN0LmFkZChcImRpc2gtdGl0bGVcIik7XHJcblxyXG5cdFx0XHRjb25zdCBkaXNoSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG5cdFx0XHRkaXNoSW1hZ2Uuc3JjID0gZGlzaC5pbWFnZTtcclxuXHRcdFx0ZGlzaEltYWdlLmFsdCA9IGRpc2gudGl0bGU7XHJcblxyXG5cdFx0XHRjb25zdCBpbmdyZWRpZW50c0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcblx0XHRcdGluZ3JlZGllbnRzTGlzdC5jbGFzc0xpc3QuYWRkKFwiZGlzaC1pbmdyZWRpZW50c1wiKTtcclxuXHJcblx0XHRcdGRpc2guaW5ncmVkaWVudHMuZm9yRWFjaCgoaW5ncmVkaWVudCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGluZ3JlZGllbnRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cdFx0XHRcdGluZ3JlZGllbnRJdGVtLnRleHRDb250ZW50ID0gaW5ncmVkaWVudDtcclxuXHRcdFx0XHRpbmdyZWRpZW50c0xpc3QuYXBwZW5kQ2hpbGQoaW5ncmVkaWVudEl0ZW0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGNvbnN0IHB1cmNoYXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRcdFx0cHVyY2hhc2UudGV4dENvbnRlbnQgPSBcIk9yZGVyXCI7XHJcblx0XHRcdHB1cmNoYXNlLmNsYXNzTGlzdC5hZGQoXCJkaXNoLW9yZGVyXCIpO1xyXG5cclxuXHRcdFx0Y29uc3QgcHJpY2VBbmRXZWlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRwcmljZUFuZFdlaWdodC5jbGFzc0xpc3QuYWRkKFwiZGlzaC1wcmljZS1hbmQtd2VpZ2h0XCIpO1xyXG5cclxuXHRcdFx0Y29uc3Qgd2VpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcblx0XHRcdHdlaWdodC50ZXh0Q29udGVudCA9IGBXZWlnaHQ6ICR7ZGlzaC53ZWlnaHR9YDtcclxuXHRcdFx0d2VpZ2h0LmNsYXNzTGlzdC5hZGQoXCJkaXNoLXdlaWdodFwiKTtcclxuXHJcblx0XHRcdGNvbnN0IHByaWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcblx0XHRcdHByaWNlLnRleHRDb250ZW50ID0gYFByaWNlICR7ZGlzaC5wcmljZX1gO1xyXG5cdFx0XHRwcmljZS5jbGFzc0xpc3QuYWRkKFwiZGlzaC1wcmljZVwiKTtcclxuXHJcblx0XHRcdGRpc2hJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNoSW1hZ2UpO1xyXG5cdFx0XHRkaXNoSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQocHVyY2hhc2UpO1xyXG5cdFx0XHRkaXNoVGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNoVGl0bGUpO1xyXG5cdFx0XHRkaXNoVGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZChpbmdyZWRpZW50c0xpc3QpO1xyXG5cdFx0XHRwcmljZUFuZFdlaWdodC5hcHBlbmRDaGlsZCh3ZWlnaHQpO1xyXG5cdFx0XHRwcmljZUFuZFdlaWdodC5hcHBlbmRDaGlsZChwcmljZSk7XHJcblx0XHRcdGRpc2hUZXh0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByaWNlQW5kV2VpZ2h0KTtcclxuXHJcblx0XHRcdGRpc2hEaXYuYXBwZW5kQ2hpbGQoZGlzaEltYWdlQ29udGFpbmVyKTtcclxuXHRcdFx0ZGlzaERpdi5hcHBlbmRDaGlsZChkaXNoVGV4dENvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRkaXNoZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGlzaERpdik7XHJcblxyXG5cdFx0XHRjYXRlZ29yeURpdi5hcHBlbmRDaGlsZChkaXNoZXNDb250YWluZXIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNhdGVnb3J5RGl2KTtcclxuXHRcdG1lbnVTZWN0aW9uLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWVudVNlY3Rpb247XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IG1lbnVEYXRhID0ge1xyXG5cdFN0YXJ0ZXJzOiBbXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIlZpa2luZyBQbGF0dGVyXCIsXHJcblx0XHRcdGluZ3JlZGllbnRzOiBbXCJTbW9rZWQgU2FsbW9uXCIsIFwiUGlja2xlZCBIZXJyaW5nXCIsIFwiRGlsbFwiLCBcIkNhcGVyXCIsIFwiUnllIEJyZWFkXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMzAwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkMTJcIixcclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2Rpc2hfc3RhcnRlcl92aWtpbmcud2VicFwiLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiQXNnYXJkaWFuIFNvdXBcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIlJvb3QgVmVnZXRhYmxlc1wiLCBcIkxhbWJcIiwgXCJCYXJsZXlcIiwgXCJIZXJic1wiLCBcIkJyb3RoXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMjUwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkOFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9zdGFydGVyX3NvdXAud2VicFwiLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiT2RpbuKAmXMgRGVsaWdodFwiLFxyXG5cdFx0XHRpbmdyZWRpZW50czogW1wiQ2hlZXNlXCIsIFwiRHJpZWQgRnJ1aXRzXCIsIFwiTnV0c1wiLCBcIkhvbmV5XCIsIFwiSGVyYnNcIl0sXHJcblx0XHRcdHdlaWdodDogXCIyMDBnXCIsXHJcblx0XHRcdHByaWNlOiBcIiQxMFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9zdGFydGVyX2RlbGlnaHQud2VicFwiLFxyXG5cdFx0fSxcclxuXHRdLFxyXG5cdFwiTWFpbiBEaXNoZXNcIjogW1xyXG5cdFx0e1xyXG5cdFx0XHR0aXRsZTogXCJUaG9y4oCZcyBIYW1tZXIgU3RlYWtcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIkJlZWZcIiwgXCJHYXJsaWNcIiwgXCJSb3NlbWFyeVwiLCBcIkJ1dHRlclwiLCBcIlNhbHRcIl0sXHJcblx0XHRcdHdlaWdodDogXCI1MDBnXCIsXHJcblx0XHRcdHByaWNlOiBcIiQyNVwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9tYWluX3N0ZWFrLndlYnBcIixcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIkZyZXlqYeKAmXMgRmVhc3RcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIkNoaWNrZW5cIiwgXCJUaHltZVwiLCBcIkxlbW9uXCIsIFwiSG9uZXlcIiwgXCJQZXBwZXJcIl0sXHJcblx0XHRcdHdlaWdodDogXCI0NTBnXCIsXHJcblx0XHRcdHByaWNlOiBcIiQyMFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9tYWluX2ZlYXN0LndlYnBcIixcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIkxva2nigJlzIFRyaWNrXCIsXHJcblx0XHRcdGluZ3JlZGllbnRzOiBbXCJQb3JrXCIsIFwiQXBwbGVcIiwgXCJTYWdlXCIsIFwiTXVzdGFyZFwiLCBcIk9uaW9uXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiNDAwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkMjJcIixcclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2Rpc2hfbWFpbl90cmljay53ZWJwXCIsXHJcblx0XHR9LFxyXG5cdF0sXHJcblx0RGVzc2VydHM6IFtcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiVmFsaGFsbGEgQ2FrZVwiLFxyXG5cdFx0XHRpbmdyZWRpZW50czogW1wiQ2hvY29sYXRlXCIsIFwiQ3JlYW1cIiwgXCJCZXJyaWVzXCIsIFwiU3VnYXJcIiwgXCJGbG91clwiXSxcclxuXHRcdFx0d2VpZ2h0OiBcIjE1MGdcIixcclxuXHRcdFx0cHJpY2U6IFwiJDdcIixcclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2Rpc2hfZGVzc2VydF9jYWtlLndlYnBcIixcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIk5vcnNlIFB1ZGRpbmdcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIk1pbGtcIiwgXCJFZ2dzXCIsIFwiVmFuaWxsYVwiLCBcIlN1Z2FyXCIsIFwiTnV0bWVnXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMTMwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkNlwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9kZXNzZXJ0X3B1ZGRpbmcud2VicFwiLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiTWpvbG5pciBNb3Vzc2VcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIkNob2NvbGF0ZVwiLCBcIkNyZWFtXCIsIFwiU3VnYXJcIiwgXCJNaW50XCIsIFwiQnV0dGVyXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMTQwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkOFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9kZXNzZXJ0X21vdXNzZS53ZWJwXCIsXHJcblx0XHR9LFxyXG5cdF0sXHJcbn07XHJcbiIsImV4cG9ydCBjb25zdCBtZW51T3B0aW9ucyA9IHtcclxuXHRob21lOiBcImhvbWVcIixcclxuXHRtZW51OiBcIm1lbnVcIixcclxuXHRjb250YWN0OiBcImNvbnRhY3RcIixcclxufTtcclxuIiwiZnVuY3Rpb24gc2V0dXBUYWJTd2l0Y2hpbmcoKSB7XHJcblx0Y29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tZW51LWxpbmtcIik7XHJcblx0Y29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFiXCIpO1xyXG5cclxuXHRtZW51SXRlbXNbMF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHR0YWJzWzBdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcblxyXG5cdG1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHRhcmdldElkID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIik7XHJcblx0XHRcdHRvZ2dsZUFjdGl2ZVN0YXRlT25NZW51SXRlbSh0YXJnZXRJZCk7XHJcblx0XHRcdHRvZ2dsZVRhYlZpc2liaWxpdHkodGFyZ2V0SWQpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZVN0YXRlT25NZW51SXRlbSh0YXJnZXRJZCkge1xyXG5cdGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWVudS1saW5rXCIpO1xyXG5cdG1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0fSk7XHJcblxyXG5cdGNvbnN0IGN1cnJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW3RhcmdldD1cIiArIHRhcmdldElkICsgXCJdXCIpO1xyXG5cdGN1cnJlbnQuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlVGFiVmlzaWJpbGl0eSh0YXJnZXRJZCkge1xyXG5cdGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYlwiKTtcclxuXHR0YWJzLmZvckVhY2goKHRhYikgPT4gdGFiLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG5cclxuXHRjb25zdCBjdXJyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xyXG5cdGN1cnJlbnQuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxufVxyXG5cclxuZXhwb3J0IHsgc2V0dXBUYWJTd2l0Y2hpbmcsIHRvZ2dsZUFjdGl2ZVN0YXRlT25NZW51SXRlbSwgdG9nZ2xlVGFiVmlzaWJpbGl0eSB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlSGVhZGVyIGZyb20gXCIuL2pzL2hlYWRlclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQYWdlQ29udGVudCB9IGZyb20gXCIuL2pzL2NvbnRlbnRcIjtcclxuaW1wb3J0IHsgc2V0dXBUYWJTd2l0Y2hpbmcgfSBmcm9tIFwiLi9qcy90YWJzXCI7XHJcblxyXG5pbXBvcnQgXCIuL3Njc3Mvc3R5bGUuc2Nzc1wiO1xyXG5cclxuY3JlYXRlSGVhZGVyKCk7XHJcbmNyZWF0ZVBhZ2VDb250ZW50KCk7XHJcbnNldHVwVGFiU3dpdGNoaW5nKCk7XHJcbiJdLCJuYW1lcyI6WyJjb250YWN0Iiwic2VjdGlvbklkIiwiY29udGFjdFNlY3Rpb24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsImNvbnRhaW5lciIsImNyZWF0ZUNvbnRhaW5lciIsImNvbnRhY3RDb250ZW50IiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsImFkZHJlc3MiLCJpbm5lckhUTUwiLCJwaG9uZU51bWJlciIsIm1hcFRpdGxlIiwibWFwSW1hZ2UiLCJzcmMiLCJhbHQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVBhZ2VDb250ZW50IiwiaGVhZGVyIiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjb250ZW50RWxlbWVudCIsImNyZWF0ZUNvbnRlbnRFbGVtZW50IiwiaG9tZVNlY3Rpb24iLCJob21lIiwibWVudU9wdGlvbnMiLCJtZW51U2VjdGlvbiIsIm1lbnUiLCJhZnRlciIsImNyZWF0ZU1lbnVJdGVtIiwicGFyZW50IiwiaXRlbSIsImxpbmsiLCJtZW51TGluayIsInNldEF0dHJpYnV0ZSIsImNyZWF0ZU1lbnVDb250YWluZXIiLCJuYXYiLCJjcmVhdGVOYXYiLCJsb2dvIiwiY3JlYXRlTG9nb0NvbnRhaW5lciIsImxvZ29MaW5rIiwiY3JlYXRlTG9nb0VsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwiYm9keSIsInByZXBlbmQiLCJob21lUGFnZUNvbnRlbnQiLCJoZXJvIiwidGV4dCIsImJ1dHRvbiIsImhlcm9UaXRsZSIsImhlcm9UZXh0IiwiaGVyb0J1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2dnbGVUYWJWaXNpYmlsaXR5IiwidG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtIiwiY3JlYXRlSGVybyIsImhyZWYiLCJjYXRlZ29yeSIsImRpc2hlcyIsIm1lbnVEYXRhIiwiY2F0ZWdvcnlEaXYiLCJjYXRlZ29yeVRpdGxlIiwiZGlzaGVzQ29udGFpbmVyIiwiZm9yRWFjaCIsImRpc2giLCJkaXNoRGl2IiwiZGlzaEltYWdlQ29udGFpbmVyIiwiZGlzaFRleHRDb250YWluZXIiLCJkaXNoVGl0bGUiLCJkaXNoSW1hZ2UiLCJpbWFnZSIsImluZ3JlZGllbnRzTGlzdCIsImluZ3JlZGllbnRzIiwiaW5ncmVkaWVudCIsImluZ3JlZGllbnRJdGVtIiwicHVyY2hhc2UiLCJwcmljZUFuZFdlaWdodCIsIndlaWdodCIsInByaWNlIiwiU3RhcnRlcnMiLCJEZXNzZXJ0cyIsInNldHVwVGFiU3dpdGNoaW5nIiwibWVudUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsInRhYnMiLCJ0YXJnZXRJZCIsImdldEF0dHJpYnV0ZSIsInJlbW92ZSIsInRvZ2dsZSIsInRhYiIsImdldEVsZW1lbnRCeUlkIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwidW5kZWZpbmVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJkIiwiZGVmaW5pdGlvbiIsImtleSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJvYmoiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJjcmVhdGVIZWFkZXIiXSwic291cmNlUm9vdCI6IiJ9
