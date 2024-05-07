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
  newCommentName: string = '';
  newCommentEmail: string = '';
  newCommentContent: string = '';

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
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
    const newComment: Comment = {
      id: 0, // El id se generará en el servidor, por lo que aquí lo dejamos como cero
      post_id: postId,
      name: this.newCommentName,
      email: this.newCommentEmail,
      content: this.newCommentContent,
      createdAt: new Date() // Se puede ajustar según la lógica del servidor
    };

    this.postService.addCommentToPost(postId, newComment).subscribe((comment: Comment) => {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        if (!post.comments) {
          post.comments = [];
        }
        post.comments.push(comment);
      }

      this.newCommentName = '';
      this.newCommentEmail = '';
      this.newCommentContent = '';
    });
  }

  toggleComments(post: Post): void {
    post.showComments = !post.showComments;
  }
}
