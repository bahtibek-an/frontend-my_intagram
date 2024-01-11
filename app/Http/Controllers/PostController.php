<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Nette\Utils\Image;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('show');
    }

    public function index()
    {

        $posts = Post::orderBy('created_at', 'desc')->paginate(4);

        return view('feed.feed', ['posts' => $posts]);
    }

    public function create()
    {
        return view('feed.newpost');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => [
                'required',
                Rule::unique('posts')->where(function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                }),
            ],
            'description' => 'required',
            'picture' => 'image|required',
        ]);

        if ($request->hasFile('picture')) {
            $image = $request->file('picture');
            $extension = $image->getClientOriginalExtension();
            $filename = \Illuminate\Support\Str::uuid() . '.' . $extension;

            // Store the image in the 'public/posts' directory
            $path = $request->file('picture')->storeAs('public/posts', $filename);

            // You can also resize the image here if needed using Intervention Image

            Post::create([
                'title' => ucfirst(strtolower($request->title)),
                'description' => ucfirst(strtolower($request->description)),
                'cover' => $filename,
                'user_id' => auth()->user()->id
            ]);

            return redirect()->route('feed.index');
        } else {
            // Handle the case where no image was uploaded
        }
    }


    public function show(User $user, Post $post)
    {

        if (auth()->user()) {
            $has_liked = auth()->user()->has_liked($post);
            $has_disliked = auth()->user()->has_disliked($post);
        } else {
            $has_liked = null;
            $has_disliked = null;
        }
        return view('feed.specific_post', [
            'user' => $user,
            'post' => $post,
            'has_liked' => $has_liked,
            'has_disliked' => $has_disliked
            ,
            'comments' => $post->comments
        ]);
    }

    public function destroy(Post $post)
    {
        if ($post->user_id == auth()->user()->id) {
            $post->delete();
        }
        return redirect()->route('feed.index');
    }
}
