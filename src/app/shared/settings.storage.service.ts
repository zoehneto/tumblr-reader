import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Settings } from '../data.types';
import * as _ from 'lodash';

@Injectable()
export class SettingsStorageService {
    private currentSettings: Settings;
    constructor() {
        this.init();
    }

    private async init() {
        this.currentSettings = await this.getSettings();
    }

    async getSettings(): Promise<Settings> {
        const storedSettings = await localforage.getItem('settings');
        if (storedSettings === null) {
            this.currentSettings = await localforage.setItem('settings', this.dateToNumber(new Settings(new Date())))
                .then(newSettings => this.numberToDate(newSettings));
        } else {
            this.currentSettings = this.numberToDate(storedSettings);
        }
        return this.currentSettings;
    }

    async updateSettings<T>(value: T, setter: (settings: Settings, value: T) => void): Promise<Settings> {
        const newSettings = _.cloneDeep(this.currentSettings);
        setter(newSettings, value);
        newSettings.lastUpdated = new Date();

        this.currentSettings = await localforage.setItem('settings', this.dateToNumber(newSettings))
            .then(storedSettings => this.numberToDate(storedSettings));
        return this.currentSettings;
    }

    private dateToNumber(settings: Settings): any {
        const settingsConverted = <any> settings;
        settingsConverted.lastUpdated = settings.lastUpdated.getTime();
        settingsConverted.blogs.forEach((blog: any) => blog.updated = blog.updated.getTime());
        return settingsConverted;
    }

    private numberToDate(settings: any): Settings {
        settings.lastUpdated = new Date(settings.lastUpdated);
        settings.blogs.forEach((blog: any) => blog.updated = new Date(blog.updated));
        return settings;
    }
}
