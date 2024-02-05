<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function index()
    {
        $ideas = Idea::latest();

        $usersToFollow = User::where('id', '!=', auth()->id())->limit(5)->get();

        $ideas = $ideas->when(request()->has('search'), function ($query) {
            return $query->where('content', 'like', '%' . request('search') . '%');
        });

        $users = User::when(request()->has('search'), function ($query) {
            return $query->where('name', 'like', '%' . request('search') . '%');
        })->limit(5)->get();

        return view('dashboard', [
            'ideas' => $ideas->paginate(5),
            'usersToFollow' => $usersToFollow,
            'users' => $users,
        ]);
    }
}
