export default function getLocation() {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				const coords = {
					lat: data.coords.latitude,
					lon: data.coords.longitude,
				};
				resolve(coords);
			},
			(err) => {
				console.warn("Location disabled by user ", err);
				const coords = {
					lat: 0,
					lon: 0,
				};
				resolve(coords);
			}
		);
	});
}
