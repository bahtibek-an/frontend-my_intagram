<style>
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

<div class="mt-3">
    {{-- Show all the comments here --}}
    @if ($post->comments->isNotEmpty())
        <hr>
        <ul class="list-group">
            @foreach ($post->comments->take(3) as $comment)
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

            @if ($post->comments->count() > 3)
                <li class="list-group-item border-0 px-0 pt-0">
                    <a href="{{ route('post.show', $post->id) }}" class="text-decoration-none small">View all
                        {{ $post->comments->count() }} comments</a>
                </li>
            @endif

        </ul>
    @endif

    <form action="{{ route('comment.store', $post->id) }}" method="post">
        @csrf
        <div class="input-group">
            <button type="button" class="emoji-button" onclick="toggleEmojiPicker()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-emoji-smile" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                </svg>
            </button>
            
            <textarea name="comment_body{{ $post->id }}" rows="1" style="border-radius: 5px;" class="form-control form-control-sm"
                placeholder="Add comment here...">{{ old('comment_body' . $post->id) }}</textarea>
            <button type="submit" class="btn btn-outline-secondary btn-sm">Post</button>
        </div>

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
