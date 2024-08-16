/**
 * Support for accessing configuration data
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config, withDefaults } from './config';
import { default_config, environment } from '../../../environments/environment';
import * as rxjs from 'rxjs';
import * as rxjsop from 'rxjs/operators';

export { Config };

/**
 * the application configuration service.  By default (the mode appropriate for unit
 * tests that rely on configuration data), this service pulls its configuration data 
 * from the Angular environment (i.e. environments/environment.ts); however, when
 * loadRemoteConfig() is called (usually by the app initialization--see app.module.ts),
 * the configuration data will be pulled from a static file on the server.  
 *
 * The configuration data is retrieved via the genConfig() member function which is 
 * always returned as an Observable.  
 *
 * Note that unit tests that utilize this service class will get the configuration 
 * provided by the Angular environment unless loadRemoteConfig() is explicitly called.
 */
@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    private _subject: rxjs.Subject<Config>;
    private remoteSourceURL: string = null
    
    constructor(private http: HttpClient) {
        // Load the default values:
        this._subject = null;
    }

    /**
     * asynchronously load the configuration from a remote location.  The results 
     * will be internally cached.
     */
    loadRemoteConfig(srcurl: string = null) : rxjs.Observable<Config> {
        if (! srcurl) srcurl = environment.config_url;
        this.remoteSourceURL = srcurl;
            
        this._subject = new rxjs.AsyncSubject();
        this.getRemoteConfig(this.remoteSourceURL).subscribe(this._subject);
        return this._subject;
    }

    /**
     * retrieve and return configuration data from a remote location.  The results 
     * not cached internally (see loadRemoteConfig()).
     * @param srcurl   the URL containing the remote configuration (as a JSON object)
     */
    getRemoteConfig(srcurl?: string) : rxjs.Observable<Config> {
        if (! srcurl) srcurl = environment.config_url
        return this.http.get(srcurl).pipe(
            rxjsop.map<Config, Config>(resp => {
                var cfg: Config = withDefaults(resp as Config);
                if (! cfg.GACODE || ! cfg.APPVERSION) {
                    let defcfg: Config = this.getDefaultConfig();
                    if (! cfg.GACODE) cfg.GACODE = defcfg.GACODE;
                    if (! cfg.APPVERSION) cfg.APPVERSION = defcfg.APPVERSION;
                }
                return cfg;
            }),
            rxjsop.catchError(err => {
                console.error("Failed to download configuration: " + JSON.stringify(err));
                return rxjs.throwError(err);
            })
        );
    }

    getDefaultConfig() : Config {
        return withDefaults(default_config);
    }

    /**
     * return the configuration data
     */
    getConfig() : rxjs.Observable<Config> {
        if (! this._subject) {
            if (this.remoteSourceURL)
                this.loadRemoteConfig(this.remoteSourceURL)

            else 
                return new rxjs.Observable<Config>((observer) => {
                    observer.next(this.getDefaultConfig());
                    observer.complete();
                    return;
                });
        }

        return this._subject;
    }
}
