@extends('layouts.app')

@section('title', 'Admin: Posts')

@section('content')
    <table class="table table-hover align-middle bg-white border text-secondary">
        <thead class="table-primary text-secondary small">
            <tr>
                <th></th>
                <th></th>
                <th>CATEGORY</th>
                <th>OWNER</th>
                <th>CREATED AT</th>
                <th>STATUS</th>
                <th></th>
            </tr>
            <tbody>
                @forelse ($all_posts as $post)
                    <tr>
                        <td class="text-end">{{ $post->id }}</td>
                        <td>
                            <a href="{{ route('post.show', $post->id) }}">
                                <img src="{{ $post->image }}" alt="post id {{ $post->id }}" class="d-block mx-auto image-lg">
                            </a>
                        </td>
                        <td>
                            @forelse ($post->categoryPost as $category_post)
                                <span class="badge bg-secondary bg-opacity-50">{{ $category_post->category->name }}</span>
                            @empty
                                <div class="badge text-dark text-wrap">Uncategorized</div>
                            @endforelse
                            {{-- @foreach ($post->categoryPost as $category_post)
                                <span class="badge bg-secondary bg-opacity-50">{{ $category_post->category->name }}</span>
                            @endforeach --}}
                        </td>
                        <td>
                            <a href="{{ route('profile.show', $post->user->id) }}" class="text-decoration-none text-secondary">{{ $post->user->name }}</a>
                        </td>
                        <td>{{ $post->created_at }}</td>
                        <td>
                            @if ($post->trashed())
                                <i class="fa-solid fa-circle text-secondary"></i> Hidden
                            @else
                                <i class="fa-solid fa-circle text-primary"></i> Visible
                            @endif

                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-sm" data-bs-toggle="dropdown">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                                <div class="dropdown-menu">
                                    @if ($post->trashed())
                                        <button class="dropdown-item text-secondary" data-bs-toggle="modal" data-bs-target="#unhide-post-{{ $post->id }}">
                                            <i class="fa-solid fa-eye"></i> Unhide post {{ $post->id }}
                                        </button>
                                    @else
                                        <button class="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#hide-post-{{ $post->id }}">
                                            <i class="fa-solid fa-eye-slash"></i> Hide post {{ $post->id }}
                                        </button>
                                    @endif
                                </div>
                            </div>
                            @include('admin.posts.modal.status')
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7">No Post Found</td>
                    </tr>
                @endforelse
            </tbody>
        </thead>
    </table>
    <div class="d-flex justify-content-center">
        {{ $all_posts->links() }}
    </div>
@endsection
