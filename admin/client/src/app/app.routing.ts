import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }from './home/index';
import { UserComponent } from './user/index';
import { SkillComponent } from './skill/index';
import { ReportComponent } from './report/index';
import { LoginComponent } from './login/index';
import { FeedbackComponent } from './feedback/index';
import { NewsComponent } from './news/index';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'report', component: ReportComponent },
    { path: 'skill', component: SkillComponent },
    { path: 'user', component: UserComponent },
    { path: 'news', component: NewsComponent },
    // { path: 'logout', component: LogoutComponent },
    // { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
