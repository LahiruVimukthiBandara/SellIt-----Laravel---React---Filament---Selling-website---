<?php

namespace App\Http\Controllers;

use App\Models\Ads;
use Illuminate\Http\Request;

class AdsController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {
        $query = Ads::query()->where( 'active', 1 );

        $mainAd = $query->latest()->get();
        return response()->json( $mainAd );
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        //
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request ) {
        //
    }

    /**
    * Display the specified resource.
    */

    public function show( Ads $ads ) {
        //
    }

    /**
    * Show the form for editing the specified resource.
    */

    public function edit( Ads $ads ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( Request $request, Ads $ads ) {
        //
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( Ads $ads ) {
        //
    }
}
