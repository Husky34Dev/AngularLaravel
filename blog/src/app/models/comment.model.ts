// comment.model.ts
export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email:string;
  content: string;
  createdAt: Date;
}
