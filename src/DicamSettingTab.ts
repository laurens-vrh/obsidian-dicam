import { App, PluginSettingTab, Setting } from "obsidian";
import DicamPlugin from "./main";

export class DicamSettingTab extends PluginSettingTab {
	plugin: DicamPlugin;

	constructor(app: App, plugin: DicamPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		this.containerEl.empty();

		new Setting(this.containerEl).setHeading().setName("Theme");
		new Setting(this.containerEl)
			.setName("Theme")
			.setDesc(
				"Theme used for rendering. Add your own in the plugins data.json"
			)
			.addDropdown((dropdown) =>
				dropdown
					.addOptions({ default: "Default", pastel: "Pastel" })
					.setValue(this.plugin.settings.theme)
					.onChange(async (value) => {
						this.plugin.settings.theme = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl).setHeading().setName("Fonts");
		new Setting(this.containerEl)
			.setName("Text font")
			.setDesc("Font used for the Latin text")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.font)
					.onChange(async (value) => {
						this.plugin.settings.font = value;
						await this.plugin.saveSettings();
					})
			)
			.addSlider((slider) =>
				slider
					.setLimits(10, 50, 1)
					.setValue(this.plugin.settings.fontSize)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.fontSize = value;
						await this.plugin.saveSettings();
					})
			);
		new Setting(this.containerEl)
			.setName("Note font")
			.setDesc("Font used for all notes")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.noteFont)
					.onChange(async (value) => {
						this.plugin.settings.noteFont = value;
						await this.plugin.saveSettings();
					})
			)
			.addSlider((slider) =>
				slider
					.setLimits(10, 50, 1)
					.setValue(this.plugin.settings.noteFontSize)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.noteFontSize = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl).setHeading().setName("Sizing");
		new Setting(this.containerEl)
			.setName("Canvas width")
			.setDesc("Width of the canvas")
			.addSlider((slider) =>
				slider
					.setLimits(100, 1000, 100)
					.setValue(this.plugin.settings.width)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.width = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Canvas padding")
			.setDesc("Amount of horizontal space around the text")
			.addSlider((slider) =>
				slider
					.setLimits(10, 100, 10)
					.setValue(this.plugin.settings.linePadding)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.linePadding = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Line padding")
			.setDesc("Amount of vertical space around a line")
			.addSlider((slider) =>
				slider
					.setLimits(25, 200, 25)
					.setValue(this.plugin.settings.linePadding)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.linePadding = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(this.containerEl)
			.setName("Highlight padding")
			.setDesc("Amount of space around a highlight")
			.addSlider((slider) =>
				slider
					.setLimits(1, 5, 1)
					.setValue(this.plugin.settings.highlightPadding)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.highlightPadding = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
