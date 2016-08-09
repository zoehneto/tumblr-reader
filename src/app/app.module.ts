import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { SettingsComponent } from './components/settings.component';
import { PostListComponent } from './components/post.list.component';

@NgModule({
    declarations: [AppComponent, SettingsComponent, PostListComponent],
    imports: [BrowserModule, RouterModule.forRoot(ROUTES), FormsModule, HttpModule, JsonpModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
