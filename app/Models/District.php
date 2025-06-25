<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model {
    protected $table = 'districts';

    protected $fillable = [
        'province_id',
        'district',
    ];

    public function province():BelongsTo {
        return $this->belongsTo( Province::class );
    }

    public function divisions():HasMany {
        return $this->hasMany( Division::class );
    }

    public function ads():HasMany {
        return $this->hasMany( Advertisement::class );
    }
}
