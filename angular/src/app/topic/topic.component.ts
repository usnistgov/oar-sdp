import { Component, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
    titleFontSize: string = '1.2vw';
    descFontSize: string = '.9vw';
    descOpacity: number = 0;
    screenMode: string = "large";

    @Input() description: string = "NIST advances the state-of-the-art in IT in such applications as cybersecurity and biometrics."
    @Input() title: string = "Title";
    @Input() image: string = "";

    constructor() { }

    ngOnInit(): void {
    }

    /**
     *  Following functions make responsive font size
     */
    @HostListener("window:resize", [])
    public onResize() {
        this.detectScreenSize();
    }

    public ngAfterViewInit() {
        this.detectScreenSize();
    }

    private detectScreenSize() {
        setTimeout(() => {
            if(window.innerWidth > 768) {
                this.titleFontSize = '1.2vw';
                this.descFontSize = '.9vw';
                this.screenMode = "large";
                this.descOpacity = 0;
            }else if(window.innerWidth > 576){
                this.titleFontSize = '16px';
                this.descFontSize = '12px';
                this.screenMode = "medium";
                this.descOpacity = 0;
            }else{
                this.titleFontSize = '22px';
                this.descFontSize = '15px';
                this.screenMode = "small";
                this.descOpacity = 1;
            }
        }, 0);
    }
     
    onMouseOver() {
        this.descOpacity = 1;
    }

    onMouseOut() {
        if(this.screenMode == "small") return;

        this.descOpacity = 0;
    }
}
