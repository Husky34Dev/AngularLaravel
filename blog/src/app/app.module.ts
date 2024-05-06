// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Combina ambos
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'; // Rutas de la aplicación

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { NavComponent } from './nav/nav.component';
import { CommentsComponent } from './comments/comments.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    PostEditorComponent,
    NavComponent,
    CommentsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,               // Soporte para aplicaciones web en el navegador
    ReactiveFormsModule,         // Soporte para formularios reactivos
    FormsModule,                 // Soporte para formularios con ngModel
    HttpClientModule,            // Para manejar solicitudes HTTP
    AppRoutingModule             // Módulo de rutas
  ],
  providers: [],                 // Añade servicios o guards aquí si es necesario
  bootstrap: [AppComponent]      // Componente raíz que inicia la aplicación
})
export class AppModule { }
