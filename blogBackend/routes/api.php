<?php
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;


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


//rutas con autenticación 

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('me', [AuthController::class, 'me']);
});


// En routes/api.php
Route::post('test-route', function () {
    return response()->json(['message' => 'Test route']);
});

//USUARIOS

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/names', [UserController::class, 'getName']);
Route::get('/users/emails', [UserController::class, 'getEmail']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);






