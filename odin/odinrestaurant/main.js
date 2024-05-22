!function(){"use strict";var e=function(){const e=document.createElement("div");return e.classList.add("container"),e};const t={home:"home",menu:"menu",contact:"contact"};function n(e,t,n){const i=document.createElement("div");i.classList.add("menu-link"),i.textContent=t,i.setAttribute("target",n),e.appendChild(i)}function i(e){document.querySelectorAll(".menu-link").forEach((e=>{e.classList.remove("active")})),document.querySelector("[target="+e+"]").classList.toggle("active")}function a(e){document.querySelectorAll(".tab").forEach((e=>e.classList.remove("active"))),document.getElementById(e).classList.toggle("active")}const d={title:"Welcome to Odin's",text:"Step into a realm where the legends of Norse mythology come alive. At Odin's, you are not just a guest, but a warrior embarking on a culinary journey through the Nine Realms. Indulge in the feast of the gods, savor the mead of Valhalla, and experience flavors as timeless as the tales of old.",button:{title:"Discover the Menu",link:"menu"}};const s={Starters:[{title:"Viking Platter",ingredients:["Smoked Salmon","Pickled Herring","Dill","Caper","Rye Bread"],weight:"300g",price:"$12",image:"images/dish_starter_viking.webp"},{title:"Asgardian Soup",ingredients:["Root Vegetables","Lamb","Barley","Herbs","Broth"],weight:"250g",price:"$8",image:"images/dish_starter_soup.webp"},{title:"Odin’s Delight",ingredients:["Cheese","Dried Fruits","Nuts","Honey","Herbs"],weight:"200g",price:"$10",image:"images/dish_starter_delight.webp"}],"Main Dishes":[{title:"Thor’s Hammer Steak",ingredients:["Beef","Garlic","Rosemary","Butter","Salt"],weight:"500g",price:"$25",image:"images/dish_main_steak.webp"},{title:"Freyja’s Feast",ingredients:["Chicken","Thyme","Lemon","Honey","Pepper"],weight:"450g",price:"$20",image:"images/dish_main_feast.webp"},{title:"Loki’s Trick",ingredients:["Pork","Apple","Sage","Mustard","Onion"],weight:"400g",price:"$22",image:"images/dish_main_trick.webp"}],Desserts:[{title:"Valhalla Cake",ingredients:["Chocolate","Cream","Berries","Sugar","Flour"],weight:"150g",price:"$7",image:"images/dish_dessert_cake.webp"},{title:"Norse Pudding",ingredients:["Milk","Eggs","Vanilla","Sugar","Nutmeg"],weight:"130g",price:"$6",image:"images/dish_dessert_pudding.webp"},{title:"Mjolnir Mousse",ingredients:["Chocolate","Cream","Sugar","Mint","Butter"],weight:"140g",price:"$8",image:"images/dish_dessert_mousse.webp"}]};(function(){const i=document.createElement("header");i.classList.add("header"),i.id="header";const a=e(),d=function(){const e=document.createElement("div");return e.classList.add("menu"),e}(),s=function(){const e=document.createElement("div");return e.classList.add("nav"),e}(),c=function(){const e=document.createElement("div");return e.classList.add("logo-container"),e}(),o=function(){const e=document.createElement("a");return e.href="/",e.classList.add("logo"),e.textContent="Odin's",e}();c.appendChild(o);for(const[e,i]of Object.entries(t))n(d,e,i);s.appendChild(c),s.appendChild(d),a.appendChild(s),i.appendChild(a),document.body.prepend(i)})(),function(){const n=document.querySelector(".header"),c=function(){const e=document.createElement("div");return e.classList.add("content"),e.id="content",e}(),o=function(t){const n=document.createElement("div");n.classList.add("tab"),n.id=t;const s=function(){const t=document.createElement("div");t.classList.add("hero");const n=e(),s=document.createElement("h1");s.textContent=d.title,s.classList.add("hero-title");const c=document.createElement("p");c.textContent=d.text,c.classList.add("hero-text");const o=document.createElement("div");return o.textContent=d.button.title,o.setAttribute("target",d.button.link),o.classList.add("hero-button"),o.addEventListener("click",(function(){a(d.button.link),i(d.button.link)})),n.appendChild(s),n.appendChild(c),n.appendChild(o),t.appendChild(n),t}();return n.appendChild(s),n}(t.home),r=function(t){const n=document.createElement("div");n.classList.add("tab"),n.id=t;const i=e();for(const[e,t]of Object.entries(s)){const a=document.createElement("div");a.classList.add("menu-category");const d=document.createElement("h2");d.classList.add("menu-category-title"),d.textContent=e,a.appendChild(d);const s=document.createElement("div");s.classList.add("menu-category-dishes"),t.forEach((e=>{const t=document.createElement("div");t.classList.add("dish");const n=document.createElement("div");n.classList.add("dish-image-container");const i=document.createElement("div");i.classList.add("dish-text-container");const d=document.createElement("h3");d.textContent=e.title,d.classList.add("dish-title");const c=document.createElement("img");c.src=e.image,c.alt=e.title;const o=document.createElement("ul");o.classList.add("dish-ingredients"),e.ingredients.forEach((e=>{const t=document.createElement("li");t.textContent=e,o.appendChild(t)}));const r=document.createElement("button");r.textContent="Order",r.classList.add("dish-order");const l=document.createElement("div");l.classList.add("dish-price-and-weight");const m=document.createElement("p");m.textContent=`Weight: ${e.weight}`,m.classList.add("dish-weight");const u=document.createElement("p");u.textContent=`Price ${e.price}`,u.classList.add("dish-price"),n.appendChild(c),n.appendChild(r),i.appendChild(d),i.appendChild(o),l.appendChild(m),l.appendChild(u),i.appendChild(l),t.appendChild(n),t.appendChild(i),s.appendChild(t),a.appendChild(s)})),i.appendChild(a),n.appendChild(i)}return n}(t.menu),l=function(t){const n=document.createElement("div");n.classList.add("tab"),n.id=t;const i=e(),a=document.createElement("div");a.classList.add("contact-content");const d=document.createElement("h2");d.textContent="Contact Us";const s=document.createElement("p");s.innerHTML="<strong>Address:</strong> </br>123 Bifrost Lane, Asgard, Norse Realm";const c=document.createElement("p");c.innerHTML="<strong>Phone:</strong> </br>+1 (800) 555-ODIN";const o=document.createElement("h3");o.textContent="Map to Valhalla";const r=document.createElement("img");return r.src="images/map.webp",r.alt="Map to Valhalla",a.appendChild(d),a.appendChild(s),a.appendChild(c),a.appendChild(o),a.appendChild(r),i.appendChild(a),n.appendChild(i),n}(t.contact);c.appendChild(o),c.appendChild(r),c.appendChild(l),n.after(c)}(),function(){const e=document.querySelectorAll(".menu-link"),t=document.querySelectorAll(".tab");e[0].classList.add("active"),t[0].classList.add("active"),e.forEach((e=>{e.addEventListener("click",(()=>{const t=e.getAttribute("target");i(t),a(t)}))}))}()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXNDLEdKUEEsV0FDQyxNQUFNQyxFQUFZNUYsU0FBU2tCLGlCQUFpQixjQUN0QzJFLEVBQU83RixTQUFTa0IsaUJBQWlCLFFBRXZDMEUsRUFBVSxHQUFHMUYsVUFBVUMsSUFBSSxVQUMzQjBGLEVBQUssR0FBRzNGLFVBQVVDLElBQUksVUFFdEJ5RixFQUFVekUsU0FBU1QsSUFDbEJBLEVBQUtvRCxpQkFBaUIsU0FBUyxLQUM5QixNQUFNN0MsRUFBV1AsRUFBS29GLGFBQWEsVUFDbkM5RSxFQUE0QkMsR0FDNUJNLEVBQW9CTixFQUFTLEdBQzVCLEdBRUosQ0lOQThFLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy90YWJzLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbnJlc3RhdXJhbnQvanMvaG9tZS5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL21lbnVEYXRhLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbnJlc3RhdXJhbnQvanMvbG9nby5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2luZGV4LmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbnJlc3RhdXJhbnQvanMvY29udGVudC5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW5yZXN0YXVyYW50L2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlucmVzdGF1cmFudC9qcy9jb250YWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcclxuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpO1xyXG5cdHJldHVybiBjb250YWluZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbnRhaW5lcjtcclxuIiwiZXhwb3J0IGNvbnN0IG1lbnVPcHRpb25zID0ge1xyXG5cdGhvbWU6IFwiaG9tZVwiLFxyXG5cdG1lbnU6IFwibWVudVwiLFxyXG5cdGNvbnRhY3Q6IFwiY29udGFjdFwiLFxyXG59O1xyXG4iLCJpbXBvcnQgY3JlYXRlQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBtZW51T3B0aW9ucyB9IGZyb20gXCIuL29wdGlvbnNcIjtcclxuaW1wb3J0IGNyZWF0ZUxvZ29FbGVtZW50IGZyb20gXCIuL2xvZ29cIjtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcigpIHtcclxuXHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xyXG5cdGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xyXG5cdGhlYWRlci5pZCA9IFwiaGVhZGVyXCI7XHJcblxyXG5cdGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcigpO1xyXG5cdGNvbnN0IG1lbnUgPSBjcmVhdGVNZW51Q29udGFpbmVyKCk7XHJcblx0Y29uc3QgbmF2ID0gY3JlYXRlTmF2KCk7XHJcblx0Y29uc3QgbG9nbyA9IGNyZWF0ZUxvZ29Db250YWluZXIoKTtcclxuXHRjb25zdCBsb2dvTGluayA9IGNyZWF0ZUxvZ29FbGVtZW50KCk7XHJcblx0bG9nby5hcHBlbmRDaGlsZChsb2dvTGluayk7XHJcblxyXG5cdGZvciAoY29uc3QgW2l0ZW0sIGxpbmtdIG9mIE9iamVjdC5lbnRyaWVzKG1lbnVPcHRpb25zKSkge1xyXG5cdFx0Y3JlYXRlTWVudUl0ZW0obWVudSwgaXRlbSwgbGluayk7XHJcblx0fVxyXG5cclxuXHRuYXYuYXBwZW5kQ2hpbGQobG9nbyk7XHJcblx0bmF2LmFwcGVuZENoaWxkKG1lbnUpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYXYpO1xyXG5cdGhlYWRlci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG5cdGRvY3VtZW50LmJvZHkucHJlcGVuZChoZWFkZXIpO1xyXG5cclxuXHRyZXR1cm4gaGVhZGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVOYXYoKSB7XHJcblx0Y29uc3QgbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRuYXYuY2xhc3NMaXN0LmFkZChcIm5hdlwiKTtcclxuXHRyZXR1cm4gbmF2O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNZW51Q29udGFpbmVyKCkge1xyXG5cdGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdG1lbnUuY2xhc3NMaXN0LmFkZChcIm1lbnVcIik7XHJcblx0cmV0dXJuIG1lbnU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxvZ29Db250YWluZXIoKSB7XHJcblx0Y29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0bG9nby5jbGFzc0xpc3QuYWRkKFwibG9nby1jb250YWluZXJcIik7XHJcblx0cmV0dXJuIGxvZ287XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1lbnVJdGVtKHBhcmVudCwgaXRlbSwgbGluaykge1xyXG5cdGNvbnN0IG1lbnVMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRtZW51TGluay5jbGFzc0xpc3QuYWRkKFwibWVudS1saW5rXCIpO1xyXG5cdG1lbnVMaW5rLnRleHRDb250ZW50ID0gaXRlbTtcclxuXHRtZW51TGluay5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgbGluayk7XHJcblx0cGFyZW50LmFwcGVuZENoaWxkKG1lbnVMaW5rKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGVhZGVyO1xyXG4iLCJmdW5jdGlvbiBzZXR1cFRhYlN3aXRjaGluZygpIHtcclxuXHRjb25zdCBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1lbnUtbGlua1wiKTtcclxuXHRjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJcIik7XHJcblxyXG5cdG1lbnVJdGVtc1swXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdHRhYnNbMF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHJcblx0bWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0SWQgPSBpdGVtLmdldEF0dHJpYnV0ZShcInRhcmdldFwiKTtcclxuXHRcdFx0dG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtKHRhcmdldElkKTtcclxuXHRcdFx0dG9nZ2xlVGFiVmlzaWJpbGl0eSh0YXJnZXRJZCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtKHRhcmdldElkKSB7XHJcblx0Y29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tZW51LWxpbmtcIik7XHJcblx0bWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHR9KTtcclxuXHJcblx0Y29uc3QgY3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbdGFyZ2V0PVwiICsgdGFyZ2V0SWQgKyBcIl1cIik7XHJcblx0Y3VycmVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVUYWJWaXNpYmlsaXR5KHRhcmdldElkKSB7XHJcblx0Y29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFiXCIpO1xyXG5cdHRhYnMuZm9yRWFjaCgodGFiKSA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcblxyXG5cdGNvbnN0IGN1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XHJcblx0Y3VycmVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG59XHJcblxyXG5leHBvcnQgeyBzZXR1cFRhYlN3aXRjaGluZywgdG9nZ2xlQWN0aXZlU3RhdGVPbk1lbnVJdGVtLCB0b2dnbGVUYWJWaXNpYmlsaXR5IH07XHJcbiIsImltcG9ydCB7IHRvZ2dsZUFjdGl2ZVN0YXRlT25NZW51SXRlbSwgdG9nZ2xlVGFiVmlzaWJpbGl0eSB9IGZyb20gXCIuL3RhYnNcIjtcclxuaW1wb3J0IGNyZWF0ZUNvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIjtcclxuXHJcbmNvbnN0IGhvbWVQYWdlQ29udGVudCA9IHtcclxuXHRoZXJvOiB7XHJcblx0XHR0aXRsZTogYFdlbGNvbWUgdG8gT2RpbidzYCxcclxuXHRcdHRleHQ6IGBTdGVwIGludG8gYSByZWFsbSB3aGVyZSB0aGUgbGVnZW5kcyBvZiBOb3JzZSBteXRob2xvZ3kgY29tZSBhbGl2ZS4gQXQgT2RpbidzLCB5b3UgYXJlIG5vdCBqdXN0IGEgZ3Vlc3QsIGJ1dCBhIHdhcnJpb3IgZW1iYXJraW5nIG9uIGEgY3VsaW5hcnkgam91cm5leSB0aHJvdWdoIHRoZSBOaW5lIFJlYWxtcy4gSW5kdWxnZSBpbiB0aGUgZmVhc3Qgb2YgdGhlIGdvZHMsIHNhdm9yIHRoZSBtZWFkIG9mIFZhbGhhbGxhLCBhbmQgZXhwZXJpZW5jZSBmbGF2b3JzIGFzIHRpbWVsZXNzIGFzIHRoZSB0YWxlcyBvZiBvbGQuYCxcclxuXHRcdGJ1dHRvbjoge1xyXG5cdFx0XHR0aXRsZTogXCJEaXNjb3ZlciB0aGUgTWVudVwiLFxyXG5cdFx0XHRsaW5rOiBcIm1lbnVcIixcclxuXHRcdH0sXHJcblx0fSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhvbWUoc2VjdGlvbklkKSB7XHJcblx0Y29uc3QgaG9tZVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGhvbWVTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YWJcIik7XHJcblx0aG9tZVNlY3Rpb24uaWQgPSBzZWN0aW9uSWQ7XHJcblxyXG5cdGNvbnN0IGhlcm8gPSBjcmVhdGVIZXJvKCk7XHJcblxyXG5cdGhvbWVTZWN0aW9uLmFwcGVuZENoaWxkKGhlcm8pO1xyXG5cclxuXHRyZXR1cm4gaG9tZVNlY3Rpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhlcm8oKSB7XHJcblx0Y29uc3QgaGVybyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0aGVyby5jbGFzc0xpc3QuYWRkKFwiaGVyb1wiKTtcclxuXHJcblx0Y29uc3QgY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCk7XHJcblxyXG5cdGNvbnN0IGhlcm9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcclxuXHRoZXJvVGl0bGUudGV4dENvbnRlbnQgPSBob21lUGFnZUNvbnRlbnQuaGVyby50aXRsZTtcclxuXHRoZXJvVGl0bGUuY2xhc3NMaXN0LmFkZChcImhlcm8tdGl0bGVcIik7XHJcblxyXG5cdGNvbnN0IGhlcm9UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcblx0aGVyb1RleHQudGV4dENvbnRlbnQgPSBob21lUGFnZUNvbnRlbnQuaGVyby50ZXh0O1xyXG5cdGhlcm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJoZXJvLXRleHRcIik7XHJcblxyXG5cdGNvbnN0IGhlcm9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGhlcm9CdXR0b24udGV4dENvbnRlbnQgPSBob21lUGFnZUNvbnRlbnQuaGVyby5idXR0b24udGl0bGU7XHJcblx0aGVyb0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgaG9tZVBhZ2VDb250ZW50Lmhlcm8uYnV0dG9uLmxpbmspO1xyXG5cdGhlcm9CdXR0b24uY2xhc3NMaXN0LmFkZChcImhlcm8tYnV0dG9uXCIpO1xyXG5cclxuXHRoZXJvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHR0b2dnbGVUYWJWaXNpYmlsaXR5KGhvbWVQYWdlQ29udGVudC5oZXJvLmJ1dHRvbi5saW5rKTtcclxuXHRcdHRvZ2dsZUFjdGl2ZVN0YXRlT25NZW51SXRlbShob21lUGFnZUNvbnRlbnQuaGVyby5idXR0b24ubGluayk7XHJcblx0fSk7XHJcblxyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZXJvVGl0bGUpO1xyXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZXJvVGV4dCk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGhlcm9CdXR0b24pO1xyXG5cdGhlcm8uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcblx0cmV0dXJuIGhlcm87XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IG1lbnVEYXRhID0ge1xyXG5cdFN0YXJ0ZXJzOiBbXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIlZpa2luZyBQbGF0dGVyXCIsXHJcblx0XHRcdGluZ3JlZGllbnRzOiBbXCJTbW9rZWQgU2FsbW9uXCIsIFwiUGlja2xlZCBIZXJyaW5nXCIsIFwiRGlsbFwiLCBcIkNhcGVyXCIsIFwiUnllIEJyZWFkXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMzAwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkMTJcIixcclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2Rpc2hfc3RhcnRlcl92aWtpbmcud2VicFwiLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiQXNnYXJkaWFuIFNvdXBcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIlJvb3QgVmVnZXRhYmxlc1wiLCBcIkxhbWJcIiwgXCJCYXJsZXlcIiwgXCJIZXJic1wiLCBcIkJyb3RoXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMjUwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkOFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9zdGFydGVyX3NvdXAud2VicFwiLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiT2RpbuKAmXMgRGVsaWdodFwiLFxyXG5cdFx0XHRpbmdyZWRpZW50czogW1wiQ2hlZXNlXCIsIFwiRHJpZWQgRnJ1aXRzXCIsIFwiTnV0c1wiLCBcIkhvbmV5XCIsIFwiSGVyYnNcIl0sXHJcblx0XHRcdHdlaWdodDogXCIyMDBnXCIsXHJcblx0XHRcdHByaWNlOiBcIiQxMFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9zdGFydGVyX2RlbGlnaHQud2VicFwiLFxyXG5cdFx0fSxcclxuXHRdLFxyXG5cdFwiTWFpbiBEaXNoZXNcIjogW1xyXG5cdFx0e1xyXG5cdFx0XHR0aXRsZTogXCJUaG9y4oCZcyBIYW1tZXIgU3RlYWtcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIkJlZWZcIiwgXCJHYXJsaWNcIiwgXCJSb3NlbWFyeVwiLCBcIkJ1dHRlclwiLCBcIlNhbHRcIl0sXHJcblx0XHRcdHdlaWdodDogXCI1MDBnXCIsXHJcblx0XHRcdHByaWNlOiBcIiQyNVwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9tYWluX3N0ZWFrLndlYnBcIixcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIkZyZXlqYeKAmXMgRmVhc3RcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIkNoaWNrZW5cIiwgXCJUaHltZVwiLCBcIkxlbW9uXCIsIFwiSG9uZXlcIiwgXCJQZXBwZXJcIl0sXHJcblx0XHRcdHdlaWdodDogXCI0NTBnXCIsXHJcblx0XHRcdHByaWNlOiBcIiQyMFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9tYWluX2ZlYXN0LndlYnBcIixcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIkxva2nigJlzIFRyaWNrXCIsXHJcblx0XHRcdGluZ3JlZGllbnRzOiBbXCJQb3JrXCIsIFwiQXBwbGVcIiwgXCJTYWdlXCIsIFwiTXVzdGFyZFwiLCBcIk9uaW9uXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiNDAwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkMjJcIixcclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2Rpc2hfbWFpbl90cmljay53ZWJwXCIsXHJcblx0XHR9LFxyXG5cdF0sXHJcblx0RGVzc2VydHM6IFtcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiVmFsaGFsbGEgQ2FrZVwiLFxyXG5cdFx0XHRpbmdyZWRpZW50czogW1wiQ2hvY29sYXRlXCIsIFwiQ3JlYW1cIiwgXCJCZXJyaWVzXCIsIFwiU3VnYXJcIiwgXCJGbG91clwiXSxcclxuXHRcdFx0d2VpZ2h0OiBcIjE1MGdcIixcclxuXHRcdFx0cHJpY2U6IFwiJDdcIixcclxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2Rpc2hfZGVzc2VydF9jYWtlLndlYnBcIixcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOiBcIk5vcnNlIFB1ZGRpbmdcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIk1pbGtcIiwgXCJFZ2dzXCIsIFwiVmFuaWxsYVwiLCBcIlN1Z2FyXCIsIFwiTnV0bWVnXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMTMwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkNlwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9kZXNzZXJ0X3B1ZGRpbmcud2VicFwiLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IFwiTWpvbG5pciBNb3Vzc2VcIixcclxuXHRcdFx0aW5ncmVkaWVudHM6IFtcIkNob2NvbGF0ZVwiLCBcIkNyZWFtXCIsIFwiU3VnYXJcIiwgXCJNaW50XCIsIFwiQnV0dGVyXCJdLFxyXG5cdFx0XHR3ZWlnaHQ6IFwiMTQwZ1wiLFxyXG5cdFx0XHRwcmljZTogXCIkOFwiLFxyXG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvZGlzaF9kZXNzZXJ0X21vdXNzZS53ZWJwXCIsXHJcblx0XHR9LFxyXG5cdF0sXHJcbn07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUxvZ29FbGVtZW50KCkge1xyXG5cdGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRsb2dvLmhyZWYgPSBcIi9cIjtcclxuXHRsb2dvLmNsYXNzTGlzdC5hZGQoXCJsb2dvXCIpO1xyXG5cdGxvZ28udGV4dENvbnRlbnQgPSBgT2RpbidzYDtcclxuXHJcblx0cmV0dXJuIGxvZ287XHJcbn1cclxuIiwiaW1wb3J0IGNyZWF0ZUhlYWRlciBmcm9tIFwiLi9qcy9oZWFkZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlUGFnZUNvbnRlbnQgfSBmcm9tIFwiLi9qcy9jb250ZW50XCI7XHJcbmltcG9ydCB7IHNldHVwVGFiU3dpdGNoaW5nIH0gZnJvbSBcIi4vanMvdGFic1wiO1xyXG5cclxuaW1wb3J0IFwiLi9zY3NzL3N0eWxlLnNjc3NcIjtcclxuXHJcbmNyZWF0ZUhlYWRlcigpO1xyXG5jcmVhdGVQYWdlQ29udGVudCgpO1xyXG5zZXR1cFRhYlN3aXRjaGluZygpO1xyXG4iLCJpbXBvcnQgeyBtZW51T3B0aW9ucyB9IGZyb20gXCIuL29wdGlvbnNcIjtcclxuXHJcbi8vIEltcG9ydCBwYWdlIHNlY3Rpb25zXHJcbmltcG9ydCBob21lIGZyb20gXCIuL2hvbWVcIjtcclxuaW1wb3J0IG1lbnUgZnJvbSBcIi4vbWVudVwiO1xyXG5pbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0XCI7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYWdlQ29udGVudCgpIHtcclxuXHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlclwiKTtcclxuXHRjb25zdCBjb250ZW50ID0gY3JlYXRlQ29udGVudEVsZW1lbnQoKTtcclxuXHJcblx0Y29uc3QgaG9tZVNlY3Rpb24gPSBob21lKG1lbnVPcHRpb25zLmhvbWUpO1xyXG5cdGNvbnN0IG1lbnVTZWN0aW9uID0gbWVudShtZW51T3B0aW9ucy5tZW51KTtcclxuXHRjb25zdCBjb250YWN0U2VjdGlvbiA9IGNvbnRhY3QobWVudU9wdGlvbnMuY29udGFjdCk7XHJcblxyXG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQoaG9tZVNlY3Rpb24pO1xyXG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQobWVudVNlY3Rpb24pO1xyXG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGFjdFNlY3Rpb24pO1xyXG5cclxuXHRoZWFkZXIuYWZ0ZXIoY29udGVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCkge1xyXG5cdGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRjb250ZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29udGVudFwiKTtcclxuXHRjb250ZW50RWxlbWVudC5pZCA9IFwiY29udGVudFwiO1xyXG5cclxuXHRyZXR1cm4gY29udGVudEVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZVBhZ2VDb250ZW50IH07XHJcbiIsIi8vIG1lbnUuanNcclxuaW1wb3J0IHsgbWVudURhdGEgfSBmcm9tIFwiLi9tZW51RGF0YS5qc1wiO1xyXG5pbXBvcnQgY3JlYXRlQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVudShzZWN0aW9uSWQpIHtcclxuXHRjb25zdCBtZW51U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0bWVudVNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhYlwiKTtcclxuXHRtZW51U2VjdGlvbi5pZCA9IHNlY3Rpb25JZDtcclxuXHJcblx0Y29uc3QgY29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCk7XHJcblxyXG5cdGZvciAoY29uc3QgW2NhdGVnb3J5LCBkaXNoZXNdIG9mIE9iamVjdC5lbnRyaWVzKG1lbnVEYXRhKSkge1xyXG5cdFx0Y29uc3QgY2F0ZWdvcnlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0Y2F0ZWdvcnlEaXYuY2xhc3NMaXN0LmFkZChcIm1lbnUtY2F0ZWdvcnlcIik7XHJcblxyXG5cdFx0Y29uc3QgY2F0ZWdvcnlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuXHRcdGNhdGVnb3J5VGl0bGUuY2xhc3NMaXN0LmFkZChcIm1lbnUtY2F0ZWdvcnktdGl0bGVcIik7XHJcblx0XHRjYXRlZ29yeVRpdGxlLnRleHRDb250ZW50ID0gY2F0ZWdvcnk7IC8vIE5vIG5lZWQgdG8gY2FwaXRhbGl6ZSBoZXJlLCBoYW5kbGUgaXQgaW4gQ1NTXHJcblx0XHRjYXRlZ29yeURpdi5hcHBlbmRDaGlsZChjYXRlZ29yeVRpdGxlKTtcclxuXHJcblx0XHRjb25zdCBkaXNoZXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0ZGlzaGVzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtZW51LWNhdGVnb3J5LWRpc2hlc1wiKTtcclxuXHJcblx0XHRkaXNoZXMuZm9yRWFjaCgoZGlzaCkgPT4ge1xyXG5cdFx0XHRjb25zdCBkaXNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0ZGlzaERpdi5jbGFzc0xpc3QuYWRkKFwiZGlzaFwiKTtcclxuXHJcblx0XHRcdGNvbnN0IGRpc2hJbWFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGRpc2hJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZGlzaC1pbWFnZS1jb250YWluZXJcIik7XHJcblxyXG5cdFx0XHRjb25zdCBkaXNoVGV4dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGRpc2hUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkaXNoLXRleHQtY29udGFpbmVyXCIpO1xyXG5cclxuXHRcdFx0Y29uc3QgZGlzaFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xyXG5cdFx0XHRkaXNoVGl0bGUudGV4dENvbnRlbnQgPSBkaXNoLnRpdGxlO1xyXG5cdFx0XHRkaXNoVGl0bGUuY2xhc3NMaXN0LmFkZChcImRpc2gtdGl0bGVcIik7XHJcblxyXG5cdFx0XHRjb25zdCBkaXNoSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG5cdFx0XHRkaXNoSW1hZ2Uuc3JjID0gZGlzaC5pbWFnZTtcclxuXHRcdFx0ZGlzaEltYWdlLmFsdCA9IGRpc2gudGl0bGU7XHJcblxyXG5cdFx0XHRjb25zdCBpbmdyZWRpZW50c0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcblx0XHRcdGluZ3JlZGllbnRzTGlzdC5jbGFzc0xpc3QuYWRkKFwiZGlzaC1pbmdyZWRpZW50c1wiKTtcclxuXHJcblx0XHRcdGRpc2guaW5ncmVkaWVudHMuZm9yRWFjaCgoaW5ncmVkaWVudCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGluZ3JlZGllbnRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG5cdFx0XHRcdGluZ3JlZGllbnRJdGVtLnRleHRDb250ZW50ID0gaW5ncmVkaWVudDtcclxuXHRcdFx0XHRpbmdyZWRpZW50c0xpc3QuYXBwZW5kQ2hpbGQoaW5ncmVkaWVudEl0ZW0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGNvbnN0IHB1cmNoYXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRcdFx0cHVyY2hhc2UudGV4dENvbnRlbnQgPSBcIk9yZGVyXCI7XHJcblx0XHRcdHB1cmNoYXNlLmNsYXNzTGlzdC5hZGQoXCJkaXNoLW9yZGVyXCIpO1xyXG5cclxuXHRcdFx0Y29uc3QgcHJpY2VBbmRXZWlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRwcmljZUFuZFdlaWdodC5jbGFzc0xpc3QuYWRkKFwiZGlzaC1wcmljZS1hbmQtd2VpZ2h0XCIpO1xyXG5cclxuXHRcdFx0Y29uc3Qgd2VpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcblx0XHRcdHdlaWdodC50ZXh0Q29udGVudCA9IGBXZWlnaHQ6ICR7ZGlzaC53ZWlnaHR9YDtcclxuXHRcdFx0d2VpZ2h0LmNsYXNzTGlzdC5hZGQoXCJkaXNoLXdlaWdodFwiKTtcclxuXHJcblx0XHRcdGNvbnN0IHByaWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcblx0XHRcdHByaWNlLnRleHRDb250ZW50ID0gYFByaWNlICR7ZGlzaC5wcmljZX1gO1xyXG5cdFx0XHRwcmljZS5jbGFzc0xpc3QuYWRkKFwiZGlzaC1wcmljZVwiKTtcclxuXHJcblx0XHRcdGRpc2hJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNoSW1hZ2UpO1xyXG5cdFx0XHRkaXNoSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQocHVyY2hhc2UpO1xyXG5cdFx0XHRkaXNoVGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNoVGl0bGUpO1xyXG5cdFx0XHRkaXNoVGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZChpbmdyZWRpZW50c0xpc3QpO1xyXG5cdFx0XHRwcmljZUFuZFdlaWdodC5hcHBlbmRDaGlsZCh3ZWlnaHQpO1xyXG5cdFx0XHRwcmljZUFuZFdlaWdodC5hcHBlbmRDaGlsZChwcmljZSk7XHJcblx0XHRcdGRpc2hUZXh0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByaWNlQW5kV2VpZ2h0KTtcclxuXHJcblx0XHRcdGRpc2hEaXYuYXBwZW5kQ2hpbGQoZGlzaEltYWdlQ29udGFpbmVyKTtcclxuXHRcdFx0ZGlzaERpdi5hcHBlbmRDaGlsZChkaXNoVGV4dENvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRkaXNoZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGlzaERpdik7XHJcblxyXG5cdFx0XHRjYXRlZ29yeURpdi5hcHBlbmRDaGlsZChkaXNoZXNDb250YWluZXIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNhdGVnb3J5RGl2KTtcclxuXHRcdG1lbnVTZWN0aW9uLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWVudVNlY3Rpb247XHJcbn1cclxuIiwiaW1wb3J0IGNyZWF0ZUNvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhY3Qoc2VjdGlvbklkKSB7XHJcblx0Y29uc3QgY29udGFjdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdGNvbnRhY3RTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YWJcIik7XHJcblx0Y29udGFjdFNlY3Rpb24uaWQgPSBzZWN0aW9uSWQ7XHJcblxyXG5cdGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcigpO1xyXG5cclxuXHRjb25zdCBjb250YWN0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0Y29udGFjdENvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRhY3QtY29udGVudFwiKTtcclxuXHJcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcblx0dGl0bGUudGV4dENvbnRlbnQgPSBcIkNvbnRhY3QgVXNcIjtcclxuXHJcblx0Y29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG5cdGFkZHJlc3MuaW5uZXJIVE1MID0gXCI8c3Ryb25nPkFkZHJlc3M6PC9zdHJvbmc+IDwvYnI+MTIzIEJpZnJvc3QgTGFuZSwgQXNnYXJkLCBOb3JzZSBSZWFsbVwiO1xyXG5cclxuXHRjb25zdCBwaG9uZU51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG5cdHBob25lTnVtYmVyLmlubmVySFRNTCA9IFwiPHN0cm9uZz5QaG9uZTo8L3N0cm9uZz4gPC9icj4rMSAoODAwKSA1NTUtT0RJTlwiO1xyXG5cclxuXHRjb25zdCBtYXBUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcclxuXHRtYXBUaXRsZS50ZXh0Q29udGVudCA9IFwiTWFwIHRvIFZhbGhhbGxhXCI7XHJcblxyXG5cdGNvbnN0IG1hcEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuXHRtYXBJbWFnZS5zcmMgPSBcImltYWdlcy9tYXAud2VicFwiO1xyXG5cdG1hcEltYWdlLmFsdCA9IFwiTWFwIHRvIFZhbGhhbGxhXCI7XHJcblxyXG5cdGNvbnRhY3RDb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHRjb250YWN0Q29udGVudC5hcHBlbmRDaGlsZChhZGRyZXNzKTtcclxuXHRjb250YWN0Q29udGVudC5hcHBlbmRDaGlsZChwaG9uZU51bWJlcik7XHJcblx0Y29udGFjdENvbnRlbnQuYXBwZW5kQ2hpbGQobWFwVGl0bGUpO1xyXG5cdGNvbnRhY3RDb250ZW50LmFwcGVuZENoaWxkKG1hcEltYWdlKTtcclxuXHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhY3RDb250ZW50KTtcclxuXHJcblx0Y29udGFjdFNlY3Rpb24uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcblx0cmV0dXJuIGNvbnRhY3RTZWN0aW9uO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJtZW51T3B0aW9ucyIsImhvbWUiLCJtZW51IiwiY29udGFjdCIsImNyZWF0ZU1lbnVJdGVtIiwicGFyZW50IiwiaXRlbSIsImxpbmsiLCJtZW51TGluayIsInRleHRDb250ZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJ0b2dnbGVBY3RpdmVTdGF0ZU9uTWVudUl0ZW0iLCJ0YXJnZXRJZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicmVtb3ZlIiwicXVlcnlTZWxlY3RvciIsInRvZ2dsZSIsInRvZ2dsZVRhYlZpc2liaWxpdHkiLCJ0YWIiLCJnZXRFbGVtZW50QnlJZCIsImhvbWVQYWdlQ29udGVudCIsInRpdGxlIiwidGV4dCIsImJ1dHRvbiIsIm1lbnVEYXRhIiwiU3RhcnRlcnMiLCJpbmdyZWRpZW50cyIsIndlaWdodCIsInByaWNlIiwiaW1hZ2UiLCJEZXNzZXJ0cyIsImhlYWRlciIsImlkIiwiY3JlYXRlQ29udGFpbmVyIiwiY3JlYXRlTWVudUNvbnRhaW5lciIsIm5hdiIsImNyZWF0ZU5hdiIsImxvZ28iLCJjcmVhdGVMb2dvQ29udGFpbmVyIiwibG9nb0xpbmsiLCJocmVmIiwiY3JlYXRlTG9nb0VsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwiYm9keSIsInByZXBlbmQiLCJjcmVhdGVIZWFkZXIiLCJjb250ZW50IiwiY29udGVudEVsZW1lbnQiLCJjcmVhdGVDb250ZW50RWxlbWVudCIsImhvbWVTZWN0aW9uIiwic2VjdGlvbklkIiwiaGVybyIsImhlcm9UaXRsZSIsImhlcm9UZXh0IiwiaGVyb0J1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjcmVhdGVIZXJvIiwibWVudVNlY3Rpb24iLCJjYXRlZ29yeSIsImRpc2hlcyIsImNhdGVnb3J5RGl2IiwiY2F0ZWdvcnlUaXRsZSIsImRpc2hlc0NvbnRhaW5lciIsImRpc2giLCJkaXNoRGl2IiwiZGlzaEltYWdlQ29udGFpbmVyIiwiZGlzaFRleHRDb250YWluZXIiLCJkaXNoVGl0bGUiLCJkaXNoSW1hZ2UiLCJzcmMiLCJhbHQiLCJpbmdyZWRpZW50c0xpc3QiLCJpbmdyZWRpZW50IiwiaW5ncmVkaWVudEl0ZW0iLCJwdXJjaGFzZSIsInByaWNlQW5kV2VpZ2h0IiwiY29udGFjdFNlY3Rpb24iLCJjb250YWN0Q29udGVudCIsImFkZHJlc3MiLCJpbm5lckhUTUwiLCJwaG9uZU51bWJlciIsIm1hcFRpdGxlIiwibWFwSW1hZ2UiLCJhZnRlciIsImNyZWF0ZVBhZ2VDb250ZW50IiwibWVudUl0ZW1zIiwidGFicyIsImdldEF0dHJpYnV0ZSIsInNldHVwVGFiU3dpdGNoaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==