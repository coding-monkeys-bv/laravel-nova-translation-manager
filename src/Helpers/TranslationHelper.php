<?php

namespace Voicecode\NovaTranslationManager\Helpers;

use Illuminate\Support\Str;
use Voicecode\NovaTranslationManager\Models\Translation;

class TranslationHelper
{
    /**
     * Generate a URL friendly "slug" from a given string.
     * This is a modified version of the default Str::slug method, but allowing underscores.
     *
     * @param  string  $title
     * @param  string  $separator
     * @param  string|null  $language
     * @return string
     */
    public static function slug($title, $separator = '-', $language = 'en')
    {
        $title = $language ? Str::ascii($title, $language) : $title;

        // Set separator character
        $separator = '-';

        // Replace @ with the word 'at'
        $title = str_replace('@', $separator.'at'.$separator, $title);

        // Remove all characters that are not the separator, letters, numbers, underscores or whitespace.
        $title = preg_replace('![^'.preg_quote($separator).'\pL\pN\s]+_!u', '', Str::lower($title));

        // Replace all separator characters and whitespace by a single separator
        $title = preg_replace('!['.preg_quote($separator).'\s]+!u', $separator, $title);

        return trim($title, $separator);
    }

    /**
     * Get available locales.
     */
    public static function getLocales()
    {
        $locales = Translation::groupBy('locale')
            ->select('locale')
            ->pluck('locale');

        return $locales;
    }

    /**
     * Remove folders recursively.
     *
     * @param string $dir
     *
     * @return void
     */
    public static function removeDirectory($dir)
    {
        foreach (scandir($dir) as $file) {
            if ('.' === $file || '..' === $file) {
                continue;
            }

            if (is_dir($dir.'/'.$file)) {
                rmdir_recursive($dir.'/'.$file);
            } else {
                unlink($dir.'/'.$file);
            }
        }
        rmdir($dir);
    }
}
