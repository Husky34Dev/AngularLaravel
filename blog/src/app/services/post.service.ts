
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api/posts'; // URL de tu API Laravel

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


/*
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Primer Post',
      content: 'Este es el contenido del primer post.',
      author: 'Autor Uno',
      datePosted: new Date('2023-04-01')
    },
    {
      id: 2,
      title: 'Segundo Post',
      content: 'Este es el contenido del segundo post.',
      author: 'Autor Dos',
      datePosted: new Date('2023-04-02')
    }
  ];

  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(this.posts);

  constructor() { }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  addPost(post: Post): void {
    this.posts.push(post);
    this.postsSubject.next(this.posts);
  }

  getPostById(id: number): Observable<Post> {
    const post = this.posts.find(p => p.id === id);
    return new Observable(observer => {
      observer.next(post);
      observer.complete();
    });
  }

  updatePost(id: number, updatedPost: Post): void {
    const index = this.posts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.posts[index] = { ...updatedPost, id };
      this.postsSubject.next(this.posts);
    }
  }

  deletePost(id: number): void {
    this.posts = this.posts.filter(p => p.id !== id);
    this.postsSubject.next(this.posts);
  }
}
*/

