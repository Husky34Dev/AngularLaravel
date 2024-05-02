import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post = {
    id: 0,
    title: 'Default Title',
    content: 'Default content',
    author: 'Default Author',
    datePosted: new Date(),
    comments: [], // Inicializamos la propiedad comments como un array vacío
    showComments: false // Agregamos showComments e inicializamos como false
  }; 

  constructor() { }

  ngOnInit(): void {
  }
}
