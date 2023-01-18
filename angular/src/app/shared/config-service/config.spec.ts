import * as config from "./config";
import { default_config } from "../../../environments/environment"

describe("config.withDefaults", function() {

    it("handles empty config object", function() {
        let cfg : config.Config = config.withDefaults({} as config.Config);
        expect(cfg.SERVERBASE).toBe("");
        expect(cfg.RMMAPI).toBe("/rmm/");
        expect(cfg.DISTAPI).toBe("/od/ds/");
        expect(cfg.LANDING).toBe("/od/id/");
        expect(cfg.SDPAPI).toBe("/sdp/");
        expect(cfg.GACODE).toBe("not set");
        expect(cfg.APPVERSION).toBe("not set");
    });

    it("handles minimally set config object", function() {
        let cfg : config.Config = config.withDefaults({
            SERVERBASE: "http://localhost/",
            GACODE: "not-set",
            APPVERSION: "spec"
        });
        expect(cfg.SERVERBASE).toBe("http://localhost");
        expect(cfg.RMMAPI).toBe("http://localhost/rmm/");
        expect(cfg.DISTAPI).toBe("http://localhost/od/ds/");
        expect(cfg.LANDING).toBe("http://localhost/od/id/");
        expect(cfg.SDPAPI).toBe("http://localhost/sdp/");
        expect(cfg.GACODE).toBe("not-set");
        expect(cfg.APPVERSION).toBe("spec");
    });

    it("handles partially set config object", function() {
        let cfg : config.Config = config.withDefaults({
            SERVERBASE: "http://localhost/",
            RMMAPI: "https://data.nist.gov/rmm/",
            GACODE: "not-set",
            APPVERSION: "spec"
        });
        expect(cfg.SERVERBASE).toBe("http://localhost");
        expect(cfg.RMMAPI).toBe("https://data.nist.gov/rmm/");
        expect(cfg.DISTAPI).toBe("http://localhost/od/ds/");
        expect(cfg.LANDING).toBe("http://localhost/od/id/");
        expect(cfg.SDPAPI).toBe("http://localhost/sdp/");
        expect(cfg.GACODE).toBe("not-set");
        expect(cfg.APPVERSION).toBe("spec");
    });

    it("handles the default configuration loaded from the environment", function() {
        let cfg : config.Config = config.withDefaults(default_config);
        expect(cfg.SERVERBASE).toBe("http://localhost");
        expect(cfg.RMMAPI).toBe("http://localhost/rmm/");
        expect(cfg.DISTAPI).toBe("http://localhost/od/ds/");
        expect(cfg.LANDING).toBe("http://localhost/od/id/");
        expect(cfg.SDPAPI).toBe("http://localhost/sdp/");
        expect(cfg.GACODE).toBe("not-set");
        expect(cfg.APPVERSION).toBe("debug");
    });
});
