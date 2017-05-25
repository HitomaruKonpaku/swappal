import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/index';
import { SearchComponent} from './search/index';
import { ContactUsComponent, AboutUsComponent, FAQsComponent} from './foundation/index';
import { News1Component,News2Component,News3Component,News4Component} from './news/index';
const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'search', component: SearchComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'faqs', component: FAQsComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'news1', component: News1Component },
    { path: 'news2', component: News2Component },
    { path: 'news3', component: News3Component },
    { path: 'news4', component: News4Component },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
