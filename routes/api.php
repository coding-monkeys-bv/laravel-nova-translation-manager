<?php

use Illuminate\Support\Facades\Route;

Route::namespace('Voicecode\NovaTranslationManager\Http\Controllers')->group(function () {
    Route::delete('groups/{group}', 'GroupsController@destroy')->where(['video' => '[a-z0-9-]+']);
    Route::resource('groups', 'GroupsController');
    Route::get('locales', 'LocalesController@locales');
    Route::post('translations/export', 'TranslationsController@export');
    Route::put('translations/key', 'TranslationsController@updateKey');
    Route::delete('translations/{group}/{key}', 'TranslationsController@destroy')->where(['group' => '[a-z0-9-]+'])->where(['key' => '[a-z0-9-]+']);
    Route::resource('translations', 'TranslationsController');
});
