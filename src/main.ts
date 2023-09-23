import { Options, defaultOptions } from "dicam-generator/options.js";
import { MarkdownView, Plugin } from "obsidian";
import { DicamSettingTab } from "./DicamSettingTab";
import { DICAM_VIEW_TYPE, DicamView } from "./DicamView";
import { render } from "./render";

export default class DicamPlugin extends Plugin {
	settings: Options;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new DicamSettingTab(this.app, this));

		this.registerView(DICAM_VIEW_TYPE, (leaf) => new DicamView(leaf, this));
		this.registerExtensions(["dicam"], DICAM_VIEW_TYPE);

		this.registerMarkdownCodeBlockProcessor(
			"dicam",
			async (src, el, ctx) => {
				render(this.settings, el, "", src);

				this.app.workspace.getActiveViewOfType(MarkdownView);
			}
		);
	}

	async loadSettings() {
		this.settings = Object.assign(defaultOptions, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {}

	async activateView() {
		await this.app.workspace.getLeaf("tab").setViewState({
			type: DICAM_VIEW_TYPE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(DICAM_VIEW_TYPE)[0]
		);
	}
}
