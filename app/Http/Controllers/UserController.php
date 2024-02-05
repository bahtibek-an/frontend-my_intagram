<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $ideas = $user->ideas()->paginate(5);
        $usersToFollow = User::where('id', '!=', auth()->id())->limit(5)->get();
        $search = request('search');
        $users = User::when($search, function ($query) use ($search) {
            return $query->where('name', 'like', '%' . $search . '%');
        })->limit(5)->get();

        return view('users.show', compact('user', 'ideas', 'usersToFollow', 'users'));
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $this->authorize('update', $user);
        $usersToFollow = User::where('id', '!=', auth()->id())->limit(5)->get();

        $search = request('search');
        $users = User::when($search, function ($query) use ($search) {
            return $query->where('name', 'like', '%' . $search . '%');
        })->limit(5)->get();
        $editing = true;
        $ideas = $user->ideas()->paginate(5);

        return view('users.edit', compact('user', 'editing', 'ideas', 'usersToFollow', 'users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $validated = $request->validated();

        if ($request->has('image')) {
            $imagePath = $request->file('image')->store('profile', 'public');
            $validated['image'] = $imagePath;

            Storage::disk('public')->delete($user->image ?? '');
        }

        $user->update($validated);

        return redirect()->route('profile');
    }


    public function profile()
    {
        $users = User::when(request()->has('search'), function ($query) {
            return $query->where('name', 'like', '%' . request('search') . '%');
        })->limit(5)->get();
        return $this->show(auth()->user());
    }
}
