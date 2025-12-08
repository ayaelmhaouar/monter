<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if user is authenticated
        if (!auth()->check()) {
            return response()->json([
                'message' => 'Non authentifié',
                'error' => 'Authentication required'
            ], 401);
        }
        
        // Check if user has admin role
        // Assuming your User model has a 'role' column or isAdmin() method
        $user = auth()->user();
        
        // Method 1: Check role column
        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Accès non autorisé',
                'required_role' => 'admin',
                'current_role' => $user->role
            ], 403);
        }
        
        // Method 2: If using isAdmin() method
        // if (!$user->isAdmin()) {
        //     return response()->json([
        //         'message' => 'Accès non autorisé',
        //         'required_role' => 'admin'
        //     ], 403);
        // }
        
        return $next($request);
    }
}