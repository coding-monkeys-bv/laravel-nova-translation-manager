<?php

use Illuminate\Support\Facades\Route;

Route::namespace('Voicecode\NovaTranslationManager\Http\Controllers')->group(function () {
    // Groups Routes.
    Route::delete('groups/{group}', 'GroupsController@destroy')->where(['group' => '[a-z0-9-]+']);
    Route::resource('groups', 'GroupsController');

    // Locales Routes.
    // Route::delete('locales/{locale}', 'LocalesController@destroy')->where(['locale' => '[a-zA-Z0-9-]+']);

    Route::resource('locales', 'LocalesController');

    // Translations Routes.
    Route::post('translations/export', 'TranslationsController@export');
    Route::post('translations/fix/group', 'TranslationsController@fixGroup');
    Route::post('translations/fix', 'TranslationsController@fix');
    Route::post('translations/import', 'TranslationsController@import');
    Route::put('translations/key', 'TranslationsController@updateKey');
    Route::get('translations/{group}/{subgroup?}', 'TranslationsController@show');
    Route::delete('translations/{group}/{key}', 'TranslationsController@destroy')->where(['group' => '[a-z0-9-]+'])->where(['key' => '[a-z0-9-]+']);
    Route::resource('translations', 'TranslationsController');
});
