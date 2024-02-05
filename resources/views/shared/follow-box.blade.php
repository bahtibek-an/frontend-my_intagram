<div class="card mt-3">
    <div class="card-header pb-0 border-0">
        <h5 class="">following recomandation</h5>
    </div>
    <div class="card-body">
        @auth
            @forelse ($usersToFollow as $user)
                <div class="hstack gap-2 mb-3">
                    <div class="avatar">
                        <a href="{{ route('users.show', $user->id) }}">
                            <img class="avatar-img rounded-circle" style="width: 25px; height: 25px;"
                                src="{{ $user->getImageURL() }}" alt="{{ $user->name }}">
                        </a>
                    </div>
                    <div class="overflow-hidden">
                        <a class="h6 mb-0" href="{{ route('users.show', $user->id) }}">{{ $user->name }}</a>
                        <p class="mb-0 small text-truncate">{{ $user->username }}</p>
                    </div>
                    <a class="btn btn-primary-soft rounded-circle icon-md ms-auto"
                        href="{{ route('users.show', $user->id) }}">
                        <i class="fa-solid fa-plus"></i>
                    </a>
                </div>
            @empty
                <p>No users to follow.</p>
            @endforelse
        @endauth
    </div>
</div>
