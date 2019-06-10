<?php

namespace Voicecode\NovaTranslationManager\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use Voicecode\NovaTranslationManager\Models\Translation;
use Voicecode\NovaTranslationManager\Helpers\TranslationHelper;

class LocalesController extends Controller
{
    /**
     * Get all available locales.
     */
    public function locales()
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
