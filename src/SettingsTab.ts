import TitanPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class TitanSettingTab extends PluginSettingTab {
	plugin: TitanPlugin;

	constructor(app: App, plugin: TitanPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Data import directory")
			.setDesc("Directory to store imported workout data")
			.addText((text) =>
				text
					.setPlaceholder("Path to workout data directory")
					.setValue(this.plugin.settings.pluginDataDir)
					.onChange(async (value) => {
						this.plugin.settings.pluginDataDir = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Token")
			.setDesc("Token from Titan Workout Tracker")
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.token)
					.onChange(async (value) => {
						this.plugin.settings.token = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("User ID")
			.setDesc("Your user ID on Titan Workout Tracker")
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.userId)
					.onChange(async (value) => {
						this.plugin.settings.userId = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
