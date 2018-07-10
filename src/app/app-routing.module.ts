import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChannelsComponent }      from './channels/channels.component';
import { CategoryComponent } from './category/category.component';
import { GenreComponent } from './genre/genre.component';

const routes: Routes = [
  { path: '', redirectTo: '/channels', pathMatch: 'full' },
  { path: 'channels', component: ChannelsComponent },
  { path: 'channels/:category', component: CategoryComponent},
  { path: 'channels/:category/:genre', component: GenreComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
