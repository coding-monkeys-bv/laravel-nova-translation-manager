<?php

namespace Voicecode\LaravelNovaTranslationsManager\Http\Controllers;

use App\Http\Controllers\Controller;
use Voicecode\LaravelNovaTranslationsManager\Http\Requests\UploadRequest;

class UploadController extends Controller
{
    public function upload(UploadRequest $request)
    {
        $request->handle();
    }
}
