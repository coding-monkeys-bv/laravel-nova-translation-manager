<?php

namespace Voicecode\LaravelNovaTranslationsManager\Models;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $table = 'ltm_translations';

    protected $fillable = [
        'status', 'locale', 'group', 'key', 'value',
    ];

    protected $dates = [
        'created_at', 'updated_at',
    ];
}
