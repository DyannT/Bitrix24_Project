<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

Route::get('/', [EmployeeController::class, 'index'])->name('employees.index');
Route::get('/refresh', [EmployeeController::class, 'refresh'])->name('employees.refresh');
Route::get('/employee/{id}', [EmployeeController::class, 'show'])->name('employees.show');

