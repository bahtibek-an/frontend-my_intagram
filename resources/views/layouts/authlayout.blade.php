<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Title --}}
    <title>{{ config('app.name', 'Relax') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Styles -->
    {{-- <link href="{{ asset('css/app.css') }}" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="{{ asset('css/util.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ asset('css/main.css') }}"> --}}
</head>
<body>
    @yield('form')
    {{-- <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form method="POST" action="{{ route('login') }}" class="login100-form validate-form">
                    @csrf
					<span class="login100-form-title p-b-34">
						Account Login
					</span>

					<div class="wrap-input100 validate-input m-b-20" data-validate="Type user name">
						<input id="email" class="input100 @error('email') alert-validate @enderror" type="email" name="email" placeholder="Email">
						<span class="focus-input100"></span>

                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
					</div>


					<div class="wrap-input100 validate-input m-b-20" data-validate="Type password">
						<input id="password" class="input100 @error('password') alert-validate @enderror" type="password" name="password" placeholder="Password">
						<span class="focus-input100"></span>

                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
					</div>

					<div class="container-login100-form-btn">
						<button type="submit" class="login100-form-btn">
							Sign in
						</button>
					</div>

					<div class="w-full text-center p-t-27 p-b-239">
                        @if (Route::has('password.request'))
                            <span class="txt1">
                                Forgot
                            </span>

                            <a href="{{ route('password.request') }}" class="txt2">
                                User name / password?
                            </a>
                        @endif
					</div>

					<div class="w-full text-center">
                        <a href="{{ route('register') }}">
							Sign Up
						</a>
					</div>
				</form>

					@yield('form')

				<div class="login100-more" style="background-image: url('{{ asset('img/bg-01.jpg') }}');"></div>
			</div>
		</div>
	</div>

	<script>

		document.querySelector('.login100-form').addEventListener('submit', function(e){
			var error = document.querySelector('.is-invalid');
			if(error) hideLoading();
			showLoading();
		})

		function showLoading() {
			document.querySelector('.spinner-border').classList.remove('d-none')
		}

		function hideLoading() {
			document.querySelector('.spinner-border').classList.add('d-none')
		}

	</script> --}}
</body>
</html>
