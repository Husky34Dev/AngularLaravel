<?php
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
//POSTS
Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::put('/posts/{id}', [PostController::class, 'update']);
Route::delete('/posts/{id}', [PostController::class, 'destroy']);


//COMENTARIOS
Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
Route::get('/posts/{postId}/comments', [CommentController::class, 'getCommentsForPost']);
Route::get('/comments', [CommentController::class, 'getAllComments']);

