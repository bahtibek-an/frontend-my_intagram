<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;
    const ADMIN_ROLE_ID = 1;
    const USER_ROLE_ID = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    # 1 to many relationship
    # Use this method to get all the posts of a user
    public function posts(){
        return $this->hasMany(Post::class)->latest();
    }

    # Use this method to get the follower of a user
    public function followers(){
        return $this->hasMany(Follow::class, 'following_id');
        # in follows table: follower_id --> is the follower
        # in follows table: following_id --> is the user being followed

    }

    # Use this method to get all the followers that the user is following
    public function following(){
        return $this->hasMany(Follow::class, 'follower_id');
        # in follows table: follower_id --> is the follower
        # in follows table: following_id --> is the user being followed
    }

    public function isFollowed(){ //true or false
        return $this->followers()->where('follower_id', Auth::user()->id)->exists();
        # Auth::user()->id is the follower
        # First, get all the followers of the user ( $this->followers() ). Then, from
        # that lists, search for the Auth USER from the follower column ( follower_id )
        # using the ( where('follower_id', Auth::user()->id) )
    }



    # Users table
    # id         name
    # 1          John Smith
    # 2          David Monroe
    # 3          Tim Watson

    # Follows table
    # follower_id          following_id
    # 1                          2
    # 1                          3
    # 3                          1
    # 3                          2
}
