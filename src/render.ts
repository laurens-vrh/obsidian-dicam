import { Options } from "dicam-generator/options";
import { Generator, Parser } from "dicam-generator/src/index.js";

export function render(
	options: Partial<Options>,
	element: Element,
	fileName: string,
	file: string
) {
	element.empty();
	element.classList.add("dicam-view");

	const parser = new Parser(fileName, file);
	const metadata = parser.parseHeader();

	element.createEl("h1", { text: metadata.notes[0] });
	element.createEl("p").innerHTML = metadata.notes.slice(1).join("<br \\>");
	const { text, markings } = parser.parse();

	const canvas = element.createEl("canvas");
	const generator = new Generator(text, markings, canvas, this.settings);
	generator.generate();

	return metadata;
}
