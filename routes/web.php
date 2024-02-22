<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ProfilesController;
use App\Http\Controllers\FollowsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\StoryController;

Auth::routes();

// Post Routes
Route::get('/', [PostsController::class, 'index'])->name('post.index');
Route::get('/p/create', [PostsController::class, 'create'])->name('post.create');
Route::post('/p', [PostsController::class, 'store'])->name('post.store');
Route::delete('/p/{post}', [PostsController::class, 'destroy'])->name('post.destroy');
Route::get('/p/{post}', [PostsController::class, 'show'])->name('post.show');
Route::post('/p/{post}', [PostsController::class, 'updatelikes'])->name('post.update'); // This needs more time
Route::get('/explore', [PostsController::class, 'explore'])->name('post.explore'); // Explore Page
Route::get('/posts', [PostsController::class, 'vue_index']); // Infinite scrolling

// Profile Routes
Route::get('/profile/{user}', [ProfilesController::class, 'index'])->name('profile.index');
Route::get('/profile/{user}/edit', [ProfilesController::class, 'edit'])->name('profile.edit');
Route::patch('/profile/{user}', [ProfilesController::class, 'update'])->name('profile.update');
Route::post('/search', [ProfilesController::class, 'search'])->name('profile.search'); // Search Page

// Follow Routes
Route::post('/follow/{user}', [FollowsController::class, 'store']);

// Comment Routes
Route::resource('comments', CommentController::class);

// Story Routes
Route::post('/stories', [StoryController::class, 'store'])->name('stories.store');
Route::get('/stories/create', [StoryController::class, 'create'])->name('stories.create');
Route::get('/stories/{user}', [StoryController::class, 'show'])->name('stories.show');

// Like Routes
Route::post('like/{like}', [LikeController::class, 'update2'])->name('like.create');




