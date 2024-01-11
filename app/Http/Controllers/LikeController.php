<?php

namespace App\Http\Controllers;

use App\Models\Dislike;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Termwind\Components\Li;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function storeLike(Request $request)
    {

        $post = Post::where('id', $request->post_id)->first();
        if (!auth()->user()->has_liked($post)) {
            if(auth()->user()->has_disliked($post)){
                $this->removeDislike($request);
            }
            $like = new Like();
            $like->user_id = auth()->user()->id; // Assuming `user_id` is an integer column
            $like->post_id = $request->post_id;
            $like->save();
        }
        return back();
    }

    public function removeLike(Request $request)
    {
        $post = Post::where('id', $request->post_id)->first();
        if (auth()->user()->has_liked($post)) {
            $like = Like::where('user_id', auth()->user()->id);
            $like->delete();
        }
        return back();
    }

    public function removeDislike(Request $request)
    {
        $post = Post::where('id', $request->post_id)->first();


        if (auth()->user()->has_disliked($post)) {
            $like = Dislike::where('user_id', auth()->user()->id);
            $like->delete();
        }
        return back();
    }


    public function storeDislike(Request $request)
    {
        $post = Post::where('id', $request->post_id)->first();
        if (!auth()->user()->has_disliked($post)) {
            if(auth()->user()->has_liked($post)){
                $this->removeLike($request);
            }
            $dislike = new Dislike();
            $dislike->user_id = auth()->user()->id; // Assuming `user_id` is an integer column
            $dislike->post_id = $request->post_id;
            $dislike->save();
        }
        return back();
    }
}
