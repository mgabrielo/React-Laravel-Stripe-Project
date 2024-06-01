<?php

namespace App\Models;

use App\Models\User;
use App\Models\Feature;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UsedFeature extends Model
{
    use HasFactory;
    
    protected $fillable=[
        'credits',
        'feature_id',
        'user_id',
        'data'
    ];

    // public function casts():array{
    //     return ['data' => 'array'];
    // }

    public function getDataAttribute($value)
    {
        return json_decode($value, true);
    }

    public function setDataAttribute($value)
    {
        $this->attributes['data'] = is_array($value) || is_object($value) ? json_encode($value) : $value;
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function feature(){
        return $this->belongsTo(Feature::class);
    }
}
