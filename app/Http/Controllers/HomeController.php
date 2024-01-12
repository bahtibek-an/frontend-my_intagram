<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Post; //this is the representation of the posts table
use App\Models\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

     private $post;
     private $user;

    public function __construct(Post $post, User $user)
    {
        $this->post = $post;
        $this->user = $user;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        //$all_posts = $this->post->latest()->get();
        //The same: "SELECT * FROM posts"

        $home_posts = $this->getHomePosts();
        $suggested_users = $this->getSuggestUsers();
        return view('users.home')
            ->with('home_posts', $home_posts)
            ->with('suggested_users', $suggested_users);
    }

    # Filter the homepage, so that it only displays
    # the posts of the users being followed by the Auth user
    ##### Get all the posts of the users that the Auth user is following ####
    public function getHomePosts(){
        $all_posts = $this->post->latest()->get(); //retrieved all the posts
        $home_posts = [];

        foreach ($all_posts as $post) {
            if ($post->user->isFollowed() || $post->user->id === Auth::user()->id) {
                $home_posts[] = $post;
            }
        }

        return $home_posts;

    }

    //This method is going to get all the users
    //that the user is not following
    public function getSuggestUsers(){
        $all_users = $this->user->all()->except(Auth::user()->id); // retrieved all the users but do not include the  logged in user
        $suggested_users = []; //A null array --- this will hold the suggested users later on

        foreach ($all_users as $user) {
            if (!$user->isFollowed()) {
                $suggested_users[] = $user;
            }
        }
        return $suggested_users;
    }

    public function search(Request $request){
        $users = $this->user->where('name', 'like', '%' . $request->search . '%')->get(); //% John %
        return view('users.search')->with('users', $users)->with('search', $request->search);
    }
}
