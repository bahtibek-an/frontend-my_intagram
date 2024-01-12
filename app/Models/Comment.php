<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    # One to many inverse relationship ( belongsTo() )
    # Use this method to get the owner of the comment
    public function user(){
        return $this->belongsTo(User::class)->withTrashed();
    }

}
