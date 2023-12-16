<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:jpg,jpeg,png',
            'text' => 'required'
        ]);

        $post = $request->file('file');
        $text = $request->input('text');

        // Save the file to 'storage/app/public/files/' folder
        $path = $post->storeAs('public/files', $post->getClientOriginalName());

        // Get the URL of the stored file
        $url = Storage::url($path);

        Post::create([
            'file' => $post->getClientOriginalName(),
            'path' => $url, // Save the URL instead of the path
            'text' => $text,
            'user_id' => Auth::user()->id
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!empty($post->file)) {
            if (auth()->user()->id == $post->user_id) {

                // Use Storage facade to delete the file
                Storage::delete("public/files/{$post->file}");

                $post->delete();

                return response()->json(['message' => 'Post deleted successfully']);
            } else {
                return response()->json(['message' => 'You can delete only your posts'], 403);
            }
        }
    }
}
