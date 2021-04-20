<?php

namespace Voicecode\LaravelNovaTranslationsManager\Http\Controllers;

use App\Http\Controllers\Controller;
use Barryvdh\TranslationManager\Manager;
use Illuminate\Support\Facades\Request;
use Voicecode\LaravelNovaTranslationsManager\Helpers\TranslationHelper;
use Voicecode\LaravelNovaTranslationsManager\Models\Translation;

class LocalesController extends Controller
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
     * Get all available locales.
     */
    public function index()
    {
        // Merge app locale and translation locales.
        $locales = TranslationHelper::getLocales();
        $defaultLocale = app()->getLocale();

        return response()->json([
            'locales' => $locales,
            'defaultLocale' => $defaultLocale,
        ]);
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
            'locale' => 'required|string|unique:ltm_translations,locale',
        ]);

        // Get all keys.
        $keys = Translation::groupBy('group', 'key')->pluck('group', 'key');

        // When there are keys found.
        if (count($keys) > 0) {

            // Create all translation records.
            foreach ($keys as $key => $group) {
                Translation::firstOrCreate([
                    'status' => 0,
                    'locale' => $data['locale'],
                    'group' => $group,
                    'key' => $key,
                ]);
            }
        } else {
            Translation::firstOrCreate([
                'status' => 0,
                'locale' => $data['locale'],
                'group' => 'first',
                'key' => 'placeholder',
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * Delete a locale.
     */
    public function destroy(Request $request, $locale)
    {
        // Remove translations from database.
        Translation::where('locale', $locale)->delete();

        // Unlink translation files.
        $dir = resource_path('lang/'.$locale.'/');
        if (is_dir($dir)) {
            TranslationHelper::removeDirectory($dir);
        }

        return response()->json([
            'success' => true,
        ]);
    }
}
