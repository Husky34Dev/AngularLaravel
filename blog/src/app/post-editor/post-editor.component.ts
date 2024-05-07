import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service'; // Importa AuthService

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  postForm!: FormGroup;
  postId: number | undefined;
  userAuthenticated: boolean = false; // Variable para almacenar el estado de autenticación

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Inyecta AuthService
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.postId = +id;
        this.loadPost(this.postId);
      }
    });

    // Verifica el estado de autenticación al inicializar el componente
    this.authService.isAuthenticated().subscribe(authenticated => {
      this.userAuthenticated = authenticated;
    });
  }

  private initForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required)
    });
  }

  loadPost(id: number) {
    this.postService.getPostById(id).subscribe(post => {
      this.postForm.patchValue(post);
    });
  }

  onSubmit() {
    if (this.userAuthenticated && this.postForm.valid) {
      const postData = this.postForm.value;
      if (this.postId) {
        // Si hay un ID de post, significa que estamos editando
        this.postService.updatePost(this.postId, postData).subscribe(() => {
          this.router.navigate(['/']); // Redirigir de vuelta a la lista de posts después de editar
        });
      } else {
        // Si no hay un ID de post, significa que estamos creando uno nuevo
        postData.datePosted = new Date();
        this.postService.addPost(postData).subscribe(() => {
          this.router.navigate(['/']); // Redirigir de vuelta a la lista de posts después de crear
        });
      }
    }
  }

  back(): void {
    this.router.navigate(['']);
  }
}
