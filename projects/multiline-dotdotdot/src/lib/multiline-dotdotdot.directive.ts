import { Directive, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
    selector: '[multilineDotdotdot]',
    host: {
        '[style.display]': '"block"'
    }
})
export class MultilineDotdotdotDirective implements AfterViewInit {

    private initialHtml: SafeHtml;
    private innerWidth: number;
    private resizeEndTimeout: any;
    private firstChild: HTMLElement;
    constructor(private element: ElementRef, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.firstChild = this.element.nativeElement.firstChild;
        const { innerHTML } = this.firstChild;
        this.initialHtml = innerHTML;
        this.innerWidth = window.innerWidth;
        this.calculateContent();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // If width will be larger
        this.checkResizeIsEnd();

    }
    /**
     * Invoke when window resize is end
     */
    private checkResizeIsEnd() {
        clearTimeout(this.resizeEndTimeout);
        this.resizeEndTimeout = setTimeout(() => {
            this.calculateContent();
        }, 100);
    }

    /**
     * Calculate the text
    */
    private calculateContent() {
        // if width will be larger
        if (this.innerWidth < window.innerWidth) {
            this.innerWidth = window.innerWidth;
            this.calculateIfWidthWider();

        } else {
            this.innerWidth = window.innerWidth;
            // If width will be smaller
            this.calculateIfWidthSlimmer();
        }
    }

    /**
     * Calculate the content if the window width get slimmer
     */
    private calculateIfWidthSlimmer(): void {
        while (this.element.nativeElement.clientHeight <= this.firstChild.clientHeight) {
            this.firstChild.innerHTML
                = this.firstChild.innerHTML.replace(/\W*\s(\S)*$/, '...');
        }
    }

    /**
     * Calculate the content if the window width get wider
     */
    private calculateIfWidthWider(): void {
        let needMoreCalculate = true;
        // if the last three character is ...
        const dotdotdotIndex = this.firstChild.innerHTML.indexOf('...');
        if (dotdotdotIndex === this.firstChild.innerHTML.length - 3) {
            // Check if we display more words in the content
            while (this.element.nativeElement.clientHeight > this.firstChild.clientHeight && needMoreCalculate) {
                const { innerHTML } = this.firstChild;

                // Get next word that we could append
                const nextWord = this.initialHtml.toString()
                    .slice(innerHTML.length - 3, this.initialHtml.toString().length).match(/[\w\-\.\?\!\_]+/)[0];
                const lastHtml = this.firstChild.innerHTML;

                let newHtml = this.firstChild.innerHTML.replace(/\.\.\.$/, ` ${nextWord}`);
                // Is it last word?
                if (newHtml === this.initialHtml) {
                    needMoreCalculate = false;
                } else {
                    newHtml = `${newHtml}...`;
                }

                this.firstChild.innerHTML = newHtml;
                if (this.element.nativeElement.clientHeight < this.firstChild.clientHeight) {
                    this.firstChild.innerHTML = lastHtml;
                    needMoreCalculate = false;
                }
            }
        }
    }
}
