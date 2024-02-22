@extends('layouts.app')

@section('content')

    <style>
        @media screen and (max-width: 767px) {
            .containerr {
                grid-template-columns: 0.1fr 1fr;
            }
        }

        @media screen and (width > 1023px) {
            .containerr {
                grid-template-columns: 0.3fr 1fr !important;
            }
        }

        @media screen and (width > 1279px) {
            .containerr {
                grid-template-columns: 0.2fr 1fr !important;
            }
        }
    </style>

    <div class=" px-4 flex items-center justify-center xl:justify-start h-full">

        {{-- Post  --}}
        @php
            $state = false;
        @endphp
        <div
            class="h-full w-full md:max-h-[600px] xl:max-h-[650px] xl:max-w-[70%] flex flex-col md:flex-row bg-white rounded-md shadow-xl border">

            <div class="flex md:hidden items-center justify-between border-b border-[#DBDBDB] !px-4 !py-3 w-full">

                <div class="flex gap-2 items-center">
                    <a href="/profile/{{ $post->user->username }}">
                        <img class="rounded-full h-[30px] w-[30px]"
                            src="{{ asset($post->user->profile->getProfileImage()) }}">
                    </a>

                    <a class="inline-flex text-xs font-bold" href="/profile/{{ $post->user->username }}">
                        <span class="">{{ $post->user->name }}</span>
                    </a>
                </div>

                <i class="fa-solid fa-ellipsis-h text-black text-lg mx-2 transition-all hover:scale-125"></i>

            </div>

            @if ($post->video)
                <div class="w-[100%] h-full bg-black flex justify-center">
                    <video controls class="h-full min-w-[200px] max-w-[500] px-4 self-center bg-black flex justify-center">
                        <source src="{{ asset("storage/$post->video") }}">
                    </video>
                </div>
            @else
                <div class="w-full bg-black flex justify-center md:max-w-[300px] md:max-w-[500px] md:rounded-l-md">
                    <div
                        class="h-full min-w-[200px] max-w-[500px] md:max-w-[300px] md:max-w-[500px] px-4 md:!px-0 self-center bg-black flex justify-center md:rounded-l-md">
                        <img class="object-contain h-full" src="/{{ $post->image_path }}">
                    </div>
                </div>
            @endif


            <div class="!pt-4 w-full ">
                <div class="hidden md:flex items-center justify-between border-b border-[#DBDBDB] !p-4 !pt-0 w-full">

                    <div class="flex gap-2 items-center">
                        <a href="/profile/{{ $post->user->username }}">
                            <img class="rounded-full h-[30px] w-[30px]"
                                src="{{ asset($post->user->profile->getProfileImage()) }}">
                        </a>

                        <a class="inline-flex" href="/profile/{{ $post->user->username }}">
                            <span class="text-xs font-bold">{{ $post->user->name }}</span>
                        </a>
                    </div>

                    <button type="button" class="PostActionsBtn relative" data-target="#PostActions{{ $post->id }}">

                        <div id="PostActions{{ $post->id }}"
                            class="modal-shadow bg-white absolute right-[35px] z-10 !rounded-lg Modal-Slide-Down">
                            <ul>
                                <li class="px-2 py-2 border-b bg-[#fbfbfb] transition-all hover:shadow rounded-t-lg">
                                    <a href="#"
                                        class="flex items-center justify-between text-xs font-light hover:font-semibold transition-all text-gray-900 no-underline">
                                        <p class="ml-3 mr-4 whitespace-nowrap">Unfollow</p>
                                    </a>
                                </li>
                                <li class="px-2 py-1 border-b bg-[#fbfbfb] transition-all hover:shadow">
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
                                <li class="px-2 py-2 bg-[#fbfbfb] hover:shadow transition-all rounded-b-lg">
                                    <a href="/p/{{ $post->id }}"
                                        class="flex items-center justify-between text-xs font-light hover:font-semibold transition-all text-gray-900 no-underline">
                                        <p class="ml-3 mr-4 whitespace-nowrap">Go to post</p>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <i class="fa-solid fa-ellipsis-h text-black text-lg mx-2 transition-all hover:scale-125"></i>
                    </button>


                </div>


                <div class="!p-2 flex flex-col gap-4 h-[calc(100%_-_211px)]">

                    {{-- Post Caption --}}

                    <div class="text-xs text-black flex items-center">
                        <a href="/profile/{{ $post->user->username }}" class="flex items-center gap-2">
                            <img class="rounded-full h-[30px] w-[30px]"
                                src="{{ asset($post->user->profile->getProfileImage()) }}">
                            <span class=""><strong>{{ $post->user->name }}</strong></span>
                        </a>

                        <span class="font-normal">&nbsp;{{ $post->caption }}</span>
                    </div>

                    {{-- Post Comments --}}

                    <div class="flex flex-col gap-4">
                        @foreach ($post->comments as $comment)
                            <div class="text-xs text-black flex items-center">
                                <a href="/profile/{{ $comment->user->username }}" class="flex items-center gap-2">
                                    <img class="rounded-full h-[30px] w-[30px]"
                                        src="{{ asset($comment->user->profile->getProfileImage()) }}">
                                    <span class=""><strong>{{ $comment->user->name }}</strong></span>
                                </a>
                                <span class="font-normal">&nbsp;{{ $comment->body }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="border-t border-[#DBDBDB]">
                    <div class="!px-2">

                        <!-- Icons Container -->
                        <div>
                            <div class="text-xs flex gap-4">
                                <form method="POST"
                                    action="{{ action('App\Http\Controllers\LikeController@update2', ['like' => $post->id]) }}">
                                    @csrf
                                    @if (true)
                                        <input id="inputid" name="update" type="hidden" value="1">
                                    @else
                                        <input id="inputid" name="update" type="hidden" value="0">
                                    @endif

                                    @if ($post->like->isEmpty())
                                        <button type="submit" class="btn pl-0">
                                            <i class="far fa-heart fa-2x transition-all hover:scale-110"></i>
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

                            <!-- Post Timing -->

                            @if (count($post->like->where('State', true)) > 0)
                                <span>
                                    <strong>{{ count($post->like->where('State', true)) }} likes</strong>
                                </span>
                            @endif
                            <p class="m-0"><small
                                    class="text-muted">{{ strtoupper($post->created_at->diffForHumans()) }}</small>
                            </p>
                        </div>

                    </div>

                    <div class="!p-1 text-[20px] flex items-center justify-between">

                        <form class="w-full flex items-center justify-between"
                            action="{{ action('App\Http\Controllers\CommentController@store') }}" method="POST">
                            @csrf
                           <div style="display: block;">
                            <button type="button" class="btn btn-sm"  onclick="addEmoji('😊')">😊</button>
                                        <button type="button" class="btn  btn-sm " onclick="addEmoji('😂')">😂</button>
                                        <button type="button" class="btn  btn-sm" onclick="addEmoji('🤣')">🤣</button>
                                        <button type="button" class="btn  btn-sm" onclick="addEmoji('😍')">😍</button>
                                        </div>
                            <input type="hidden" name="post_id" value="{{ $post->id }}">
                            <input type="hidden" name="redirect" value="show">
                            <textarea
                                class="caption border-0 !p-2 focus:outline-none !shadow-sm focus:!border-0 bg-[#e7e7e7] text-base rounded-md resize-none"
                                id="body" name="body" style="width: 83%;" placeholder="Write a comment.." rows="1"></textarea>
                            <button class="text-blue-500 font-semibold text-sm cursor-default" type="submit">Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

    {{-- More Posts --}}
    {{-- @if ($posts->count() > 0)
        <hr class="my-5">

        <div class="more">
            <h6 class="text-muted">More posts from
                <a href="/profile/{{ $post->user->username }}" class="text-dark text-decoration-none">
                    <strong> {{ $post->user->name }}</strong>
                </a>
            </h6>

            <div class="row">
                @foreach ($posts as $post)
                    <div class="col-4 col-md-4 mb-2  align-self-stretch">
                        <a href="/p/{{ $post->id }}">
                            <img class="img rounded" height="300" src="{{ asset("storage/$post->image") }}">
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    @endif --}}

    </div>
@endsection

@section('exscript')
    <script>
        function copyToClipboard(id) {
            var copyText = document.getElementById(id);
            navigator.clipboard.writeText(copyText.value);
        }
    </script>
@endsection
