<?php

namespace Voicecode\NovaTranslationManager;

use Laravel\Nova\Nova;
use Laravel\Nova\Events\ServingNova;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Voicecode\NovaTranslationManager\Http\Middleware\Authorize;

class ToolServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'nova-translation-manager');
        $this->publishConfiguration();

        $this->app->booted(function () {
            $this->routes();
        });

        Nova::serving(function (ServingNova $event) {
            //
        });
    }

    /**
     * Publish package configuration.
     *
     * @return void
     */
    private function publishConfiguration()
    {
        $this->publishes([
            __DIR__.'/../config/nova-translation-manager.php' => config_path('nova-translation-manager.php'),
        ], 'config');
    }

    /**
     * Merge package configuration.
     *
     * @return void
     */
    private function mergeConfiguration()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/nova-translation-manager.php', 'nova-translation-manager');
    }

    /**
     * Register the tool's routes.
     *
     * @return void
     */
    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Route::middleware(['nova', Authorize::class])
                ->prefix('voicecode/nova-translation-manager')
                ->group(__DIR__.'/../routes/api.php');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfiguration();

        // Register commands.
        $this->app->singleton('command.translation-manager.install', function ($app) {
            return new Console\InstallCommand($app['translation-manager']);
        });

        $this->commands('command.translation-manager.install');
    }
}
