// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // Rutas de autenticación
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas para publicaciones
  { path: '', component: PostsComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'edit/:id', component: PostEditorComponent },
  { path: 'create', component: PostEditorComponent },

  // Redirigir cualquier otra ruta al login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
