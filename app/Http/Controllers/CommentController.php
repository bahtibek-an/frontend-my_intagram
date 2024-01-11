<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'body' => ['required'],
            'post' => ['numeric']
        ]);
        $post = Post::find($request->post_id);

        if ($post) {
            $comment = new Comment();
            $comment->post_id = (int)$request->post_id;
            $comment->user_id = auth()->user()->id;
            $comment->body = $request->body;
            $comment->save();
        }
        return back();
    }
}
