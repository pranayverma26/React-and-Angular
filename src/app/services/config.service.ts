import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    // Defining type.
    public config: {
        test: string,
    };

    constructor() {
        const env = environment.production ? 'production' : 'development';
        this.config = (window as any)[env]['config']; // Added any to bypass typescript error.
        console.clear();
        console.warn(this.config);
    }
}