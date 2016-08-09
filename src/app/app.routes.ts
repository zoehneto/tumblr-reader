import { Routes }  from '@angular/router';
import { SettingsComponent } from './components/settings.component';
import { PostListComponent } from './components/post.list.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: '/settings', pathMatch: 'full'},
    {path: 'settings', component: SettingsComponent},
    {path: 'blog/:name', component: PostListComponent},
    {path: 'blog/:name/post/:post', component: PostListComponent},
    {path: 'blog/:name/tag/:tag', component: PostListComponent}
];
