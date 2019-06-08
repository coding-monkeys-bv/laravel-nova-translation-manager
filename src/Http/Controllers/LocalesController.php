<?php

namespace Voicecode\NovaTranslationManager\Http\Controllers;

use App\Http\Controllers\Controller;
use Voicecode\NovaTranslationManager\Models\Translation;

class LocalesController extends Controller
{
    /**
     * Get all available locales.
     */
    public function locales()
    {
        // Merge app locale and translation locales.
        $locales = config('nova-translation-manager.locales');

        return response()->json($locales);
    }
}
