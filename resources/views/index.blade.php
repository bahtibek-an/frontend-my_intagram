@extends('layouts.app')

@section('content')

    <div class="container" style="margin-top: 70px;">
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
                                @if ($post->user_id == auth()->user()->id)
                                    <form
                                        action="{{ url()->action('App\Http\Controllers\PostsController@destroy', $post->id) }}"
                                        method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <input
                                            class="text-md font-light mr-3"
                                            type="submit" value="Delete" style="color: red">
                                    </form>
                                @endif


                            </div>
                        </div>

                        <!-- Card Image -->
                        <div class="js-post" ondblclick="showLike(this, 'like_{{ $post->id }}')">
                            <i class="fa fa-heart"></i>

                            <img class="card-img" src="{{ $post->image_path }}" alt="post image" style="max-height: 767px">
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
                            <span class="text-muted">Do you wanna write comment,</span> <a href="/p/{{ $post->id }}"
                                style="text-align: center; color: blue;">Click here!</a>

                        </div>

                    </div>

                @empty

                    <div class="d-flex justify-content-center">
                        <div class=" text-center">
                            <div class="card-body ">
                                <h3 style="font-size: 25px;">No Post found</h3>
                            </div>
                        </div>
                    </div>
                @endforelse


            </main>



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
