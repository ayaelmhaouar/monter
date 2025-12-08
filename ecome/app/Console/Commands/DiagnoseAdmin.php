<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;

class DiagnoseAdmin extends Command
{
    protected $signature = 'diagnose:admin';
    protected $description = 'Diagnostique le problème des administrateurs';

    public function handle()
    {
        $this->info('=== DIAGNOSTIC ADMINISTRATEUR ===');

        // 1. Vérifier l'utilisateur admin
        $user = User::where('email', 'admin@example.com')->first();
        
        if (!$user) {
            $this->error('❌ Utilisateur admin@example.com NON TROUVÉ');
            $this->line('Essayez de le créer avec:');
            $this->line('php artisan tinker');
            $this->line('>>> User::create(["name"=>"Admin","email"=>"admin@example.com","password"=>bcrypt("password123"),"role"=>"admin"])');
            return 1;
        }

        $this->info('✅ Utilisateur trouvé : ' . $user->email);
        $this->line('   - ID: ' . $user->id);
        $this->line('   - Rôle dans la base: ' . ($user->role ?? 'NULL'));
        $this->line('   - isAdmin() retourne: ' . ($user->isAdmin() ? 'OUI' : 'NON'));

        // 2. Vérifier si la colonne role existe
        $columns = \Schema::getColumnListing('users');
        $this->info("\n2. Structure de la table `users` :");
        $this->line('   - Colonnes disponibles: ' . implode(', ', $columns));
        $this->line('   - Colonne "role" présente: ' . (in_array('role', $columns) ? 'OUI' : 'NON'));

        // 3. Vérifier le middleware
        $this->info("\n3. Vérification du Middleware :");
        $middlewarePath = app_path('Http/Middleware/AdminMiddleware.php');
        if (file_exists($middlewarePath)) {
            $this->info('   ✅ AdminMiddleware.php existe');
            
            // Lire le contenu pour vérifier la logique
            $content = file_get_contents($middlewarePath);
            if (strpos($content, 'isAdmin()') !== false) {
                $this->info('   ✅ Méthode isAdmin() utilisée dans le middleware');
            } else {
                $this->warn('   ⚠️  Méthode isAdmin() non trouvée dans le middleware');
            }
        } else {
            $this->error('   ❌ AdminMiddleware.php NON TROUVÉ');
        }

        // 4. Routes admin
        $this->info("\n4. Routes admin disponibles :");
        $routes = Route::getRoutes()->getRoutes();
        $adminRoutes = [];
        foreach ($routes as $route) {
            if (strpos($route->uri, 'admin') !== false || 
                (isset($route->action['middleware']) && 
                 is_array($route->action['middleware']) && 
                 in_array('admin', $route->action['middleware']))) {
                $adminRoutes[] = $route->uri . ' [' . implode(',', $route->methods) . ']';
            }
        }
        
        if (count($adminRoutes) > 0) {
            foreach ($adminRoutes as $route) {
                $this->line('   - ' . $route);
            }
        } else {
            $this->warn('   ⚠️  Aucune route admin trouvée');
        }

        // 5. Résumé
        $this->info("\n" . str_repeat('=', 40));
        $this->info('RÉSUMÉ :');
        
        if ($user->role === 'admin' && $user->isAdmin()) {
            $this->info('✅ L\'utilisateur admin@example.com a le rôle "admin"');
            $this->info('✅ La méthode isAdmin() retourne TRUE');
            $this->info("\nProchaines étapes :");
            $this->line('1. Connectez-vous avec admin@example.com / password123');
            $this->line('2. Utilisez le token JWT reçu');
            $this->line('3. Testez une route admin');
        } else {
            $this->error('❌ PROBLEME DÉTECTÉ :');
            $this->line('   - Rôle dans la base : ' . ($user->role ?? 'NULL'));
            $this->line('   - isAdmin() retourne : ' . ($user->isAdmin() ? 'TRUE' : 'FALSE'));
            
            $this->info("\nSolution rapide :");
            $this->line('php artisan tinker');
            $this->line('>>> $user = User::where("email", "admin@example.com")->first();');
            $this->line('>>> $user->role = "admin";');
            $this->line('>>> $user->save();');
        }

        return 0;
    }
}