<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
         // Si vous avez une relation roles
        if (auth()->check() && auth()->user()->roles->contains('name', 'admin')) {
            return $next($request);
        }

        // Ou si vous avez une colonne role
        // if (auth()->check() && auth()->user()->role === 'admin') {
        //     return $next($request);
        // }

        abort(403, 'Accès non autorisé');
    }
    }
