@extends('layout.app')

@section('title', 'Dashboard')

@section('content')
    <div class="row">
        <div class="col-3">
            @include('shared.left-sidebar')
        </div>
        <div class="col-6">
            @include('shared.success-message')
            @include('ideas.shared.submit-idea')

            @forelse ($ideas as $idea)
                <div class="">
                    @include('ideas.shared.idea-card')
                </div>
            @empty
                <p class="text-center mt-4">No Results Found.</p>
            @endforelse

            <div class="mt-3">
                {{ $ideas->withQueryString()->links() }}
            </div>



        </div>
        <div class="col-3">
            @include('shared.search-bar')
            @include('shared.follow-box')
        </div>
    </div>
@endsection

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
