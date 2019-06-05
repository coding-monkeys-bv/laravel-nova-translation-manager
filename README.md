# Laravel Nova Translation Manager

This tool is build in order to maintain translations via Laravel Nova while using the [Laravel Translation Manager] by Barry van den Heuvel. It also provides an integration with the [Laravel Vue I18N Generator] package from Martin Lindhe.

## Installation

```
composer require voicecode/laravel-nova-translation-manager
```

Then, publish the config file:

```
php artisan vendor:publish --provider="Voicecode\NovaTranslationManager\ToolServiceProvider"
```

While the Laravel Translation Manager is mandatory, this will be installed automatically when installing this tool. Make sure to publish the files provided by Translation Manager and run the migrations.

```
php artisan vendor:publish --provider="Barryvdh\TranslationManager\ManagerServiceProvider" --tag=migrations
php artisan migrate
```

Please see the docs for more information. 

The Laravel Vue I18N Generator package is optional and should be installed manually.

## About Voicecode B.V.
Voicecode B.V.
Faradaystraat 11
2014 EN Haarlem
The Netherlands

[Laravel Translation Manager]: https://github.com/barryvdh/laravel-translation-manager
[Laravel Vue I18N Generator]: https://github.com/martinlindhe/laravel-vue-i18n-generator
