export const removeTrailingSlash = (x: string) => {
	return x.replace(/\/$/, "");
};

export const constructPath = (...pathComponents: string[]) => {
	return pathComponents.map((x) => removeTrailingSlash(x)).join("/");
};
