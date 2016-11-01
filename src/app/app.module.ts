import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { SettingsComponent } from './components/settings/settings.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { BlogItemSwitch } from './item-switch/blog.item.switch';
import { HtmlItemSwitch } from './item-switch/html.item.switch';
import { FaviconService } from './shared/favicon.service';
import { CustomSanitizationService } from './shared/custom.sanitization.service';
import { SettingsService } from './shared/settings.service';
import { TumblrService } from './shared/tumblr.service';
import { Title } from '@angular/platform-browser';
import { HotkeyModule } from 'angular2-hotkeys';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { EmbedBehaviourDirective } from './attribute-directives/embed.behaviour.directive';
import { PostSwitchDirective } from './attribute-directives/post.switch.directive';
import { TumblrEmbeddedImageDirective }
from './attribute-directives/tumblr.embedded.image.directive';
import { TumblrImageDirective } from './attribute-directives/tumblr.image.directive';
import { TumblrLinkDirective } from './attribute-directives/tumblr.link.directive';
import { VideoBehaviourDirective } from './attribute-directives/video.behaviour.directive';
import { PostComponent } from './components/post-components/post/post.component';
import { PostAnswerComponent }
from './components/post-components/post-answer/post-answer.component';
import { PostAudioComponent } from './components/post-components/post-audio/post-audio.component';
import { PostCaptionComponent }
from './components/post-components/post-caption/post-caption.component';
import { PostChatComponent } from './components/post-components/post-chat/post-chat.component';
import { PostLinkComponent } from './components/post-components/post-link/post-link.component';
import { PostMetaComponent } from './components/post-components/post-meta/post-meta.component';
import { PostPhotoComponent } from './components/post-components/post-photo/post-photo.component';
import { PostQuoteComponent } from './components/post-components/post-quote/post-quote.component';
import { PostTextComponent } from './components/post-components/post-text/post-text.component';
import { PostTitleComponent } from './components/post-components/post-title/post-title.component';
import { PostVideoComponent } from './components/post-components/post-video/post-video.component';
import { ResponsiveMenuComponent } from './components/responsive-menu/responsive-menu.component';
import { PostReblogsComponent }
from './components/post-components/post-reblogs/post-reblogs.component';
import { PostRepliesComponent }
from './components/post-components/post-replies/post-replies.component';
import { FullscreenService } from './shared/fullscreen.service';
import { SubPostSwitchDirective } from './attribute-directives/sub.post.switch.directive';

@NgModule({
    declarations: [AppComponent, SidebarComponent, SettingsComponent, PostListComponent,
        PostComponent, PostAnswerComponent, PostAudioComponent, PostCaptionComponent,
        PostChatComponent, PostLinkComponent, PostMetaComponent, PostPhotoComponent,
        PostQuoteComponent, PostTextComponent, PostTitleComponent, PostVideoComponent,
        EmbedBehaviourDirective, PostSwitchDirective, SubPostSwitchDirective,
        TumblrEmbeddedImageDirective, TumblrImageDirective, TumblrLinkDirective,
        VideoBehaviourDirective, ResponsiveMenuComponent, PostReblogsComponent,
        PostRepliesComponent],
    imports: [BrowserModule, RouterModule.forRoot(ROUTES), FormsModule, HttpModule, JsonpModule,
        InfiniteScrollModule, HotkeyModule.forRoot()],
    providers: [Title, TumblrService, SettingsService, CustomSanitizationService,
        FaviconService, HtmlItemSwitch, BlogItemSwitch, FullscreenService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
