/**
 * Definition of the configuration parameters and their default values used by 
 * the application.  Default values are derived from the SERVERBASE parameter.  
 */
export interface Config {

    /**
     * the default base server URL
     */
    SERVERBASE: string;

    /**
     * The base URL for the RMM API (defaults to SERVERBASE/rmm/)
     */
    RMMAPI?: string;

    /**
     * The base URL for the Distribution Service API 
     * (defaults to SERVERBASE/od/ds/)
     */
    DISTAPI?: string;

    /**
     * The base URL for the Landing Page Service (defaults to SERVERBASE/od/id/)
     */
    LANDING?: string

    /**
     * The Science Data Portal home URL (defaults to SERVERBASE/sdp/)
     */
    SDPAPI?: string;

    /**
     * The Google Analytics client code
     */
    GACODE: string;

    /**
     * The version of the SDP to display on the home page
     */
    APPVERSION: string;

    /**
     * other parameters are allowed
     */
    [param: string]: any;
}

/**
 * Return a copy of the given Config object with one that has default
 * values added in (based on the given value of SERVERBASE).  
 */
export function withDefaults(config: Config) : Config {
    let out: Config = JSON.parse(JSON.stringify(config));

    if (out.SERVERBASE === undefined) out.SERVERBASE = ""  // should not happen
    if (out.SERVERBASE.endsWith("/"))
        out.SERVERBASE = out.SERVERBASE.replace(/\/$/, "")

    if (! out.RMMAPI) out.RMMAPI = out.SERVERBASE + "/rmm/";
    if (! out.DISTAPI) out.DISTAPI = out.SERVERBASE + "/od/ds/";
    if (! out.LANDING) out.LANDING = out.SERVERBASE + "/od/id/";
    if (! out.SDPAPI) out.SDPAPI = out.SERVERBASE + "/sdp/";

    if (! out.GACODE) out.GACODE = "not set";
    if (! out.APPVERSION) out.APPVERSION = "not set";
    return out;
}


    
