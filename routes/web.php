<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/conversation', [\App\Http\Controllers\ConversationController::class, 'show'])->name('conversation.show');

Route::get('/conversation/{user:username}', [\App\Http\Controllers\ConversationController::class, 'index'])->name('conversation.index');
Route::post('/conversation/{user:username}/{conversation:id}', [\App\Http\Controllers\ConversationController::class, 'store'])
    ->name('conversation.store');

Route::post('/conversation/{user:username}', [\App\Http\Controllers\ConversationController::class, 'create'])
    ->name('conversation.create');



Route::get('/friend_requests', [\App\Http\Controllers\FriendRequestController::class, 'show'])->name('show_friend_requests');
Route::post('/friend_requests', [\App\Http\Controllers\FriendRequestController::class, 'store']);


Route::get('/register', [\App\Http\Controllers\RegisterController::class, 'index'])->name('register');
Route::post('/register', [\App\Http\Controllers\RegisterController::class, 'store'])->name('register.store');


Route::get('/feed', [\App\Http\Controllers\PostController::class, 'index'])->name('feed.index');
Route::get('/feed/create', [\App\Http\Controllers\PostController::class, 'create'])->name('feed.create');
Route::post('/feed/create', [\App\Http\Controllers\PostController::class, 'store'])->name('feed.store');

Route::post('/feed/{post:id}', [\App\Http\Controllers\PostController::class, 'destroy'])->name('feed.delete');


Route::get('/', [\App\Http\Controllers\LoginController::class, 'index'])->name('login');
Route::post('/', [\App\Http\Controllers\LoginController::class, 'store']);

Route::post('/logout', [\App\Http\Controllers\LogoutController::class, 'store'])->name('logout');

Route::post('/like', [\App\Http\Controllers\LikeController::class, 'storeLike'])->name('like');
Route::post('/dislike', [\App\Http\Controllers\LikeController::class, 'storeDislike'])->name('dislike');

Route::post('/remove_like', [\App\Http\Controllers\LikeController::class, 'removeLike'])->name('remove_like');
Route::post('/remove_dislike', [\App\Http\Controllers\LikeController::class, 'removeDislike'])->name('remove_dislike');


Route::post('/comment/create', [\App\Http\Controllers\CommentController::class, 'store'])->name('comment');





Route::get('/new_picture', [\App\Http\Controllers\ProfilePictureController::class, 'index'])->name('new_profile_picture.create');
Route::post('/new_picture', [\App\Http\Controllers\ProfilePictureController::class, 'store'])->name('new_profile_picture.store');

Route::get('/friends', [\App\Http\Controllers\FriendController::class, 'index'])->name('friends');

Route::post('/delete_friend', [\App\Http\Controllers\FriendController::class, 'delete'])->name('friends.delete');

Route::get('/search', [\App\Http\Controllers\AccountController::class, 'search'])->name('search');



Route::get('/{user:username}', [\App\Http\Controllers\AccountController::class, 'index'])->name('account');
Route::post('/{user:username}', [\App\Http\Controllers\FriendRequestController::class, 'create'])->name('friend_request');


Route::get('/feed/posts/{user:username}/{post:title}', [\App\Http\Controllers\PostController::class, 'show'])->name('feed.show');
