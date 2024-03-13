export const timeAgo = (timestamp) => {
	const now = Date.now();
	const secondsAgo = Math.floor((now - timestamp) / 1000);

	if (secondsAgo < 60) {
		return `${secondsAgo}seconds ago`;
	} else if (secondsAgo < 3600) {
		const minutesAgo = Math.floor(secondsAgo / 60);
		return `${minutesAgo}minutes ago`;
	} else if (secondsAgo < 86400) {
		const hoursAgo = Math.floor(secondsAgo / 3600);
		return `${hoursAgo}hours ago`;
	} else if (secondsAgo < 604800) {
		const daysAgo = Math.floor(secondsAgo / 86400);
		return `${daysAgo}days ago`;
	} else {
		const weeksAgo = Math.floor(secondsAgo / 604800);
		return `${weeksAgo}weeks ago`;
	}
};