<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{

    public function getCommentsForPost($postId)
    {
        $comments = Comment::where('post_id', $postId)->get();
        return $comments;
    }
    public function getAllComments()
    {
        $comments = Comment::all();
        return $comments;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'name' => 'required',
            'email' => 'required|email',
            'content' => 'required',
        ]);

        return Comment::create($validatedData);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'content' => 'required',
        ]);
        $comment->update($validatedData);
        return $comment;
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json(null, 204);
    }
}
