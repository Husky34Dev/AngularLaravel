<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'author' => 'required',
        ]);

        return Post::create($validatedData);
    }

    public function show($id)
    {
        return Post::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'author' => 'required',
        ]);
        $post->update($validatedData);
        return $post;
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(null, 204);
    }
}
