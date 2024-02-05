<div class="card">
    <div class="card-header pb-0 border-0">
        <h5 class="">Search</h5>
    </div>
    <div class="card-body">
        <form action="{{ route('dashboard') }}" method="GET">
            <input value="{{ request('search', '') }}" name="search" placeholder="Search user..." class="form-control w-100"
                type="text">
            <button class="btn btn-dark mt-2"> Search</button>
        </form>
        @auth
            <h4 class="nav-link mt-2">Search Results</h4>
            @forelse ($users as $user)
                <div class="user-result mt-1">
                    <a href="{{ route('users.show', $user->id) }}">{{ $user->name }}</a>
                </div>
            @empty
                <p class="text-center mt-2">No Results Found.</p>
            @endforelse
        @endauth
    </div>

</div>

<style>
    .user-result {
        margin-bottom: 10px;
        padding: 10px;
        background-color: #f8f9fa;
        border: 1px solid #d6d8db;
        border-radius: 5px;
    }

    .user-result a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
    }
</style>
