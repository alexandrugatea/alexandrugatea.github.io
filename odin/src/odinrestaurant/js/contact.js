import createContainer from "./container";

export default function contact (sectionId) {
    const contactSection = document.createElement("div");
    contactSection.classList.add("tab");
    contactSection.id = sectionId;

    const container = createContainer();

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