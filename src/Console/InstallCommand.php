<?php

namespace Voicecode\LaravelNovaTranslationsManager\Console;

use Illuminate\Console\Command;
use Voicecode\LaravelNovaTranslationsManager\Models\Translation;

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
        Translation::create([
            'status' => 0,
            'locale' => app()->getLocale(),
            'group' => 'test',
            'key' => 'placeholder',
            'value' => 'Some dummy value here',
        ]);

        $this->info('First record has been created.');
    }
}
