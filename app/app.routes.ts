import { provideRouter, RouterConfig }  from '@angular/router';
import {SettingsComponent} from "./components/settings.component";
import {PostListComponent} from "./components/post.list.component";

const routes: RouterConfig = [
    {path: '', redirectTo: '/settings', pathMatch: 'full'},
    {path: 'settings', component: SettingsComponent},
    {path: 'blog/:name', component: PostListComponent},
    {path: 'blog-post/:name/post/:post', component: PostListComponent},
    {path: 'blog-details/:name/tag/:tag', component: PostListComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];