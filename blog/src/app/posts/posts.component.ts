import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  //esto es una inyección de dependencias, posts necesita del servicio PostService
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  deletePost(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
      });
    }
  }

  editPost(id: number): void {
    this.router.navigate(['/edit', id]);
  }
  back():void{
    this.router.navigate(['']);
  }
}
