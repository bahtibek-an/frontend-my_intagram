<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Post extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'cover',
        'likes',
        'user_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        // Add any attributes you want to hide here
    ];
    public  function user(){
      return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }
    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id', 'id');
    }
    public function dislikes()
    {
        return $this->hasMany(Dislike::class, 'post_id', 'id');
    }

}
