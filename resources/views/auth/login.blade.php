<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instagram | Login</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #fafafa;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background-color: #fff;
            border: 1px solid #dbdbdb;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 400px;
            text-align: center;
            border-radius: 10px;
        }

        .logo {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .logo img {
            width: 150px;
        }

        .input-group {
            margin-bottom: 20px;
        }

        .input-group input {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            box-sizing: border-box;
            border: 1px solid #dbdbdb;
            border-radius: 5px;
            font-size: 16px;
        }

        .login-button {
            color: #2684f4;
            border: 2px solid #2684f4;
            background-color: #fff;
            padding: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            border-radius: 5px;
            display: flex;
            justify-content: flex-start;
        }

        .login-button:hover {
            background-color: #2684f4;
            color: white;
        }

        .separator {
            margin: 20px 0;
            border-bottom: 1px solid #dbdbdb;
        }

        .forgot-password {
            margin-top: 2px;
            margin-left: 10px;
            font-size: 14px;
            color: #003569;
            display: block;
        }

        .error-message {
            color: #ed4956;
            margin-top: 20px;
        }

        @media only screen and (max-width: 600px) {
            .login-container {
                width: 90%;
            }
        }
    </style>
</head>

<body>
    <div class="login-container">

        <div class="logo">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram Logo">
        </div>
        <form class="mt-8 space-y-4" action="{{ route('login') }}" method="POST" novalidate>
            @csrf
            <div class="input-group">
                <input value="{{ old('email') }}" name="email" type="email" placeholder="Email" inputmode="email"
                    required>
            </div>
            <div class="input-group">
                <input name="password" type="password" placeholder="Password" required>
            </div>
            <button type="submit" class="login-button">Login</button>
        </form>
        <div class="separator"></div>

        <p style="display: flex; margin-top: 10px; align-items: center; justify-content: center;">
            Don't have account, yet?<a href="{{ route('register') }}" class="forgot-password"> Register</a>
        </p>

        <div class="error-message">{{ session('errorMessage') }}</div>
    </div>
</body>

</html>
