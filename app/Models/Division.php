<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Division extends Model {
    protected $table = 'divisions';

    protected $fillable = [
        'district_id',
        'division',
    ];

    public function district():BelongsTo {
        return $this->belongsTo( District::class );
    }

    public function ads():HasMany {
        return $this->hasMany( Advertisement::class );
    }
}
