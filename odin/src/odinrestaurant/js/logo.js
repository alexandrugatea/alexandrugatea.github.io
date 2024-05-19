export default function createLogoElement() {
    const logo = document.createElement('a');
    logo.href = '/';
    logo.classList.add('logo');
    logo.textContent = `Odin's`;

    return logo;
}
