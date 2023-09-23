import { FileView, TFile, WorkspaceLeaf } from "obsidian";
import { render } from "./render";
import DicamPlugin from "./main";

export const DICAM_VIEW_TYPE = "dicam-view";

export class DicamView extends FileView {
	plugin: DicamPlugin;
	metadata?: any;

	constructor(leaf: WorkspaceLeaf, plugin: DicamPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return DICAM_VIEW_TYPE;
	}

	getDisplayText() {
		return this.metadata?.notes[0] ?? this.file?.name ?? "Dicam file";
	}

	async onLoadFile(file: TFile) {
		const container = this.containerEl.children[1];
		const fileContents = await file.vault.read(file);
		this.metadata = render(
			this.plugin.settings,
			container,
			this.file?.name ?? "",
			fileContents
		);
	}

	async onOpen() {}

	async onClose() {}
}
