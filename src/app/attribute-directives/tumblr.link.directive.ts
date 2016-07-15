import { Directive, ElementRef, DoCheck, Input } from '@angular/core';

@Directive({ selector: '[tumblrLink]' })
export class TumblrLinkDirective implements DoCheck{
    @Input('tumblrLink') link: string;
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        if(this.link){
            this.applySettings(this.el.nativeElement, this.link);
        }else {
            let blogLinks = this.el.nativeElement.querySelectorAll("a.tumblr_blog");
            if (blogLinks.length > 0) {
                for (let blogLink of blogLinks) {
                    if (blogLink.getAttribute("href").indexOf("tumblr") > -1) {
                        this.applySettings(blogLink, blogLink.getAttribute("href"));
                    }
                }
            }
        }
    }

    private applySettings(element: any, link : string) : void{
        element.setAttribute("href", this.getHref(link));
        element.setAttribute("target", "_blank");
    }

    private getHref(currentHref: string) : string{
        //External link
        if(currentHref.indexOf("tumblr.com") < 0){
            return currentHref;
        }

        currentHref = currentHref.replace("http://", "");
        currentHref = currentHref.replace("https://", "");

        let data = currentHref.split(".tumblr.com/post/");

        if(data[1]===undefined){
            return "/blog/" + currentHref.substring(0, currentHref.indexOf("."));
        }
        
        return "/blog/" + data[0] + "/post/" + data[1].match(/\d+/)[0];
    }
}