<div>
    @auth()
        <form action="{{ route('ideas.comments.store', $idea->id) }}" method="POST">
            @csrf
            <button type="button" class="btn btn-secondary btn-md" onclick="addEmoji('😊')">😊</button>
            <button type="button" class="btn btn-secondary btn-md" onclick="addEmoji('😂')">😂</button>
            <button type="button" class="btn btn-secondary btn-md" onclick="addEmoji('🔥')">🔥</button>
            <button type="button" class="btn btn-secondary btn-md" onclick="addEmoji('😎')">😎</button>
            <div class="mb-3">
                <div class="input-group">
                    <textarea name="content" id="comment-content" class="fs-6 form-control" rows="1"></textarea>
                </div>
            </div>
            <div>
                <button type="submit" class="btn btn-primary btn-sm">Post Comment</button>
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
    @endauth
    <hr>
    @forelse ($idea->comments as $comment)
        <div class="d-flex align-items-start">
            <img style="width:30px; height: 30px;" class="me-2 avatar-sm rounded-circle" src="{{ $comment->user->getImageURL() }}"
                alt="{{ $comment->user->name }}">
            <div class="w-100">
                <div class="d-flex justify-content-between">
                    <h6 class=""> {{ $comment->user->name }}
                    </h6>
                    <small class="fs-6 fw-light text-muted"> {{ $comment->created_at->diffForHumans() }}</small>
                </div>
                <p class="fs-6 mt-3 fw-light">
                    {{ $comment->content }}
                </p>
            </div>
        </div>
    @empty
        <p class="text-center mt-4">No Comments Found.</p>
    @endforelse
</div>
