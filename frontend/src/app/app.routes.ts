import { Routes } from '@angular/router';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';

export const routes: Routes = [
    { path: 'about-us', component: AboutUsComponent, title: 'About Us' },
    { path: 'chatbox', component: ChatboxComponent, title: 'Chatbox' },
    { path: 'vocabulary', component: VocabularyComponent, title: 'Vocabulary' },
    { path: '**', component: AboutUsComponent },
];
