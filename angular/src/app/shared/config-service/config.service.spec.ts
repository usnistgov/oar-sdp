import { TestBed } from '@angular/core/testing';
import { AppConfig, Config } from './config.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import * as rxjs from 'rxjs';

describe('AppConfig', () => {
    beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [HttpClient, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

    it('getDefaultConfig', () => {
        let service: AppConfig = TestBed.inject(AppConfig);
        expect(service).toBeTruthy();

        let conf = service.getDefaultConfig()
        expect(conf.SERVERBASE).toEqual("http://localhost:4000");
        expect(conf.RMMAPI).toEqual("http://localhost:4000/rmm/");
        expect(conf.SDPAPI).toEqual("http://localhost:4000/sdp/");
        expect(conf.GACODE).toEqual("not-set");
        expect(conf.APPVERSION).toEqual("debug");
    });

    it('getConfig: returns default config by default', async () => {
        let service: AppConfig = TestBed.get(AppConfig);
        expect(service).toBeTruthy();

        let defdata: Config = service.getDefaultConfig();

        service.getConfig().subscribe((data) => { expect(data).toEqual(defdata);  },
                                      (err)  => { fail(err);  });
    }, 1000);

    it('getRemoteConfig', async () => {
        let service: AppConfig = TestBed.get(AppConfig);
        expect(service).toBeTruthy();

        service.getRemoteConfig().subscribe(
            (conf) => {
                expect(conf["SERVERBASE"]).toEqual("http://data.nist.gov");
                expect(conf["RMMAPI"]).toEqual("http://data.nist.gov/rmm/");
                expect(conf["SDPAPI"]).toEqual("http://localhost:5555/");
                expect(conf.GACODE).toEqual("not-set");
                expect(conf.APPVERSION).toEqual("1.3.0");
            },
            (err) => { 
                fail(err); 
            }
        );
    }, 1000);

    it('loadRemoteConfig', async () => {
        let service: AppConfig = TestBed.get(AppConfig);
        expect(service).toBeTruthy();

        service.loadRemoteConfig();
        service.getConfig().subscribe(
            (conf) => {
                expect(conf["SERVERBASE"]).toEqual("http://data.nist.gov");
                expect(conf["RMMAPI"]).toEqual("http://data.nist.gov/rmm/");
                expect(conf["SDPAPI"]).toEqual("http://localhost:5555/");
                expect(conf.GACODE).toEqual("not-set");
                expect(conf.APPVERSION).toEqual("1.3.0");
            },
            (err) => { fail(err); }
        );
    }, 1000);
});
