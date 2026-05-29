<?php

use Illuminate\Support\Facades\Route;

// Cualquier ruta que escribas (como /catalogo) cargará la vista principal de Vue
Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '.*');