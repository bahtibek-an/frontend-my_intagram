<div class="card">
    <div class="px-3 pt-4 pb-2">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <img style="width:35px; height: 35px;" class="me-2 avatar-sm rounded-circle"
                    src="{{ $idea->user->getImageURL() }}" alt="{{ $idea->user->name }}">
                <div>
                    <h5 class="mb-0 card-title"><a href="{{ route('users.show', $idea->user->id) }}">
                            {{ $idea->user->name }}
                        </a></h5>
                </div>
            </div>
            <div class="d-flex">
                <a href="{{ route('ideas.show', $idea->id) }}"> View </a>
                @auth()
                    @can('update', $idea)
                        <a class="mx-2" href="{{ route('ideas.edit', $idea->id) }}"> Edit </a>
                        <form method="POST" action="{{ route('ideas.destroy', $idea->id) }}">
                            @csrf
                            @method('delete')
                            <button class="ms-1 btn btn-danger btn-sm"> X </button>
                        </form>
                    @endcan
                @endauth
            </div>
        </div>
    </div>
    <div class="card-body">
        @if ($editing ?? false)
            <form action="{{ route('ideas.update', $idea->id) }}" method="post">
                @csrf
                @method('put')
                <div class="mb-3">
                    <textarea name="content" class="form-control" id="content" rows="3">{{ $idea->content }}</textarea>
                    @error('content')
                        <span class="mt-2 d-block fs-6 text-danger"> {{ $message }} </span>
                    @enderror
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label fw-bold">Image</label>
                    <input type="file" name="image" id="image" class="form-control"
                        aria-describedby="image-info">
                    <div class="form-text" id="image-info">
                        The acceptable formats are: jpeg,jpg,png and gif only.<br>
                        Maximum file size: 10048Kb.
                    </div>
                    @error('image')
                        <p class="text-danger small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="">
                    <button type="submit" class="mb-2 btn btn-dark btn-sm"> Update </button>
                </div>
            </form>
        @else
            <p class="fs-6 fw-light text-muted">
            <div class="col p-0 border-end">
                <img src="{{ $idea->image }}" alt="post id {{ $idea->id }}" class="w-100">
            </div>
            {{ $idea->content }}

            </p>
        @endif
        <div class="d-flex justify-content-between">
            @include('ideas.shared.like-button')
            <div>
                <span class="fs-6 fw-light text-muted"> <span class="fas fa-clock"> </span>
                    {{ $idea->created_at->diffForHumans() }} </span>
            </div>
        </div>
        @include('ideas.shared.comments-box')
    </div>
</div>
