import { Blog } from '../data.types';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ItemSwitch } from './item.switch';

@Injectable()
export class BlogItemSwitch extends ItemSwitch<Blog> {
    constructor(private router: Router) {
        super();
    }

    protected getCurrentItemIndex(blogs: Blog[]): number | null {
        for (let i = 0; i < blogs.length; i++) {
            if (this.selected('/blog/' + blogs[i].name)) {
                return i;
            }
        }
        return null;
    }

    protected moreItemsNeeded(items: Blog[]): boolean {
        return false;
    }

    protected switchToItem(blog: Blog) {
        this.router.navigate(['/blog/', blog.name]);
    }

    private selected(blogName: string) {
        if (location.hash.indexOf(blogName) > -1) {
            return true;
        }
        return false;
    }
}
