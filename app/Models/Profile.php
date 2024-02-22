<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    // use HasFactory;
    protected $guarded = [];

    public function getProfileImage(){
        return ($this->image) ? "/storage/$this->image" : "img/default.png";
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
