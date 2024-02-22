@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row justify-content-center">
            {{-- Main section --}}
            <main class="main col-md-8 px-2 py-3 space-y-4">

                @forelse ($posts as $post)
                    @php
                        $state = false;
                    @endphp

                    <div class="max-w-[500px] mx-auto bg-white border rounded-md border-gray-300 shadow-md" id="prova">
                        <!-- Card Header -->
                        <div class="card-header d-flex justify-content-between align-items-center bg-white pl-3 pr-1 py-2">
                            <div class="d-flex align-items-center">
                                <a href="/profile/{{ $post->user->username }}">
                                    <img src="{{ asset($post->user->profile->getProfileImage()) }}"
                                        class="rounded-full  h-[35px] w-[35px] object-cover">
                                </a>
                                <a href="/profile/{{ $post->user->username }}" class="my-0 ml-3 text-sm font-semibold">
                                    {{ $post->user->name }}
                                </a>
                            </div>
                            <div>
                                <!-- Button trigger modal -->
                                <button type="button" class="PostActionsBtn relative"
                                    data-target="#PostActions{{ $post->id }}">

                                    <div id="PostActions{{ $post->id }}"
                                        class="modal-shadow bg-white absolute right-[35px] z-10 !rounded-lg scale-out-ver-top">
                                        <ul>
                                            <li
                                                class="px-4 py-2 border-b bg-[#fbfbfb] transition-all hover:shadow rounded-t-lg">
                                                <a href="#"
                                                    class="items-center justify-between inline-flex text-xs font-light hover:font-semibold transition-all text-gray-900 no-underline">
                                                    <p class="whitespace-nowrap">Unfollow</p>
                                                </a>
                                            </li>
                                            <li class="px-4 py-2 border-b bg-[#fbfbfb] transition-all hover:shadow">
                                                <form
                                                    action="{{ url()->action('App\Http\Controllers\PostsController@destroy', $post->id) }}"
                                                    method="POST">
                                                    @csrf
                                                    @method('DELETE')
                                                    <input
                                                        class="text-xs font-light hover:font-semibold transition-all w-full text-gray-900 no-underline"
                                                        type="submit" value="Delete">
                                                </form>
                                            </li>
                                            <li class="px-4 py-2 bg-[#fbfbfb] hover:shadow transition-all rounded-b-lg">
                                                <a href="/p/{{ $post->id }}"
                                                    class="flex items-center justify-between text-xs font-light hover:font-semibold transition-all text-gray-900 no-underline">
                                                    <p class="whitespace-nowrap">Go to post</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <i class="fa-solid fa-ellipsis-h text-lg mx-2 transition-all hover:scale-125"></i>
                                </button>

                            </div>
                        </div>

                        <!-- Card Image -->
                        <div class="js-post" ondblclick="showLike(this, 'like_{{ $post->id }}')">
                            <i class="fa fa-heart"></i>
                            
                            <img class="card-img" src="{{$post->image_path}}" alt="post image"
                                style="max-height: 767px">
                        </div>

                        <!-- Card Body -->
                        <div class="card-body px-3 py-2">

                            <div class="d-flex flex-row">
                                <form method="POST"
                                    action="{{ url()->action('App\Http\Controllers\LikeController@update2', ['like' => $post->id]) }}">
                                    @csrf
                                    @if (true)
                                        <input id="inputid" name="update" type="hidden" value="1">
                                    @else
                                        <input id="inputid" name="update" type="hidden" value="0">
                                    @endif

                                    @if ($post->like->isEmpty())
                                        <button type="submit" class="btn pl-0">
                                            <i class="far fa-heart fa-2x"></i>
                                        </button>
                                    @else
                                        @foreach ($post->like as $likes)
                                            @if ($likes->user_id == Auth::User()->id && $likes->State == true)
                                                @php
                                                    $state = true;
                                                @endphp
                                            @endif
                                        @endforeach

                                        @if ($state)
                                            <button type="submit" class="btn pl-0">
                                                <i class="fas fa-heart fa-2x transition-all hover:scale-110"
                                                    style="color:red"></i>
                                            </button>
                                        @else
                                            <button type="submit" class="btn pl-0">
                                                <i class="far fa-heart fa-2x transition-all hover:scale-110"></i>
                                            </button>
                                        @endif
                                    @endif

                                    <a href="/p/{{ $post->id }}" class="btn pl-0">
                                        <i class="far fa-comment fa-2x transition-all hover:scale-110"></i>
                                    </a>
                                </form>
                            </div>
                            <div class="flex-row">

                                <!-- Likes -->
                                @if (count($post->like->where('State', true)) > 0)
                                    <h6>
                                        <strong>{{ count($post->like->where('State', true)) }} likes</strong>
                                    </h6>
                                @endif

                                {{-- Post Caption --}}
                                <p class="my-1">
                                    <a href="/profile/{{ $post->user->username }}"
                                        class="my-0 text-dark text-decoration-none">
                                        <strong>{{ $post->user->name }}</strong>
                                    </a>
                                    {{ $post->caption }}
                                </p>

                                <!-- Comment -->
                                <div class="my-1.5">
                                    @if (count($post->comments) > 0)
                                        <a href="/p/{{ $post->id }}" class="text-muted">View all
                                            {{ count($post->comments) }} comments
                                        </a>
                                    @endif
                                    @foreach ($post->comments->sortByDesc('created_at')->take(2) as $comment)
                                        <p class="my-1"><strong>{{ $comment->user->name }}</strong>
                                            {{ $comment->body }}</p>
                                    @endforeach
                                </div>

                                <!-- Created At  -->
                                <p class="card-text text-muted">{{ $post->created_at->diffForHumans() }}</p>
                            </div>
                        </div>

                        <!-- Card Footer -->
                        <div class="card-footer bg-white">
                            <!-- Add Comment -->
                            <form action="{{ action('App\Http\Controllers\CommentController@store') }}" method="POST">
                                @csrf
                                <div class="form-group mb-0 text-muted">
                                    <button type="button" class="btn btn-secondary btn-sm m-1" style="border: 1px solid silver;" onclick="addEmoji('😊')">😊</button>
                                        <button type="button" class="btn btn-secondary btn-sm m-1" style="border: 1px solid silver;" onclick="addEmoji('😂')">😂</button>
                                        <button type="button" class="btn btn-secondary btn-sm m-1"style="border: 1px solid silver;" onclick="addEmoji('🤣')">🤣</button>
                                        <button type="button" class="btn btn-secondary btn-sm m-1" style="border: 1px solid silver;" onclick="addEmoji('😍')">😍</button>
                                    <div class="flex justify-center items-center">
                                        <input type="hidden" name="post_id" value="{{ $post->id }}">
                                        
                                        <textarea class="form-control border-1 focus:shadow-none resize-none overflow-hidden" id="comment-content" name='body'
                                            rows="1" cols="1" placeholder="Add a comment..."></textarea>
                                        <div class="input-group-append bg-white">
                                            <button type="submit"
                                                class="text-blue-500 ml-2 font-semibold text-sm cursor-default">
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <script>
            function addEmoji(emoji) {
                const textarea = document.getElementById('comment-content');
                textarea.value += emoji;
                document.getElementById('emoji-dropdown').classList.remove('show');
            }

            document.addEventListener('DOMContentLoaded', function() {
                const emojiButton = document.getElementById('emoji-button');
                const emojiDropdown = document.getElementById('emoji-dropdown');

                emojiButton.addEventListener('click', function(event) {
                    emojiDropdown.classList.toggle('show');
                    event.stopPropagation();
                });

                document.addEventListener('click', function() {
                    emojiDropdown.classList.remove('show');
                });
            });
        </script>

                        </div>

                    </div>

                @empty

                    <div class="d-flex justify-content-center p-3 py-5 border bg-white">
                        <div class="card border-0 text-center">
                            <img src="{{ asset('img/nopost.png') }}" class="card-img-top" alt="..."
                                style="max-width: 330px">
                            <div class="card-body ">
                                <h3>No Post found</h3>
                                <p class="card-text text-muted">We couldn't find any post, Try to follow someone</p>
                            </div>
                        </div>
                    </div>
                @endforelse

                {{-- <example-component></example-component> --}}
                <!-- Testin Infinite scrooling with vue -->

            </main>

            {{-- Aside Section --}}
            <aside class="aside col-md-4 py-3">
                <div class="position-fixed">

                    <!-- User Info -->
                    <div class="d-flex align-items-center mb-3">
                        <a href="/profile/{{ Auth::user()->username }}" style="width: 56px; height: 56px;">
                            <img src="{{ asset(Auth::user()->profile->getProfileImage()) }}"
                                class="rounded-circle w-100">
                        </a>
                        <div class='d-flex flex-column pl-3'>
                            <a href="/profile/{{ Auth::user()->username }}"
                                class='h6 m-0 text-dark text-decoration-none'>
                                <strong>{{ auth()->user()->username }}</strong>
                            </a>
                            <small class="text-muted ">{{ auth()->user()->name }}</small>
                        </div>
                    </div>

                    <!-- Suggestions -->
                    <div class='mb-4' style="width: 300px">
                        <h6 class='text-secondary'>Suggestions For You</h5>

                            <!-- Suggestion Profiles-->
                            @foreach ($sugg_users as $sugg_user)
                                @if ($loop->iteration == 6)
                                @break
                            @endif
                            <div class='suggestions py-2'>
                                <div class="d-flex align-items-center ">
                                    <a href="/profile/{{ $sugg_user->username }}" style="width: 32px; height: 32px;">
                                        <img src="{{ asset($sugg_user->profile->getProfileImage()) }}"
                                            class="rounded-circle w-100">
                                    </a>
                                    <div class='d-flex flex-column pl-3'>
                                        <a href="/profile/{{ $sugg_user->username }}"
                                            class='h6 m-0 text-dark text-decoration-none'>
                                            <strong>{{ $sugg_user->name }}</strong>
                                        </a>
                                        <small class="text-muted">New to Instagram </small>
                                    </div>
                                    <a href="/profile/{{ $sugg_user->username }}" class='ml-auto text-info text-decoration-none'>
                                        Follow
                                    </a>
                                </div>
                            </div>
                        @endforeach

                </div>

                <!-- CopyRight -->
                <div>
                    <span style='color: #a6b3be;'>© 2022 Relax </span>
                </div>

            </div>
        </aside>

    </div>
</div>

@endsection


@section('exscript')
<script>
    function copyToClipboard(id) {
        var copyText = document.getElementById(id);
        navigator.clipboard.writeText(copyText.value);
    }

    function showLike(e, id) {
        console.log("Like: ", id);
        var heart = e.firstChild;
        heart.classList.add('fade');
        setTimeout(() => {
            heart.classList.remove('fade');
        }, 2000);
    }
</script>
@endsection
