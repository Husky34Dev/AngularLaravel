import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  userAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated: boolean) => { // Especificar el tipo booleano aquí
      this.userAuthenticated = authenticated;
      if (authenticated) {
        this.loadPosts();
      }
    });
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.loadCommentsForPosts();
    });
  }

  loadCommentsForPosts(): void {
    for (const post of this.posts) {
      this.postService.getCommentsForPost(post.id).subscribe(comments => {
        post.comments = comments;
      });
    }
  }

  editPost(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deletePost(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
      });
    }
  }

  addComment(postId: number): void {
    // Implementar la lógica para agregar comentarios
  }

  toggleComments(post: Post): void {
    post.showComments = !post.showComments;
  }
}
