<?php

namespace Voicecode\NovaTranslationManager;

use Laravel\Nova\Nova;
use Laravel\Nova\Tool;

class NovaTranslationManager extends Tool
{
    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {
        Nova::script('nova-translation-manager', __DIR__.'/../dist/js/tool.js');
        Nova::style('nova-translation-manager', __DIR__.'/../dist/css/tool.css');
    }

    /**
     * Build the view that renders the navigation links for the tool.
     *
     * @return \Illuminate\View\View
     */
    public function renderNavigation()
    {
        return view('nova-translation-manager::navigation');
    }
}
