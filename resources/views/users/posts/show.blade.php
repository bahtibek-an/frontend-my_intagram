@extends('layouts.app')

@section('title', 'Show Post')

@section('content')
    <style>
        .col-4 {
            overflow-y: scroll;
        }

        .card-body {
            position: absolute;
            top: 65px;
        }

        .emoji-button {
            cursor: pointer;
            border: none;
            background: none;
            font-size: 20px;
        }

        /* Style for the emoji picker container */
        .emoji-picker {
            z-index: 1000;
            display: none;
            position: absolute;
            right: 4;
            left: 3;
            padding: 10px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .emoji-picker button {
            cursor: pointer;
            border: none;
            background: none;
            font-size: 22px;
            display: inline-block;
            padding: 2px;
            transition: transform 0.2s ease-in-out;
        }

        .emoji-picker button:hover {
            transform: scale(1.2);
        }
    </style>

    <div class="row border shadow">
        <div class="col p-0 border-end">
            <img src="{{ $post->image }}" alt="post id {{ $post->id }}" class="w-100">
        </div>
        <div class="col-4 px-0 bg-white">
            <div class="card border-0">
                <div class="card-header bg-white py-3">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <a href="{{ route('profile.show', $post->user->id) }}">
                                @if ($post->user->avatar)
                                    <img src="{{ $post->user->avatar }}" alt="{{ $post->user->name }}"
                                        class="rounded-circle avatar-sm">
                                @else
                                    <i class="fa-solid fa-circle-user text-secondary icon-sm"></i>
                                @endif
                            </a>
                        </div>
                        <div class="col ps-0">
                            <a href="{{ route('profile.show', $post->user->id) }}"
                                class="text-decoration-none text-dark">{{ $post->user->name }}</a>
                        </div>
                        <div class="col-auto">
                            <div class="dropdown">
                                @if (Auth::user()->id === $post->user->id)

                                    <button class="btn btn-sm shadow-none" data-bs-toggle="dropdown">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>
                                    {{-- If the user is the OWNER of the post, then show the EDIT and DELETE button --}}

                                    <div class="dropdown-menu">
                                        <a href="{{ route('post.edit', $post->id) }}" class="dropdown-item">
                                            <i class="fa-regular fa-pen-to-square"></i> Edit
                                        </a>
                                        <button class="dropdown-item text-danger" data-bs-toggle="modal"
                                            data-bs-target="#delete-post-{{ $post->id }}">
                                            <i class="fa-regular fa-trash-can"></i> Delete
                                        </button>
                                    </div>
                                    @include('users.posts.contents.modals.delete')
                                @else
                                    @if ($post->user->isFollowed())
                                        <form action="{{ route('follow.destroy', $post->user->id) }}" method="post">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item text-danger">Following</button>
                                        </form>
                                    @else
                                        <form action="{{ route('follow.store', $post->user->id) }}" method="post">
                                            @csrf
                                            <button type="submit" class="dropdown-item text-danger">Follow</button>
                                        </form>
                                    @endif
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body w-100">
                    {{-- heart button + no. of likes + categories --}}
                    <div class="row align-items-center">
                        <div class="col-auto">
                            @if ($post->isLiked())
                                <form action="{{ route('like.destroy', $post->id) }}" method="post">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm shadow-none p-0"><i
                                            class="fa-solid fa-heart text-danger"></i></button>
                                </form>
                            @else
                                <form action="{{ route('like.store', $post->id) }}" method="post">
                                    @csrf
                                    <button type="submit" class="btn btn-sm shadow-none p-0"><i
                                            class="fa-regular fa-heart"></i></button>
                                </form>
                            @endif

                        </div>
                        <div class="col-auto px-0">
                            <span>{{ $post->likes->count() }}</span>
                        </div>
                        <div class="col text-end">
                            @forelse ($post->categoryPost as $category_post)
                                <span class="badge bg-secondary bg-opacity-50">{{ $category_post->category->name }}</span>
                            @empty
                                <div class="badge text-dark text-wrap">Uncategorized</div>
                            @endforelse
                            {{-- @foreach ($post->categoryPost as $category_post)
                                <div class="badge bg-secondary bg-opacity-50">
                                    {{ $category_post->category->name }}
                                </div>
                            @endforeach --}}
                        </div>
                    </div>
                    {{-- Owner + description --}}
                    <a href="{{ route('profile.show', $post->user->id) }}"
                        class="text-decoration-none text-dark fw-bold">{{ $post->user->name }}</a>
                    &nbsp;
                    <p class="d-inline fw-light">{{ $post->description }}</p>
                    <p class="text-uppercase text-muted xsmall mb-0">{{ date('M d, Y', strtotime($post->created_at)) }}</p>
                    <p class="text-muted xsmall">Posted {{ $post->created_at->diffForHumans() }}</p>

                    {{-- Include comments here --}}
                    <form action="{{ route('comment.store', $post->id) }}" method="post">
                        @csrf
                        <div class="input-group">
                            <!-- Emoji button to open emoji picker -->
                            <button type="button" class="emoji-button" onclick="toggleEmojiPicker()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-emoji-smile" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path
                                        d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                                </svg>
                            </button>

                            <!-- Your existing comment input -->
                            <textarea name="comment_body{{ $post->id }}" id="comment-body" class="form-control" style="height: 20px; border-radius: 5px;"
                                placeholder="Add comment here...">{{ old('comment_body' . $post->id) }}</textarea>

                            <button type="submit" class="btn btn-outline-secondary btn-sm">Post</button>
                        </div>
                        @error('comment_body' . $post->id)
                            <p class="text-danger small">{{ $message }}</p>
                        @enderror

                        <!-- Emoji picker container -->
                        <div class="emoji-picker" id="emoji-picker-container">
                            <button onclick="addEmojiToComment('😊')">😊</button>
                            <button onclick="addEmojiToComment('😍')">😍</button>
                            <button onclick="addEmojiToComment('👍')">👍</button>
                            <button onclick="addEmojiToComment('🎉')">🎉</button>
                            <button onclick="addEmojiToComment('🔥')">🔥</button>
                            <button onclick="addEmojiToComment('🤔')">🤔</button>
                            <button onclick="addEmojiToComment('😂')">😂</button>
                            <button onclick="addEmojiToComment('👏')">👏</button>
                            <button onclick="addEmojiToComment('❤️')">❤️</button>
                            <button onclick="addEmojiToComment('🙌')">🙌</button>
                        </div>
                    </form>


                    @if ($post->comments->isNotEmpty())
                        <ul class="list-groupt mt-2">
                            @foreach ($post->comments as $comment)
                                <li class="list-group-item border-0 p-0 mb-2">
                                    <a href="{{ route('profile.show', $comment->user->id) }}"
                                        class="text-decoration-none fw-bold text-dark">{{ $comment->user->name }}</a>
                                    &nbsp;
                                    <p class="d-inline fw-light">{{ $comment->body }}</p>

                                    <form action="{{ route('comment.destroy', $comment->id) }}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        <span
                                            class="text-uppercase text-muted small">{{ date('M d, Y', strtotime($comment->created_at)) }}</span>

                                        {{-- If the Auth user is the owner of the comment, then display the delete comment button --}}
                                        @if (Auth::user()->id === $comment->user->id)
                                            &middot;
                                            <button type="submit"
                                                class="btn border-0 bg-transparent text-danger p-0 small">Delete</button>
                                        @endif
                                    </form>
                                </li>
                            @endforeach
                        </ul>
                    @endif

                </div>
            </div>
        </div>
    </div>

    <script>
        function toggleEmojiPicker() {
            const emojiPickerContainer = document.getElementById('emoji-picker-container');
            emojiPickerContainer.style.display = emojiPickerContainer.style.display === 'none' ? 'block' : 'none';
        }

        function addEmojiToComment(emoji) {
            const commentInput = document.getElementById('comment-body');
            commentInput.value += emoji;
            const emojiPickerContainer = document.getElementById('emoji-picker-container');
            emojiPickerContainer.style.display = 'none';
        }
    </script>
@endsection
