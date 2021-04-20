<?php

namespace Voicecode\LaravelNovaTranslationsManager\Http\Requests;

use Barryvdh\TranslationManager\Manager;
use Illuminate\Foundation\Http\FormRequest;
use Voicecode\LaravelNovaTranslationsManager\Models\Translation;

class UploadRequest extends FormRequest
{
    private $groups = [];
    private $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }

    // Authorize request.
    public function authorize() : bool
    {
        return auth()->check();
    }

    // Validation rules.
    public function rules() : array
    {
        return [
            'file' => 'required|file',
            'publish' => 'required|string',
        ];
    }

    // Handle request.
    public function handle()
    {
        $file = request()->file('file');

        // Load the file into a string
        $string = @file_get_contents($file);

        // Convert all line-endings using regular expression
        $string = preg_replace('~\r\n?~', "\n", $string);
        file_put_contents($file, $string);

        $handle = fopen($file, 'r');
        $header = true;

        while ($csvLine = fgetcsv($handle, 1000, ';')) {
            if ($header) {
                $header = false;
            } else {
                // Update translation.
                $translation = Translation::updateOrCreate([
                    'locale' => $csvLine[0],
                    'group' => $csvLine[1],
                    'key' => $csvLine[2],
                ], [
                    'value' => $csvLine[3],
                    'status' => (request('publish') == 'true') ? 1 : 0, // Mark as updated.
                ]);

                // Add group to publishable groups.
                if (! in_array($csvLine[1], $this->groups)) {
                    $this->groups[] = $csvLine[1];
                }
            }
        }

        if (request('publish') == 'false') {
            return;
        }

        // Publish all groups.
        foreach ($this->groups as $group) {
            $this->manager->exportTranslations($group, ($group == '_json'));
        }
    }
}
