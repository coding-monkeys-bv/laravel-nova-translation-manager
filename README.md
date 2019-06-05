# Laravel Nova Translation Manager

This tool is build in order to maintain translations via Laravel Nova while using the [Laravel Translation Manager] by Barry van den Heuvel. It also provides an integration with the [Laravel Vue i18n] package from Martin Lindhe.

## Installation

```composer require voicecode/laravel-nova-translation-manager```

Then, publish the config file:

```
php artisan vendor:publish --provider="Voicecode\NovaTranslationManager\ToolServiceProvider"
```

While the Laravel Translation Manager is mandatory, this will be installed automatically when installing this tool. The Laravel Vue i18n package is optional and should be installed manually.

[Laravel Translation Manager]: https://github.com/barryvdh/laravel-translation-manager
[Laravel Vue i18n]: https://github.com/martinlindhe/laravel-vue-i18n-generator
