import { Routes } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';

export const routes: Routes = [
    {path: 'reactive',component: ReactiveComponent},
    {path: 'template',component: TemplateComponent},
    {path: '**',component: TemplateComponent}
];
