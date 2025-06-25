<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model {
    protected $table = 'images';

    protected $fillable = [
        'advertisement_id',
        'image_path',
    ];

    public function Advertisement():BelongsTo {
        return $this->belongsTo( Advertisement::class );
    }
}
