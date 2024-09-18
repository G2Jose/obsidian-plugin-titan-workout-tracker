import { Vault } from "obsidian";

export const createDirectory = async (vault: Vault, path: string) => {
	try {
		if (!(await vault.adapter.exists(path))) {
			await vault.createFolder(path);
		}
	} catch {
		//
	}
};
