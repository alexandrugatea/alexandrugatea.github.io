const sunriseIcon = `<svg class="sunrise" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 0.292893C11.6834 -0.0976311 12.3166 -0.0976311 12.7071 0.292893L16.7071 4.29289C17.0976 4.68342 17.0976 5.31658 16.7071 5.70711C16.3166 6.09763 15.6834 6.09763 15.2929 5.70711L13 3.41421V8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8V3.41421L8.70711 5.70711C8.31658 6.09763 7.68342 6.09763 7.29289 5.70711C6.90237 5.31658 6.90237 4.68342 7.29289 4.29289L11.2929 0.292893ZM3.51262 8.51262C3.90314 8.1221 4.53631 8.1221 4.92683 8.51262L6.34683 9.93262C6.73736 10.3231 6.73736 10.9563 6.34683 11.3468C5.95631 11.7374 5.32314 11.7374 4.93262 11.3468L3.51262 9.92683C3.1221 9.53631 3.1221 8.90314 3.51262 8.51262ZM20.4875 8.51262C20.878 8.90314 20.878 9.53631 20.4875 9.92683L19.0675 11.3468C18.6769 11.7374 18.0438 11.7374 17.6532 11.3468C17.2627 10.9563 17.2627 10.3231 17.6532 9.93262L19.0732 8.51262C19.4638 8.1221 20.0969 8.1221 20.4875 8.51262ZM7.75736 12.7574C8.88258 11.6321 10.4087 11 12 11C13.5913 11 15.1174 11.6321 16.2426 12.7574C17.3679 13.8826 18 15.4087 18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13C10.9391 13 9.92172 13.4214 9.17157 14.1716C8.42143 14.9217 8 15.9391 8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 15.4087 6.63214 13.8826 7.75736 12.7574ZM0 17C0 16.4477 0.447715 16 1 16H3C3.55228 16 4 16.4477 4 17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17ZM20 17C20 16.4477 20.4477 16 21 16H23C23.5523 16 24 16.4477 24 17C24 17.5523 23.5523 18 23 18H21C20.4477 18 20 17.5523 20 17ZM0 21C0 20.4477 0.447715 20 1 20H23C23.5523 20 24 20.4477 24 21C24 21.5523 23.5523 22 23 22H1C0.447715 22 0 21.5523 0 21Z" fill="black"/>
</svg>`;

const sunsetIcon = `<svg class="sunset" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C12.5523 0 13 0.447715 13 1V5.58579L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L12.7071 8.70711C12.3166 9.09763 11.6834 9.09763 11.2929 8.70711L7.29289 4.70711C6.90237 4.31658 6.90237 3.68342 7.29289 3.29289C7.68342 2.90237 8.31658 2.90237 8.70711 3.29289L11 5.58579V1C11 0.447715 11.4477 0 12 0ZM3.51262 8.51262C3.90314 8.1221 4.53631 8.1221 4.92683 8.51262L6.34683 9.93262C6.73736 10.3231 6.73736 10.9563 6.34683 11.3468C5.95631 11.7374 5.32314 11.7374 4.93262 11.3468L3.51262 9.92683C3.1221 9.53631 3.1221 8.90314 3.51262 8.51262ZM20.4875 8.51262C20.878 8.90314 20.878 9.53631 20.4875 9.92683L19.0675 11.3468C18.6769 11.7374 18.0438 11.7374 17.6532 11.3468C17.2627 10.9563 17.2627 10.3231 17.6532 9.93262L19.0732 8.51262C19.4638 8.1221 20.0969 8.1221 20.4875 8.51262ZM7.75736 12.7574C8.88258 11.6321 10.4087 11 12 11C13.5913 11 15.1174 11.6321 16.2426 12.7574C17.3679 13.8826 18 15.4087 18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13C10.9391 13 9.92172 13.4214 9.17157 14.1716C8.42143 14.9217 8 15.9391 8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 15.4087 6.63214 13.8826 7.75736 12.7574ZM0 17C0 16.4477 0.447715 16 1 16H3C3.55228 16 4 16.4477 4 17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17ZM20 17C20 16.4477 20.4477 16 21 16H23C23.5523 16 24 16.4477 24 17C24 17.5523 23.5523 18 23 18H21C20.4477 18 20 17.5523 20 17ZM0 21C0 20.4477 0.447715 20 1 20H23C23.5523 20 24 20.4477 24 21C24 21.5523 23.5523 22 23 22H1C0.447715 22 0 21.5523 0 21Z" fill="black"/>
</svg>`;

export {sunriseIcon, sunsetIcon}