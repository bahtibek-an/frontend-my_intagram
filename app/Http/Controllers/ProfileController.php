<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    private $user;

    public function __construct(User $user){
        $this->user = $user;
    }

    # This edit method is going to retrieve all
    # the details of the user
    public function show($id){
        $user = $this->user->findOrFail($id);
               //SELECT * FROM users WHERE id = $id

        return view('users.profile.show')
            ->with('user', $user);
    }

    public function edit(){
        $user = $this->user->findOrFail(Auth::user()->id);
        return view('users.profile.edit')
            ->with('user', $user);
    }

    public function update(Request $request){
        $request->validate([
            'name'          => 'required|min:1|max:50',
            'email'         => 'required|email|max:50|unique:users,email,' . Auth::user()->id,
            'avatar'        => 'mimes:jpeg,jpg,png,gif|max:10048',
            'introduction'  => 'max:100'
        ]);

        $user           = $this->user->findOrFail(Auth::user()->id);
        $user->name     = $request->name;
        $user->email    = $request->email;
        $user->introduction = $request->introduction;

        if ($request->avatar) {
            $user->avatar = 'data:image/' . $request->avatar->extension() .
                            ';base64,' . base64_encode(file_get_contents($request->avatar));
        }

        $user->save();

        return redirect()->route('profile.show', Auth::user()->id);
    }

    public function followers($id)
    {
        $user = $this->user->findOrFail($id); //$id is the id of the user that we want to view
        return view('users.profile.followers')->with('user', $user);
    }

    public function following($id){
        $user = $this->user->findOrFail($id);
        return view('users.profile.following')->with('user', $user);
    }
}
