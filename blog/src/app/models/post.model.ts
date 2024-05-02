import { Comment } from './comment.model';

export class Post {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public author: string,
        public datePosted: Date,
        public comments: Comment[] = [], // Inicializamos la propiedad comments como un array vacío
        public showComments: boolean = false // Inicializamos showComments como false por defecto
    ) {}
}
