import { toggleActiveStateOnMenuItem, toggleTabVisibility } from "./tabs";
import createContainer from "./container";

const homePageContent = {
	hero: {
		title: `Welcome to Odin's`,
		text: `Step into a realm where the legends of Norse mythology come alive. At Odin's, you are not just a guest, but a warrior embarking on a culinary journey through the Nine Realms. Indulge in the feast of the gods, savor the mead of Valhalla, and experience flavors as timeless as the tales of old.`,
		button: {
			title: "Discover the Menu",
			link: "menu",
		},
	},
};

export default function home(sectionId) {
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

	const container = createContainer();

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

	heroButton.addEventListener("click", function () {
		toggleTabVisibility(homePageContent.hero.button.link);
		toggleActiveStateOnMenuItem(homePageContent.hero.button.link);
	});

	container.appendChild(heroTitle);
	container.appendChild(heroText);
	container.appendChild(heroButton);
	hero.appendChild(container);

	return hero;
}
