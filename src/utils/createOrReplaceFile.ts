import { TFile, Vault } from "obsidian";

export const createOrReplaceFile = async (
	vault: Vault,
	filePath: string,
	content: string
) => {
	try {
		const exists = await vault.adapter.exists(filePath);
		if (!exists) {
			await vault.create(filePath, content);
		} else {
			const existingFile = vault.getAbstractFileByPath(filePath);
			if (existingFile && existingFile instanceof TFile) {
				await vault.modify(existingFile, content);
			}
		}
	} catch {
		//
	}
};
