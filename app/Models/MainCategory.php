<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MainCategory extends Model {
    protected $table = 'main_categories';

    protected $fillable = [
        'category_name'
    ];

    public function subCategories():HasMany {
        return $this->hasMany( SubCategory::class );
    }

    public function ads():HasMany {
        return $this->hasMany( Advertisement::class );
    }
}
