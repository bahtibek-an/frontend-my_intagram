<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateIdeaRequest;
use App\Http\Requests\UpdateIdeaRequest;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;

class IdeaController extends Controller
{

    public function show(Idea $idea)
    {
        $users = User::when(request()->has('search'), function ($query) {
            return $query->where('name', 'like', '%' . request('search') . '%');
        })->limit(5)->get();
        $usersToFollow = User::where('id', '!=', auth()->id())->limit(5)->get();
        return view('ideas.show', compact('idea', 'usersToFollow', 'users'));
    }

    public function store(CreateIdeaRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageData = 'data:image/' . $image->extension() . ';base64,' . base64_encode(file_get_contents($image));
            $validated['image'] = $imageData;
        }

        $validated['user_id'] = auth()->id();

        Idea::create($validated);

        return redirect()->route('dashboard')->with('success', 'Post created successfully!');
    }

    public function destroy(Idea $idea)
    {
        $this->authorize('delete', $idea);

        $idea->delete();

        return redirect()->route('dashboard')->with('success', 'Post deleted successfully !');
    }

    public function edit(Idea $idea)
    {
        $users = User::when(request()->has('search'), function ($query) {
            return $query->where('name', 'like', '%' . request('search') . '%');
        })->limit(5)->get();
        $this->authorize('update', $idea);
        $usersToFollow = User::where('id', '!=', auth()->id())->limit(5)->get();

        $editing = true;

        return view('ideas.show', compact('idea', 'editing', 'usersToFollow', 'users'));
    }

    public function update(UpdateIdeaRequest $request, Idea $idea)
    {
        $this->authorize('update', $idea);

        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageData = 'data:image/' . $image->extension() . ';base64,' . base64_encode(file_get_contents($image));
            $validated['image'] = $imageData;
        }

        $idea->update($validated);

        return redirect()->route('ideas.show', $idea->id)->with('success', "Post updated successfully!");
    }
}
