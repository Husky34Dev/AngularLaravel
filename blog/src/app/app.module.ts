import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    PostEditorComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
