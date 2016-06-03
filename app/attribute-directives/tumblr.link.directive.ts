import { Directive, ElementRef, DoCheck } from '@angular/core';

@Directive({ selector: '[tumblrLink]' })
export class TumblrLinkDirective implements DoCheck{
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        let blogLinks = this.el.nativeElement.querySelectorAll("a.tumblr_blog");;
        if(blogLinks.length > 0){
            for(let blogLink of blogLinks){
                if(blogLink.getAttribute("href").indexOf("tumblr") > -1) {
                    blogLink.setAttribute("href", this.getHref(blogLink.getAttribute("href")));
                    blogLink.setAttribute("target", "_blank");
                }
            }
        }
    }

    private getHref(currentHref: string) {
        currentHref = currentHref.replace("http://", "");
        let data = currentHref.split(".tumblr.com/post/");
        return "/blog-post/" + data[0] + "/post/" + data[1].match(/\d+/)[0];
    }
}