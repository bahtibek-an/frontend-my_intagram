<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function __invoke()
    {
        $ids = Auth()->user()->followers->pluck('id')->toArray();
        $ids[] = Auth()->user()->id;
        $posts = Post::whereIn('user_id', $ids)->latest()->paginate(20);
        $users = User::get();

        return view('home', [
            'posts' => $posts,
            'users' => $users
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        $results = User::where('username', 'like', '%' . $query . '%')->take(5)->get();

        return response()->json($results);
    }
}
