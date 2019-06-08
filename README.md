# Laravel Nova Translation Manager

This tool is build in order to maintain translations via Laravel Nova while using the [Laravel Translation Manager] by [Barry van den Heuvel]. It also provides an integration with the [Laravel Vue I18N Generator] package from [Martin Lindhe]. The Laravel Vue i18n Generator package is optional and should be installed manually. Please see the [Laravel Vue i18n Generator Docs] for more information.

## Installation

```
composer require voicecode/laravel-nova-translation-manager
```

Then, publish the config file and make sure you set the correct value for using the Vue i18n package.

```
php artisan vendor:publish --provider="Voicecode\NovaTranslationManager\ToolServiceProvider"
```

While the Laravel Translation Manager is mandatory, this will be installed automatically when installing this tool. Make sure to publish the files provided by Translation Manager and run the migrations.

```
php artisan vendor:publish --provider="Barryvdh\TranslationManager\ManagerServiceProvider" --tag=migrations
php artisan migrate
```

Now in NovaServiceProvider, make sure you register this tool in the tools method.

```
use Voicecode\NovaTranslationManager\NovaTranslationManager;

/**
 * Get the tools that should be listed in the Nova sidebar.
 *
 * @return array
 */
public function tools()
{
    return [
        new NovaTranslationManager(),
    ];
}
```

## Supported locales

Please use the config file to specify which locales you want to support.

When starting off with an empty database, it's mandatory to create a first database record. You can do this by running the install command. This will generate a record based on your current app locale. 

```
php artisan translation-manager:install
```

## Translating this package

You can easily translate all texts of this package in the Laravel Nova JSON translation file. I'd be happy to add translations for your language. An example can be found in the translations folder.

## Note for Vue i18n Generator users

The package ships with a config file where you can set the value of output messages. Make sure this is set to false, otherwise Laravel Nova will throw some errors while publishing translation files. (Thanks [Martin Lindhe] for merging this PR :-))

```
'showOutputMessages' => false,
```

## About Voicecode B.V.
Voicecode B.V.  
Faradaystraat 11   
2014 EN Haarlem  
The Netherlands  

[Laravel Translation Manager]: https://github.com/barryvdh/laravel-translation-manager
[Laravel Vue I18N Generator]: https://github.com/martinlindhe/laravel-vue-i18n-generator
[Laravel Vue i18n Generator Docs]: https://github.com/martinlindhe/laravel-vue-i18n-generator/blob/master/README.md
[Martin Lindhe]: https://github.com/martinlindhe
[Barry van den Heuvel]: https://github.com/barryvdh
