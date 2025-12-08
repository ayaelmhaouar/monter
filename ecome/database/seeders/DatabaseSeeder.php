<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Product;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    
         public function run()
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);
        // Admin user
         User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
              'role_id' => $adminRole->id

        ]);
        // Regular user (optional)
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'user'
        ]);
    

        // Client user
        $client = User::create([
            'name' => 'Jean Dupont',
            'email' => 'client@example.com',
            'password' => bcrypt('password'),
        ]);
        $client->roles()->attach($userRole);

        // Produits de test
        $products = [
            [
                'name' => 'Montre Homme Classique',
                'description' => 'Montre élégante pour homme avec bracelet en cuir véritable.',
                'price' => 299.99,
                'category' => 'homme',
                'image' => 'montres/homme-1.jpg',
                'stock' => 15,
                'is_active' => true
            ],
            // ... autres produits
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}