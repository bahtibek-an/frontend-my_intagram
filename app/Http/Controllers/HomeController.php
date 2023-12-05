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
        $ids = Auth()->user()->followins->pluck('id')->toArray();
        $posts = Post::whereIn('user_id', $ids)->latest()->paginate(20);
        $users = User::get();
        
        return view('home', [
            'posts' => $posts,
            'users' => $users
        ]);
    }
}
