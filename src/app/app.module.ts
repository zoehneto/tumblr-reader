import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { SettingsComponent } from './components/settings.component';
import { PostListComponent } from './components/post.list.component';
import { BlogItemSwitch } from './item-switch/blog.item.switch';
import { PostItemSwitch } from './item-switch/post.item.switch';
import { FaviconService } from './shared/favicon.service';
import { CustomSanitizationService } from './shared/custom.sanitization.service';
import { SettingsService } from './shared/settings.service';
import { TumblrService } from './shared/tumblr.service';
import { Title } from '@angular/platform-browser';
import { HotkeysService } from 'angular2-hotkeys';
import { SidebarComponent } from './components/sidebar.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { EmbedBehaviourDirective } from './attribute-directives/embed.behaviour.directive';
import { PostSwitchDirective } from './attribute-directives/post.switch.directive';
import { TumblrEmbeddedImageDirective }
from './attribute-directives/tumblr.embedded.image.directive';
import { TumblrImageDirective } from './attribute-directives/tumblr.image.directive';
import { TumblrLinkDirective } from './attribute-directives/tumblr.link.directive';
import { VideoBehaviourDirective } from './attribute-directives/video.behaviour.directive';
import { PostComponent } from './components/post-components/post.component';
import { PostAnswerComponent } from './components/post-components/post.answer.component';
import { PostAudioComponent } from './components/post-components/post.audio.component';
import { PostCaptionComponent } from './components/post-components/post.caption.component';
import { PostChatComponent } from './components/post-components/post.chat.component';
import { PostLinkComponent } from './components/post-components/post.link.component';
import { PostMetaComponent } from './components/post-components/post.meta.component';
import { PostPhotoComponent } from './components/post-components/post.photo.component';
import { PostQuoteComponent } from './components/post-components/post.quote.component';
import { PostTextComponent } from './components/post-components/post.text.component';
import { PostTitleComponent } from './components/post-components/post.title.component';
import { PostVideoComponent } from './components/post-components/post.video.component';
import { ResponsiveMenuComponent } from './components/responsive.menu.component';
import { PostNoteComponent } from './components/post-components/post.note.component';

@NgModule({
    declarations: [AppComponent, SidebarComponent, SettingsComponent, PostListComponent,
        PostComponent, PostAnswerComponent, PostAudioComponent, PostCaptionComponent,
        PostChatComponent, PostLinkComponent, PostMetaComponent, PostPhotoComponent,
        PostQuoteComponent, PostTextComponent, PostTitleComponent, PostVideoComponent,
        EmbedBehaviourDirective, PostSwitchDirective, TumblrEmbeddedImageDirective,
        TumblrImageDirective, TumblrLinkDirective, VideoBehaviourDirective,
        ResponsiveMenuComponent, PostNoteComponent],
    imports: [BrowserModule, RouterModule.forRoot(ROUTES), FormsModule, HttpModule, JsonpModule,
        InfiniteScrollModule],
    providers: [Title, HotkeysService, TumblrService, SettingsService, CustomSanitizationService,
        FaviconService, PostItemSwitch, BlogItemSwitch],
    bootstrap: [AppComponent]
})
export class AppModule {
}
