// menu.js
import { menuData } from "./menuData.js";
import createContainer from "./container.js";

export default function menu(sectionId) {
	const menuSection = document.createElement("div");
	menuSection.classList.add("tab");
	menuSection.id = sectionId;

	const container = createContainer();

	for (const [category, dishes] of Object.entries(menuData)) {
		const categoryDiv = document.createElement("div");
		categoryDiv.classList.add("menu-category");

		const categoryTitle = document.createElement("h2");
		categoryTitle.classList.add("menu-category-title");
		categoryTitle.textContent = category; // No need to capitalize here, handle it in CSS
		categoryDiv.appendChild(categoryTitle);

		const dishesContainer = document.createElement("div");
		dishesContainer.classList.add("menu-category-dishes");

		dishes.forEach((dish) => {
			const dishDiv = document.createElement("div");
			dishDiv.classList.add("dish");

			const dishImageContainer = document.createElement("div");
			dishImageContainer.classList.add("dish-image-container");

			const dishTextContainer = document.createElement("div");
			dishTextContainer.classList.add("dish-text-container");

			const dishTitle = document.createElement("h3");
			dishTitle.textContent = dish.title;
			dishTitle.classList.add("dish-title");

			const dishImage = document.createElement("img");
			dishImage.src = dish.image;
			dishImage.alt = dish.title;

			const ingredientsList = document.createElement("ul");
			ingredientsList.classList.add("dish-ingredients");

			dish.ingredients.forEach((ingredient) => {
				const ingredientItem = document.createElement("li");
				ingredientItem.textContent = ingredient;
				ingredientsList.appendChild(ingredientItem);
			});

			const purchase = document.createElement("button");
			purchase.textContent = "Order";
			purchase.classList.add("dish-order");

			const priceAndWeight = document.createElement("div");
			priceAndWeight.classList.add("dish-price-and-weight");

			const weight = document.createElement("p");
			weight.textContent = `Weight: ${dish.weight}`;
			weight.classList.add("dish-weight");

			const price = document.createElement("p");
			price.textContent = `Price ${dish.price}`;
			price.classList.add("dish-price");

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
