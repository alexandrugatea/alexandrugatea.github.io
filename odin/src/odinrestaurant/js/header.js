import createContainer from "./container";
import { menuOptions } from "./options";
import createLogoElement from "./logo";

function createHeader() {
	const header = document.createElement("header");
	header.classList.add("header");
	header.id = "header";

	const container = createContainer();
	const menu = createMenuContainer();
	const nav = createNav();
	const logo = createLogoContainer();
	const logoLink = createLogoElement();
	logo.appendChild(logoLink);

	for (const [item, link] of Object.entries(menuOptions)) {
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
	const nav = document.createElement("div");
	nav.classList.add("nav");
	return nav;
}

function createMenuContainer() {
	const menu = document.createElement("div");
	menu.classList.add("menu");
	return menu;
}

function createLogoContainer() {
	const logo = document.createElement("div");
	logo.classList.add("logo-container");
	return logo;
}

function createMenuItem(parent, item, link) {
	const menuLink = document.createElement("div");
	menuLink.classList.add("menu-link");
	menuLink.textContent = item;
	menuLink.setAttribute("target", link);
	parent.appendChild(menuLink);
}

export default createHeader;
