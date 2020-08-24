<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Admin Routes

Route::post('/createTask', [
    'uses' => 'AdminController@createTask',
]);

Route::get('/fetchAllTask', [
    'uses' => 'AdminController@fetchAllTask',
]);

Route::get('/fetchRecentTask', [
    'uses' => 'AdminController@fetchRecentTask',
]);

Route::post('/deleteTask', [
    'uses' => 'AdminController@deleteTask',
]);

Route::post('/editTask', [
    'uses' => 'AdminController@editTask',
]);





