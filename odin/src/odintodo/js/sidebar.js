import sidebarHTML from "../layouts/sidebar.html";

export default function injectSidebar() {
	const sidebarHTMLContent = sidebarHTML;
	const sidebarContainer = document.querySelector("#sidebar");
	sidebarContainer.innerHTML = sidebarHTMLContent;
}
