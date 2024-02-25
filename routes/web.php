<?php

use Illuminate\Support\Facades\Route;

Route::prefix('p')->group(function () {
    Route::get('/create', [App\Http\Controllers\PostsController::class, 'create'])->name('post.create');
    Route::post('/', [App\Http\Controllers\PostsController::class, 'store'])->name('post.store');
    Route::delete('/{post}', [App\Http\Controllers\PostsController::class, 'destroy'])->name('post.destroy');
    Route::get('/{post}', [App\Http\Controllers\PostsController::class, 'show'])->name('post.show');
    Route::post('/{post}', [App\Http\Controllers\PostsController::class, 'updatelikes'])->name('post.update');
});

Route::get('/', [App\Http\Controllers\PostsController::class, 'index'])->name('post.index');

Route::get('/posts', [App\Http\Controllers\PostsController::class, 'vue_index']);

Route::prefix('profile')->group(function () {
    Route::get('/{user}', [App\Http\Controllers\ProfilesController::class, 'index'])->name('profile.index');
    Route::get('/{user}/edit', [App\Http\Controllers\ProfilesController::class, 'edit'])->name('profile.edit');
    Route::patch('/{user}', [App\Http\Controllers\ProfilesController::class, 'update'])->name('profile.update');
});

Route::post('/search', [App\Http\Controllers\SearchController::class, 'search'])->name('profile.search');

Route::post('/follow/{user}', [App\Http\Controllers\FollowsController::class, 'store']);

Route::resource('comments', App\Http\Controllers\CommentController::class);

Route::post('like/{like}', [App\Http\Controllers\LikeController::class, 'update2'])->name('like.create');

Auth::routes();
