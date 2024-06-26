<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Feature;
use App\Models\Package;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test-1',
            'email' => 'test1@email.com',
            'password' => bcrypt('password'),
        ]);

        Feature::create([
            'image'=> 'https://img.freepik.com/premium-vector/green-plus-sign-vector-icon-cross-symbol-safety-guidance_87543-6379.jpg',
            'route_name'=>'feature1.index',
            'name'=>'Calculate Sum',
            'description'=>'Calculates Sum of Two Numbers',
            'required_credits'=>1,
            'active'=>true,
        ]);
    
        Feature::create([
            'image'=> 'https://img.freepik.com/premium-psd/minus-green-icon-3d-render_568120-260.jpg',
            'route_name'=>'feature2.index',
            'name'=>'Calculate Difference',
            'description'=>'Calculates Difference of Two Numbers',
            'required_credits'=>3,
            'active'=>true,
        ]);

        Package::create([
            'name'=>'Basic',
            'price'=>5,
            'credits'=>20
        ]);

        Package::create([
            'name'=>'Silver',
            'price'=>20,
            'credits'=>100
        ]);

        Package::create([
            'name'=>'Gold',
            'price'=>50,
            'credits'=>500
        ]);
    }
}
