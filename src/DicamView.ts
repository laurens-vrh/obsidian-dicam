import { FileView, TFile, WorkspaceLeaf } from "obsidian";
import { Generator, Parser } from "dicam-generator/src/index.js";

export const DICAM_VIEW_TYPE = "dicam-view";

export class DicamView extends FileView {
	metadata?: any;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return DICAM_VIEW_TYPE;
	}

	getDisplayText() {
		return this.metadata?.notes[0] ?? this.file?.name ?? "Dicam file";
	}

	async onLoadFile(file: TFile) {
		const container = this.containerEl.children[1];
		container.empty();
		container.classList.add("dicam-view");

		const fileContents = await file.vault.read(file);
		const parser = new Parser(file.name, fileContents);
		this.metadata = parser.parseHeader();

		container.createEl("h1", { text: this.metadata.notes[0] });
		container.createEl("p").innerHTML = this.metadata.notes
			.slice(1)
			.join("<br \\>");
		const { text, markings } = parser.parse();

		const canvas = container.createEl("canvas");
		const generator = new Generator(
			text,
			markings,
			{
				width: 600,
				padding: 15,
			},
			canvas
		);
		generator.generate();
	}

	async onOpen() {}

	async onClose() {
		// Nothing to clean up.
	}
}
