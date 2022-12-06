import { App, PluginSettingTab, Setting } from 'obsidian';
import CooklangPlugin from 'main';

export interface ICooklangSettings {
	displayCookware: boolean;
	displayIngredients: boolean;
	displayTotalCookTime: boolean;
    displayQuantityInline: boolean;
    displayTimers: boolean;
}

export class CooklangSettings implements ICooklangSettings {
	displayCookware: true
	displayIngredients: true;
	displayTotalCookTime: true;
    displayQuantityInline: true;
    displayTimers: true;
}

export class CooklangSettingsTab extends PluginSettingTab {
	
	private plugin: CooklangPlugin;

	constructor(app: App, plugin: CooklangPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		
        let { containerEl } = this;

		containerEl.empty();

        this.generalSettings();
        this.cooktimeSettings();
        this.cookwareSettings();
        this.ingredientSettings();
        this.inlineQuantitySettings();
        this.timerSettings();
	}

    cooktimeSettings(){
        new Setting(this.containerEl)
        .setName('Display total cook time')
        .setDesc('Whether the total cook time should be displayed in a recipe')
        .addToggle(t => {
            t.setValue(this.plugin.settings.displayTotalCookTime)
            t.onChange(async(value)=>{
                await this.plugin.writeOptions(old => (old.displayTotalCookTime = value));
            });
        });
    }

    cookwareSettings(){
        new Setting(this.containerEl)
        .setName('Display cookware')
        .setDesc('Whether cookware should be displayed in a recipe')
        .addToggle(t => {
            t.setValue(this.plugin.settings.displayCookware)
            t.onChange(async(value)=>{
                await this.plugin.writeOptions(old => (old.displayCookware = value));
            });
        });
    }

    generalSettings(){
        new Setting(this.containerEl)
        .setName('General Settings')
        .setHeading();
    };

    ingredientSettings(){
        new Setting(this.containerEl)
        .setName('Display ingredients')
        .setDesc('Whether ingredients should be displayed in a recipe')
        .addToggle(t => {
            t.setValue(this.plugin.settings.displayIngredients)
            t.onChange(async(value)=>{
                await this.plugin.writeOptions(old => (old.displayIngredients = value));
            });
        });
    }

    inlineQuantitySettings(){
        new Setting(this.containerEl)
        .setName('Display quantities inline')
        .setDesc('Whether the quantities should be displayed alongside the recipe instruction')
        .addToggle(t => {
            t.setValue(this.plugin.settings.displayQuantityInline)
            t.onChange(async(value)=>{
                await this.plugin.writeOptions(old => (old.displayQuantityInline = value));
            });
        });
    }

    timerSettings(){
        new Setting(this.containerEl)
        .setName('Display timer(s)')
        .setDesc('Whether the timer(s) should be displayed')
        .addToggle(t => {
            t.setValue(this.plugin.settings.displayTimers)
            t.onChange(async(value)=>{
                await this.plugin.writeOptions(old => (old.displayTimers = value));
            });
        });
    }
}