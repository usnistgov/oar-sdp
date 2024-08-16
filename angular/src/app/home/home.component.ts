// import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppConfig, Config } from '../shared/config-service/config.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    selector: 'sdp-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    confValues: Config;
    PDRAPIURL: string;
    SDPAPIURL: string;
    forensicsURL: string;


    themes: any = {
        it: {
            title: "INFORMATION TECHNOLOGY", 
            description: "NIST advances the state-of-the-art in IT in such applications as cybersecurity and biometrics.",
            image:"assets/images/Theme_InformationTechnology.png"
        },
        ms: {
            title: "MATHEMATICS AND STATISTICS", 
            description: "NIST researchers use the latest mathematics approaches and computational methods to help tackle some of the most difficult scientific, technical and engineering problems and tasks.",
            image:"assets/images/Theme_MathematicsStatistics.png"
        },
        manufacturing: {
            title: "MANUFACTURING", 
            description: "NIST provides technical support to the nation's manufacturing industry as they strive to out-innovate and outperform the competition.",
            image:"assets/images/Theme_Manufacturing.png"
        },
        forensics: {
            title: "FORENSICS",
            description: "Bringing together experts from the forensic, research, legal and law enforcement communities to strengthen forensic science and create a safer, more just society.",
            image:"assets/images/Theme_Forensics.jpg",
            icon:"assets/images/forensics_collection.png"
        },
        Materials: {
            title: "MATERIALS",
            description: "NIST develops testbeds, defines benchmarks and develops formability measurements and models for a variety of emerging materials.",
            image:"assets/images/Theme_Materials.jpg"
        },
        Physics: {
            title: "PHYSICS AND NEUTRON",
            description: "NIST provides the measurements, standards, and technical expertise scientists and industries need to push the limits of the fundamental properties of nature.",
            image:"assets/images/Theme_Physics.jpg"
        },
        Communications: {
            title: "ADVANCED COMMUNICATIONS",
            description: "NIST promotes the development and deployment of advanced communications technologies by advancing the measurement science underlying wireless technologies.",
            image:"assets/images/Theme_AdvancedCommunications.jpg"
        },
        Chemistry: {
            title: "CHEMISTRY",
            description: "NIST develops the technology, measurement methods and standards to address the needs of the chemical industry.",
            image:"assets/images/Theme_Chemistry.png"
        },
        chips: {
            title: "CHIPS METROLOGY",
            description: "NIST is working to develop the measurement science needed to support the next generation of computer chips.",
            image:"assets/images/Theme_CHIPS.png",
            icon:"assets/images/forensics_collection.png"
        }
    }

    constructor( private router: Router, private appConfig: AppConfig ) { 
        this.appConfig.getConfig().subscribe(
            (conf) => {
                this.PDRAPIURL = conf.SDPAPI;
                this.SDPAPIURL = conf.SDPAPI;
                this.forensicsURL = conf.SERVERBASE + "/forensics";
            }
        );
    }

    ngOnInit() {
    }

    /**
     * Set the search parameters and redirect to search page
     */
    search(searchValue: string) {
        let queryValue: string;
        
        switch(searchValue) { 
            case 'IT': { 
                queryValue = 'topic.tag="Information Technology"';
                break; 
            } 
            case 'MS': { 
                queryValue = 'topic.tag="Mathematics AND Statistics"';
                break; 
            } 
            case 'Manufacturing': { 
                queryValue = 'topic.tag=Manufacturing';
                break; 
            } 
            case 'Forensics': { 
                queryValue = 'topic.tag=Forensics';
                break; 
            } 
            case 'Materials': { 
                queryValue = 'topic.tag=Materials';
                break; 
            } 
            case 'PN': { 
                queryValue = 'topic.tag=Physics,Neutron'; 
                break; 
            } 
            case 'AC': { 
                queryValue = 'topic.tag="Advanced Communications"';
                break; 
            } 
            case 'Chemistry': { 
                queryValue = 'topic.tag=Chemistry';
                break; 
            } 
            default: { 
                queryValue = 'topic.tag="Information Technology"';
                break; 
            } 
        } 

        let params: NavigationExtras = {
        queryParams: {
            'q': queryValue
        }
        };
        this.router.navigate(['/search'], params);
    }

    /**
     * Return full URL of an image from given file path
     * @param imagePath file path
     * @returns full url
     */
    getImageFullPath(imagePath: string) {
        if(!this.SDPAPIURL || !imagePath) return "";

        return this.SDPAPIURL + imagePath;
    }

    /**
     * Return full URL of an icon image from given file path
     * @param iconPath file path
     * @returns full url
     */
    getIconFullPath(iconPath: string) {
        if(!this.SDPAPIURL || !iconPath) return "";

        return this.SDPAPIURL + iconPath;
    }
}
