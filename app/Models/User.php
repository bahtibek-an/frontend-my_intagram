<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'profile_picture',
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

    public  function posts(){
        return $this->hasMany(Post::class);
    }
    public  function friends(){
        return $this->hasMany(Friend::class);
    }
    public function friend_two()
    {
        return $this->hasMany(Friend::class, 'friend_id', 'id');
    }
    public function friend_requests_sent()
    {
        return $this->hasMany(Friend_request::class, 'sender_id', 'id');
    }

    public function friend_requests_received()
    {
        return $this->hasMany(Friend_request::class, 'receiver_id', 'id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'user_id', 'id');
    }
    public function dislikes()
    {
        return $this->hasMany(Dislike::class, 'user_id', 'id');
    }
    public function has_liked( Post $post)
    {
        return $this->likes()->where('post_id', $post->id)->exists();
    }
    public function has_disliked( Post $post)
    {
        return $this->dislikes()->where('post_id', $post->id)->exists();
    }
    public function members()
    {
        return $this->hasMany(Member::class, 'user_id', 'id');
    }
    public function conversations(): BelongsToMany
    {
        return $this->belongsToMany(Conversation::class, 'members', 'user_id', 'conversation_id');
    }


}
