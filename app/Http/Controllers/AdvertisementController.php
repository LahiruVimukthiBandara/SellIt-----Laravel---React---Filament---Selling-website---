<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdvertisementController extends Controller {
    /**
    * Display a listing of the resource.
    */

public function index(Request $request)
{
    $query = Advertisement::with([
        'province',
        'district',
        'division',
        'mainCategory',
        'subCategory',
        'images',
        'user'
    ])->where('active', 1);

    if ($request->filled('search')) {
        $search = $request->input('search');
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    if ($request->filled('category')) {
        $query->where('main_category_id', $request->category);
    }

    if ($request->filled('start_price')) {
        $query->where('price', '>=', $request->start_price);
    }

    if ($request->filled('end_price')) {
        $query->where('price', '<=', $request->end_price);
    }

    if ($request->filled('province')) {
        $query->where('province_id', $request->province);
    }

    if ($request->filled('district')) {
        $query->where('districts_id', $request->district);
    }

    if ($request->filled('division')) {
        $query->where('divisions_id', $request->division);
    }

    $ads = $query->latest()->paginate(10);

    return response()->json($ads);
}


    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        return Inertia::render('dashboard');
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store(Request $request)
{
    $validated = $request->validate([
        'main_category_id' => 'required|exists:main_categories,id',
        'sub_category_id' => 'required|exists:sub_categories,id',
        'province_id' => 'required|exists:provinces,id',
        'districts_id' => 'required|exists:districts,id',
        'divisions_id' => 'required|exists:divisions,id',
        'address' => 'required|string|max:255',
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric|min:0',
        'image' => 'nullable|array',
        'image.*' => 'image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $ad = Advertisement::create([
        'user_id' => auth()->id(),
        'main_category_id' => $validated['main_category_id'],
        'sub_category_id' => $validated['sub_category_id'],
        'province_id' => $validated['province_id'],
        'districts_id' => $validated['districts_id'],
        'divisions_id' => $validated['divisions_id'],
        'address' => $validated['address'],
        'title' => $validated['title'],
        'description' => $validated['description'],
        'price' => $validated['price'],
    ]);

    // 3. Handle image uploads (optional)
    if ($request->hasFile('image')) {
        foreach ($request->file('image') as $file) {
            $path = $file->store('ads/images', 'public');

            Image::create([
                'advertisement_id' => $ad->id,
                'image_path' => $path,
            ]);
        }
    }
}

    /**
    * Display the specified resource.
    */

public function show($id)
{
    $advertisement = Advertisement::with([
        'images',
        'province',
        'district',
        'division',
        'mainCategory',
        'subCategory',
        'user'
    ])->find($id);
    return Inertia::render('Add/Show', compact(['advertisement']));
}



    /**
    * Show the form for editing the specified resource.
    */

    public function edit( Advertisement $advertisement ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( Request $request, Advertisement $advertisement ) {
        //
    }

    /**
    * Remove the specified resource from storage.
    */

public function destroy($id)
{
    $ad = Advertisement::with('images')->find($id);

    if (! $ad) {
        return response()->json(['message' => 'Advertisement not found.'], 404);
    }

    foreach ($ad->images as $image) {
        if (Storage::exists('public/' . $image->image_path)) {
            Storage::delete('public/' . $image->image_path);
        }

        $image->delete();
    }
    $ad->delete();

    return response()->json(['message' => 'Advertisement and images deleted successfully.']);
}



    public function featuredAds(){
        $query = Advertisement::with([
            'province',
            'district',
            'division',
            'mainCategory',
            'subCategory',
            'images',
            'user'
        ])
        ->where('active', 1)
        ->where('featured', 1);

    $featured = $query->latest()->get();

    return response()->json($featured);
    }

    public function myAds(){
        $userId = auth()->id();
        $query = Advertisement::query()->with([
            'province',
            'district',
            'division',
            'mainCategory',
            'subCategory',
            'images',
            'user'
        ])->where("user_id", $userId);

        $myAds = $query->latest()->get();
        return response()->json($myAds);
    }
}
