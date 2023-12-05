<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImagenController extends Controller
{
    public function store(Request $request)
    {
        $imagen = $request->file('file');

        // Generate a unique filename
        $nombreImagen = Str::uuid() . "." . $imagen->getClientOriginalExtension();

        // Store the file in the storage/app/public/uploads directory
        Storage::putFileAs('public/uploads', $imagen, $nombreImagen);

        return response()->json(['imagen' => $nombreImagen]);
    }
}
