import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostEditorComponent } from './post-editor/post-editor.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'edit/:id', component: PostEditorComponent },
  { path: 'create', component: PostEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
