<?php

namespace Voicecode\NovaTranslationManager\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;
use Barryvdh\TranslationManager\Manager;
use Voicecode\NovaTranslationManager\Models\Translation;
use Voicecode\NovaTranslationManager\Helpers\TranslationHelper;

class TranslationsController extends Controller
{
    /**
     * @var \Barryvdh\TranslationManager\Manager
     */
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Translation::groupBy('group')->orderBy('group')->pluck('group');

        return response()->json($groups);
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
            'group' => 'required|string',
            'keywords' => 'required',
        ]);

        // Create separate keywords from request data.
        $keys = explode("\n", request('keywords'));

        // Get supported locales.
        $locales = TranslationHelper::getLocales();

        foreach ($keys as $key) {

            // Make sure no spaces are added.
            $key = trim($key);

            // Add the keyword for all locales.
            foreach ($locales as $locale) {
                Translation::firstOrCreate([
                    'locale' => $locale,
                    'group' => $data['group'],
                    'key' => $key,
                ]);
            }
        }

        return response()->json([
            'success' => true,
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
        // Get translations by group.
        $data = Translation::where('group', $group)->orderBy('key', 'asc')->get();

        $translations = [];

        // Group translations by key.
        foreach ($data as $translation) {
            $translations[$translation->key][$translation->locale] = $translation;
        }

        return response()->json($translations);
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
     * @param  Translation  $translation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Translation $translation)
    {
        // Validate data.
        $data = $request->validate([
            'id' => 'required|numeric|min:1',
            'value' => 'nullable|string',
        ]);

        // If an empty string is given, make sure it's null.
        $data['value'] = ($data['value'] == '') ? null : $data['value'];

        // Update the translation.
        $translation->update($data);

        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * Update the specified keyword in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param
     * @return \Illuminate\Http\Response
     */
    public function updateKey(Request $request)
    {
        // Validate data.
        $data = $request->validate([
            'group' => 'required|string',
            'old_key' => 'nullable|string',
            'new_key' => 'nullable|string',
        ]);

        // Update keys
        Translation::where('group', $data['group'])
            ->where('key', $data['old_key'])
            ->update([
                'key' => $data['new_key'],
            ]);

        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $group
     * @param string $keyword
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($group, $key)
    {
        // Delete translations
        Translation::where('group', $group)->where('key', $key)->delete();
    }

    /**
     * Export translations to PHP files.
     */
    public function export(Request $request)
    {
        // Validate data.
        $data = $request->validate([
            'group' => 'required|string',
        ]);

        // Add support for JSON exports.
        $json = false;
        if ($data['group'] === '_json') {
            $json = true;
        }

        // Export translations to PHP files.
        $this->manager->exportTranslations($data['group'], $json);

        // When JSON files should be generated using the vue-i18n package.
        if (config('nova-translation-manager.vue-i18n.active')) {
            $job = 'vue-i18n:generate';

            // When the file should be formatted with the --umd flag.
            if (config('nova-translation-manager.vue-i18n.umd')) {
                $job .= ' --umd';
            }

            Artisan::call($job);
        }
    }

    /**
     * Import translations.
     */
    public function import(Request $request)
    {
        // Validate data.
        $data = $request->validate([
            'type' => 'required|string|in:replace,append',
        ]);

        // Set replace flag.
        $replace = ($data['type'] == 'replace') ? true : false;

        $this->manager->importTranslations($replace);
    }

    /**
     * Fix missing translations.
     */
    public function fix(Request $request)
    {
        // Validate data.
        $data = $request->validate([
            'key' => 'required|string',
            'group' => 'required|string',
        ]);

        // Get supported locales.
        $locales = TranslationHelper::getLocales();

        foreach ($locales as $locale) {
            Translation::firstOrCreate([
                'group' => $data['group'],
                'key' => $data['key'],
                'locale' => $locale,
            ]);
        }
    }

    /**
     * Fix missing translations for an entire group.
     */
    public function fixGroup(Request $request)
    {
        // Validate data.
        $data = $request->validate([
            'group' => 'required|string',
        ]);

        // Get supported locales.
        $locales = TranslationHelper::getLocales();

        // Get existing translations.
        $keys = Translation::select('group', 'key')
            ->where('group', $data['group'])
            ->groupBy('group')
            ->groupBy('key')
            ->pluck('key');

        foreach ($locales as $locale) {
            foreach ($keys as $key) {
                Translation::firstOrCreate([
                    'group' => $data['group'],
                    'key' => $key,
                    'locale' => $locale,
                ]);
            }
        }
    }
}
