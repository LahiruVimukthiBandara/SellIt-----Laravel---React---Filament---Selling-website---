<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {
    use HasFactory, Notifiable;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'is_admin'
    ];

    /**
    * The attributes that should be hidden for serialization.
    *
    * @var array<int, string>
    */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
    * Get the attributes that should be cast.
    *
    * @return array<string, string>
    */
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function ads():HasMany {
        return $this->hasMany( Advertisement::class, 'id' );
    }

    public function canAccessFilament(): bool {
        return $this->is_admin === true;
    }

    public function getName(): string {
        return trim( $this->first_name . ' ' . $this->last_name );
    }
    protected $appends = [ 'name' ];

    public function getNameAttribute(): string {
        return trim( $this->first_name . ' ' . $this->last_name );
    }
}

