<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        // Ajoute 'role' et copie les valeurs de 'user-type'
        if (!Schema::hasColumn('users', 'role')) {
            $table->string('role')->nullable()->after('password');
            
            // Copie les valeurs existantes
            DB::statement("UPDATE users SET role = `user-type` WHERE `user-type` IS NOT NULL");
            DB::statement("UPDATE users SET role = 'user' WHERE `user-type` IS NULL");
            
            // Vous pouvez supprimer l'ancienne colonne plus tard si vous voulez
        }
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
