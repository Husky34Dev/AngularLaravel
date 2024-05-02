import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  newCommentName: string = '';
  newCommentEmail: string = '';
  newCommentContent: string = '';
  
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
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

  back():void {
    this.router.navigate(['']);
  }

  addComment(postId: number): void {
    const newComment: Comment = {
      id: 0,
      postId: postId,
      name: this.newCommentName,
      email: this.newCommentEmail,
      content: this.newCommentContent,
      createdAt: new Date()
    };

    this.postService.addCommentToPost(postId, newComment).subscribe(comment => {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
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
