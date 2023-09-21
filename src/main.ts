import { Plugin } from "obsidian";
import { DICAM_VIEW_TYPE, DicamView } from "./DicamView";

interface DicamPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: DicamPluginSettings = {
	mySetting: "default",
};

export default class DicamPlugin extends Plugin {
	settings: DicamPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(DICAM_VIEW_TYPE, (leaf) => new DicamView(leaf));
		this.registerExtensions(["dicam"], DICAM_VIEW_TYPE);

		this.addRibbonIcon("dice", "Activate view", () => {
			this.activateView();
		});
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
}
