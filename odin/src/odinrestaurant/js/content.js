import { menuOptions } from "./options";

// Import page sections
import home from "./home";
import menu from "./menu";
import contact from "./contact";

function createPageContent() {
	const header = document.querySelector(".header");
	const content = createContentElement();

	const homeSection = home(menuOptions.home);
	const menuSection = menu(menuOptions.menu);
	const contactSection = contact(menuOptions.contact);

	content.appendChild(homeSection);
	content.appendChild(menuSection);
	content.appendChild(contactSection);

	header.after(content);
}

function createContentElement() {
	const contentElement = document.createElement("div");
	contentElement.classList.add("content");
	contentElement.id = "content";

	return contentElement;
}

export { createPageContent };
