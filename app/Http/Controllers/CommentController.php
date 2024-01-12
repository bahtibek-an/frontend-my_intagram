<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    private $comment;

    public function __construct(Comment $comment){
        $this->comment = $comment;
    }

    #Method to insert the comment into the comments table
    public function store(Request $request, $post_id){
        $request->validate(
            [
            'comment_body' . $post_id  => 'required|max:150'
            ],
            [
                'comment_body' . $post_id . '.required' => 'You cannot submit an empty field.',
                'comment_body' . $post_id . '.max' => 'The comment must not have more than 150 characters.'
            ]
        );

        $this->comment->body    = $request->input('comment_body' . $post_id); //actual comments
        $this->comment->user_id = Auth::user()->id;   //owner of the comment
        $this->comment->post_id = $post_id;           //id of the post being commented
        $this->comment->save();                       //execute the save method

        return redirect()->back();                    // return to the previous page
    }

    public function destroy($id){
        $this->comment->destroy($id);
        //DELETE FROM comments WHERE id = $id

        return redirect()->back(); //return to the previous page
    }
}
