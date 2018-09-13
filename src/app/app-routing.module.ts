import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstRunComponent } from './components/first-run/first-run.component';
import { PosComponent } from './components/pos/pos.component';

const routes: Routes = [
    {
        path: '',
        component: PosComponent
    },
    {
      path: 'first-run',
      component: FirstRunComponent
    },
    {
      path: 'pos',
      component: PosComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
