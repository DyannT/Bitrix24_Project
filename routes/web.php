<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\ContactController;

Route::get('/', [EmployeeController::class, 'index'])->name('employees.index');
Route::get('/refresh', [EmployeeController::class, 'refresh'])->name('employees.refresh');
Route::get('/employee/{id}', [EmployeeController::class, 'show'])->name('employees.show');

Route::get('/oauth/install', [OAuthController::class, 'install'])->name('oauth.install');
Route::get('/oauth/callback', [OAuthController::class, 'callback'])->name('oauth.callback');

Route::resource('contacts', ContactController::class)->except(['show']);



