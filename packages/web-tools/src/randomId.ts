
function random() {
	return Math.random().toString(36).substring(2)
}

export default function randomId() {
	return random() + +new Date() + random()
}