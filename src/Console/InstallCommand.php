<?php

namespace Voicecode\NovaTranslationManager\Console;

use Illuminate\Console\Command;
use Voicecode\NovaTranslationManager\Models\Translation;

class InstallCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'translation-manager:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a first translation record to start off with';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get supported locales.
        $locales = config('nova-translation-manager.locales');

        foreach ($locales as $locale) {
            Translation::create([
                'status' => 0,
                'locale' => $locale,
                'group' => 'test',
                'key' => 'placeholder',
                'value' => 'Some dummy value here',
            ]);
        }

        $this->info('First record has been created.');
    }
}
