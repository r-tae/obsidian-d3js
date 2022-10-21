import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import * as d3 from "d3";
import _ from "lodash"

// Remember to rename these classes and interfaces!

// interface ObsidianD3jsSettings {
// 	mySetting: string;
// }

// const DEFAULT_SETTINGS: ObsidianD3jsSettings = {
// 	mySetting: "default",
// };

export default class ObsidianD3js extends Plugin {
	// settings: ObsidianD3jsSettings;

	async onload() {
		// await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			"d3",
			async (source, el, _ctx) => {				
				const graph = (node: HTMLElement) => el.appendChild(node)
				function run(str: string) {
					str = `function(d3, graph, _) { ${str} }`
					str = `"use strict";return (${str})`

					return Function(str)()(d3, graph, _)
				}
				run(source)
			}
		);
	}

	onunload() {}

	// async loadSettings() {
	// 	this.settings = Object.assign(
	// 		{},
	// 		DEFAULT_SETTINGS,
	// 		await this.loadData()
	// 	);
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}

// class SampleSettingTab extends PluginSettingTab {
// 	plugin: ObsidianD3js;

// 	constructor(app: App, plugin: ObsidianD3js) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const { containerEl } = this;

// 		containerEl.empty();

// 		containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

// 		new Setting(containerEl)
// 			.setName("Setting #1")
// 			.setDesc("It's a secret")
// 			.addText((text) =>
// 				text
// 					.setPlaceholder("Enter your secret")
// 					.setValue(this.plugin.settings.mySetting)
// 					.onChange(async (value) => {
// 						console.log("Secret: " + value);
// 						this.plugin.settings.mySetting = value;
// 						await this.plugin.saveSettings();
// 					})
// 			);
// 	}
// }
