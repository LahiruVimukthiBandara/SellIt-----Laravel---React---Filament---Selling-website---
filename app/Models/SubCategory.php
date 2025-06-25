<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubCategory extends Model {
    protected $table = 'sub_categories';

    protected $fillable = [
        'main_category_id',
        'sub_category_name',
    ];

    public function mainCategory():BelongsTo {
        return $this->belongsTo( MainCategory::class, 'main_category_id' );
    }

    public function ads():HasMany {
        return $this->hasMany( Advertisement::class );
    }
}
