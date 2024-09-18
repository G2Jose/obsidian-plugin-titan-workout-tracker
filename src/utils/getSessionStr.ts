import { ObsidianDatum } from "src/types";
import yaml from "json-to-pretty-yaml";

export const getSessionStr = (data: ObsidianDatum) => {
	const content = yaml.stringify(data);

	return "---\n" + content + "\n---";
};
