// comment.model.ts
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email:string;
  content: string;
  createdAt: Date;
}
