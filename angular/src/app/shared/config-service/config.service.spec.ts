import { TestBed } from '@angular/core/testing';
import { AppConfig, Config } from './config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import * as rxjs from 'rxjs';

describe('AppConfig', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ HttpClientModule ],
        providers: [ HttpClient ]
    }));

    it('getDefaultConfig', () => {
        let service: AppConfig = TestBed.inject(AppConfig);
        expect(service).toBeTruthy();

        let conf = service.getDefaultConfig()
        expect(conf.SERVERBASE).toEqual("http://localhost");
        expect(conf.RMMAPI).toEqual("http://localhost/rmm/");
        expect(conf.SDPAPI).toEqual("http://localhost/sdp/");
        expect(conf.GACODE).toEqual("not-set");
        expect(conf.APPVERSION).toEqual("debug");
    });

    it('getConfig: returns default config by default', (done) => {
        let service: AppConfig = TestBed.get(AppConfig);
        expect(service).toBeTruthy();

        let defdata: Config = service.getDefaultConfig();

        service.getConfig().subscribe((data) => { expect(data).toEqual(defdata); done(); },
                                      (err)  => { fail(err); done(); });
    });

    it('getRemoteConfig', (done) => {
        let service: AppConfig = TestBed.get(AppConfig);
        expect(service).toBeTruthy();

        service.getRemoteConfig().subscribe(
            (conf) => {
                expect(conf["SERVERBASE"]).toEqual("http://data.nist.gov");
                expect(conf["RMMAPI"]).toEqual("http://data.nist.gov/rmm/");
                expect(conf["SDPAPI"]).toEqual("http://localhost:5555/");
                expect(conf.GACODE).toEqual("not-set");
                expect(conf.APPVERSION).toEqual("1.3.0");
                done();
            },
            (err) => { fail(err); done();}
        );
    });

    it('loadRemoteConfig', (done) => {
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
                done();
            },
            (err) => { fail(err); done(); }
        );
    });
});
