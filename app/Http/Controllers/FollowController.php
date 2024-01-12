<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Follow;

class FollowController extends Controller
{
    private $follow;

    # Constructor
    public function __construct(Follow $follow){
        $this->follow = $follow;
    }

    # Store method to store the follower and the following id
    public function store($user_id){
        $this->follow->follower_id = Auth::user()->id; // follower
        $this->follow->following_id = $user_id;        // following -> user being followed
        $this->follow->save();                         // save the details to the Db

        return redirect()->back();
    }

    public function destroy($user_id)
    {
        $this->follow
            ->where('follower_id', Auth::user()->id)
            ->where('following_id', $user_id)
            ->delete();
        return redirect()->back();
    }
}
