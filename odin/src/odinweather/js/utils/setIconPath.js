function generateIconUrl(data) {
	const dn = data.iconCode.dayOrNight;
	const code = data.iconCode.code;
	return `images/icons/${code}-${dn}.svg`;
}



export { generateIconUrl }