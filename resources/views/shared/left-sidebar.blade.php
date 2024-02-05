<div class="card overflow-hidden">
    <div class="card-body pt-3">
        <ul class="nav nav-link-secondary flex-column fw-bold gap-2">
            <li class="nav-item">
                <a class="{{ (Route::is('dashboard')) ? 'text-white bg-primary rounded' : '' }} nav-link" href="{{ route('dashboard') }}">
                    <span>Home</span>
                </a>
            </li>
            @auth()
            <li class="nav-item">
                <a class="{{ (Route::is(['profile', 'users.edit'])) ? 'text-white bg-primary rounded' : '' }} nav-link" href="{{ route('profile') }}">
                    <span>Profile</span>
                </a>
            </li>
            
            <li>
                <a class="{{ (Route::is('#')) ? 'text-white bg-primary rounded' : '' }} nav-link" href="#" type="button" class="text-white bg-primary rounded nav-link" data-bs-toggle="modal" data-bs-target="#shareIdeaModal">
                    Create
            </a>
            </li>
            @endauth
        </ul>
    </div>
</div>

<div class="modal fade" id="shareIdeaModal" tabindex="-1" role="dialog" aria-labelledby="shareIdeaModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="shareIdeaModalLabel">Create Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @auth()
                    <form action="{{ route('ideas.store') }}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <textarea name="content" class="form-control" id="content" rows="3"></textarea>
                            @error('content')
                                <span class="d-block fs-6 text-danger mt-2"> {{ $message }} </span>
                            @enderror
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label fw-bold">Image</label>
                            <input type="file" name="image" id="image" class="form-control"
                                aria-describedby="image-info">
                            <div class="form-text" id="image-info">
                                The acceptable formats are: jpeg, jpg, png, and gif only.<br>
                                Maximum file size: 10048Kb.
                            </div>
                            @error('image')
                                <p class="text-danger small">{{ $message }}</p>
                            @enderror
                        </div>
                        <div class="">
                            <button type="submit" class="btn btn-dark"> Create </button>
                        </div>
                    </form>
                @endauth
                @guest()
                    <p>Login to Create Post.</p>
                @endguest
            </div>
        </div>
    </div>
</div>