<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    public function store(Request $request, User $user, Post $post)
    {
        $this->validate($request, [
            'comentario' => 'required|max:150',
        ]);

        Comentario::create([
            'user_id' => auth()->user()->id,
            'post_id' => $post->id ,
            'comentario' => $request->comentario,
        ]);

        return back()->with('mensaje', 'Comment Done Correctly');
    }
}
