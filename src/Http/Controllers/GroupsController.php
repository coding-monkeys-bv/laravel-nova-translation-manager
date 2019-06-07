<?php

namespace Voicecode\NovaTranslationManager\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Voicecode\NovaTranslationManager\Models\Translation;

class GroupsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $data = request()->validate([
            'group' => 'required|string|unique:ltm_translations,group',
        ]);

        // Convert group name into slug format.
        $group = Str::slug($data['group']);

        // Get supported locales.
        $locales = Translation::groupBy('locale')->pluck('locale')->toArray();

        // Add a placeholder keyword for all locales.
        foreach ($locales as $locale) {
            Translation::firstOrCreate([
                'locale' => $locale,
                'group' => $group,
                'key' => 'placeholder',
            ]);
        }

        return response()->json([
            'success' => true,
            'group' => $group,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string $group
     * @return \Illuminate\Http\Response
     */
    public function show($group)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Translation  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Translation $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
