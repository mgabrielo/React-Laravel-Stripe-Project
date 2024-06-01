<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Feature1Controller;
use App\Http\Controllers\Feature2Controller;
use App\Http\Controllers\DashboardController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/credit/webhook', [CreditController::class, 'webhook'])->name('credit.webhook');

Route::middleware('auth')->group(function () {
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

Route::post('/credit/buy/{package}', [CreditController::class, 'buyCredits'])->name('credit.buy');
Route::get('/feature1/index', [Feature1Controller::class, 'index'])->name('feature1.index');
Route::post('/feature1/calculate', [Feature1Controller::class, 'calculate'])->name('feature1.calculate');
Route::get('/feature2/index', [Feature2Controller::class, 'index'])->name('feature2.index');
Route::post('/feature2/calculate', [Feature2Controller::class, 'calculate'])->name('feature2.calculate');
Route::get('/credit/index', [CreditController::class, 'index'])->name('credit.index');
Route::get('/credit/success', [CreditController::class, 'index'])->name('credit.success');
Route::get('/credit/cancel', [CreditController::class, 'index'])->name('credit.cancel');
});

require __DIR__.'/auth.php';
