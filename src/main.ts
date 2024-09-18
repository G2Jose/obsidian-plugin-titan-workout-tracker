import dayjs from "dayjs";
import { MarkdownView, Notice, Plugin, request } from "obsidian";
import { DEFAULT_SETTINGS } from "src/constants/defaultSettings";
import { TitanSettingTab } from "src/SettingsTab";
import { TitanPluginSettings, WorkoutSessionsResponse } from "src/types";
import { createDirectory } from "src/utils/createDirectory";
import { createOrReplaceFile } from "src/utils/createOrReplaceFile";
import { fetchData } from "src/utils/fetchData";
import { getSessionStr } from "src/utils/getSessionStr";
import { constructPath } from "src/utils/path";

export default class TitanPlugin extends Plugin {
	settings: TitanPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon(
			"chart",
			"Titan Workout Tracker",
			(evt: MouseEvent) => {
				new Notice(
					"Press CMD / Ctrl + P and search for Titan to find available commands"
				);
			}
		);

		this.addCommand({
			id: "import-titan-workout-tracker-data",
			name: "Import workout data",
			callback: async () => {
				await this.importData();
			},
		});

		this.addSettingTab(new TitanSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async importData() {
		const pluginDataPath = this.settings.pluginDataDir;

		const response = await fetchData({
			userId: this.settings.userId,
			token: this.settings.token,
		});

		for (const [sessionIndex, session] of response.obsidianData.entries()) {
			const date = dayjs(session.start).format("YYYY-MM-DD");

			const sessionPath = constructPath(pluginDataPath, date);

			await createDirectory(this.app.vault, sessionPath);

			const filePath = constructPath(sessionPath, date + ".md");

			await createOrReplaceFile(
				this.app.vault,
				filePath,
				getSessionStr(session)
			);
		}

		// const leaf = this.app.workspace.getLeaf(true);
		// await leaf.openFile(file);
		new Notice(
			`Successfully imported ${response.obsidianData.length} workout sessions`
		);
	}

	async ensureFolderExists(folderPath: string) {
		if (!(await this.app.vault.adapter.exists(folderPath))) {
			await this.app.vault.createFolder(folderPath);
		}
	}
}
