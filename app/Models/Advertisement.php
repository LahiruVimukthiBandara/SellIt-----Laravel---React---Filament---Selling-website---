<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Advertisement extends Model {
    protected $table = 'advertisements';

    protected $fillable = [
        'user_id',
        'main_category_id',
        'sub_category_id',
        'province_id',
        'districts_id',
        'divisions_id',
        'address',
        'title',
        'description',
        'price',
        'active',
        'featured'
    ];

    public function images():HasMany {
        return $this->hasMany( Image::class );
    }

    public function province():BelongsTo {
        return $this->belongsTo( Province::class );
    }

    public function district():BelongsTo {
        return $this->belongsTo( District::class, 'districts_id' );
    }

    public function division():BelongsTo {
        return $this->belongsTo( Division::class, 'divisions_id' );
    }

    public function mainCategory():BelongsTo {
        return $this->belongsTo( MainCategory::class, 'main_category_id' );
    }

    public function subCategory():BelongsTo {
        return $this->belongsTo( SubCategory::class, 'sub_category_id' );
    }

    public function user():BelongsTo {
        return $this->belongsTo( User::class, );
    }
}
