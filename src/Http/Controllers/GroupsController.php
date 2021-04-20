<?php

namespace Voicecode\LaravelNovaTranslationsManager\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Voicecode\LaravelNovaTranslationsManager\Helpers\TranslationHelper;
use Voicecode\LaravelNovaTranslationsManager\Models\Translation;

class GroupsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $data = request()->validate([
            'group' => 'required|string|unique:ltm_translations,group',
        ]);

        // Convert group name into slug format.
        $group = TranslationHelper::slug($data['group']);

        // Get supported locales.
        $locales = TranslationHelper::getLocales();

        // Add a placeholder keyword for all locales.
        foreach ($locales as $locale) {
            Translation::firstOrCreate([
                'locale' => $locale,
                'group' => $group,
                'key' => 'placeholder',
            ]);
        }

        return response()->json([
            'success' => true,
            'group' => $group,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string $group
     * @return \Illuminate\Http\Response
     */
    public function show($group)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Translation  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Translation $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $group
     * @return \Illuminate\Http\Response
     */
    public function destroy($group)
    {
        // Get supported locales.
        $locales = TranslationHelper::getLocales();

        // Delete all PHP translation files.
        foreach ($locales as $locale) {
            $file = resource_path('lang/'.$locale.'/').$group.'.php';

            if (file_exists($file)) {
                unlink($file);
            }
        }

        // Delete translations from database.
        Translation::where('group', $group)->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}
