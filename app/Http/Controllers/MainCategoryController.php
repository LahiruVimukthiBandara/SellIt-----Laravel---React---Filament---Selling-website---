<?php

namespace App\Http\Controllers;

use App\Models\MainCategory;
use Illuminate\Http\Request;

class MainCategoryController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index( Request $request ) {
        $categories = MainCategory::with( 'subCategories' )->latest()->get();

        return response()->json( $categories );
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

    public function show( MainCategory $mainCategory ) {
        //
    }

    /**
    * Show the form for editing the specified resource.
    */

    public function edit( MainCategory $mainCategory ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( Request $request, MainCategory $mainCategory ) {
        //
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( MainCategory $mainCategory ) {
        //
    }
}
