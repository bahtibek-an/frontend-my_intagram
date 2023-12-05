<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function username()
    {
    return 'username';
    }

    public function store(Request $request) {

        $this->validate($request, [
            'username' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $ldap = true;

        if ($ldap) {
            if(!auth()->attempt($request->only('email','password','username'), $request->remember)) {
                return back()->with('mensaje', 'Incorrect Credentials');
            }
            return redirect()->route('posts.index', auth()->user()->username);
        } else {
            return back()->with('mensaje', 'Incorrect Credentials');
        };
    }
}
