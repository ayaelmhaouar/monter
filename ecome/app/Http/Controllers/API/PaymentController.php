<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Initialiser un paiement
     */
    public function initiate(Request $request, $orderId)
    {
        $request->validate([
            'payment_method' => 'required|in:card,stripe,paypal,cash_on_delivery'
        ]);

        try {
            $order = Order::where('user_id', auth()->id())
                         ->where('id', $orderId)
                         ->firstOrFail();

            // Vérifier si le paiement existe déjà
            $existingPayment = Payment::where('order_id', $orderId)
                                    ->where('status', 'pending')
                                    ->first();

            if ($existingPayment) {
                return response()->json([
                    'success' => true,
                    'message' => 'Paiement déjà initié',
                    'data' => [
                        'payment' => $existingPayment,
                        'payment_url' => $this->generatePaymentUrl($existingPayment)
                    ]
                ]);
            }

            // Créer un nouveau paiement
            $payment = Payment::create([
                'order_id' => $order->id,
                'amount' => $order->total_amount,
                'payment_method' => $request->payment_method,
                'status' => 'pending',
                'payment_gateway' => $request->payment_method === 'cash_on_delivery' ? null : $request->payment_method,
                'payment_details' => [
                    'user_id' => auth()->id(),
                    'user_email' => auth()->user()->email,
                    'items' => $order->orderItems->count()
                ]
            ]);

            // Simuler un processus de paiement
            if ($request->payment_method === 'cash_on_delivery') {
                return $this->handleCashOnDelivery($payment);
            } else {
                return $this->handleOnlinePayment($payment, $request);
            }

        } catch (\Exception $e) {
            Log::error('Payment initiation failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'initialisation du paiement',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Traiter le paiement en ligne (simulation)
     */
    private function handleOnlinePayment(Payment $payment, Request $request)
    {
        // Simulation d'une URL de paiement
        $paymentUrl = url("/api/payments/{$payment->id}/process");
        
        // Simulation des données de la gateway
        $gatewayData = [
            'payment_intent_id' => 'pi_' . uniqid(),
            'client_secret' => 'secret_' . uniqid(),
            'redirect_url' => $paymentUrl
        ];

        $payment->update([
            'payment_details' => array_merge($payment->payment_details ?? [], $gatewayData)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Paiement en ligne initié',
            'data' => [
                'payment' => $payment,
                'payment_url' => $paymentUrl,
                'gateway_data' => $gatewayData,
                'next_step' => 'Redirect to payment gateway or use client_secret for Stripe Elements'
            ]
        ]);
    }

    /**
     * Traiter le paiement à la livraison
     */
    private function handleCashOnDelivery(Payment $payment)
    {
        $payment->update([
            'status' => 'completed',
            'paid_at' => now()
        ]);

        // Mettre à jour le statut de la commande
        $payment->order->update([
            'payment_status' => 'paid',
            'status' => 'processing'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Commande confirmée avec paiement à la livraison',
            'data' => [
                'payment' => $payment,
                'order' => $payment->order
            ]
        ]);
    }

    /**
     * Traiter le callback de paiement (webhook simulé)
     */
    public function process(Request $request, $paymentId)
    {
        try {
            $payment = Payment::findOrFail($paymentId);
            
            // Simulation de traitement de paiement
            // En réalité, vous intégreriez Stripe, PayPal, etc.
            
            $success = $request->input('success', true); // Pour tester, par défaut réussi

            if ($success) {
                $payment->markAsCompleted('txn_' . uniqid());
                
                // Mettre à jour la commande
                $payment->order->update([
                    'payment_status' => 'paid',
                    'status' => 'processing'
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Paiement réussi',
                    'data' => [
                        'payment' => $payment,
                        'order' => $payment->order
                    ]
                ]);
            } else {
                $payment->markAsFailed();
                
                return response()->json([
                    'success' => false,
                    'message' => 'Paiement échoué',
                    'data' => [
                        'payment' => $payment
                    ]
                ], 400);
            }

        } catch (\Exception $e) {
            Log::error('Payment processing failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du traitement du paiement'
            ], 500);
        }
    }

    /**
     * Confirmer un paiement manuellement (pour admin)
     */
    public function confirm(Request $request, $paymentId)
    {
        $request->validate([
            'transaction_id' => 'required|string'
        ]);

        try {
            $payment = Payment::findOrFail($paymentId);
            
            $payment->markAsCompleted($request->transaction_id);
            
            $payment->order->update([
                'payment_status' => 'paid',
                'status' => 'processing'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Paiement confirmé avec succès',
                'data' => [
                    'payment' => $payment,
                    'order' => $payment->order
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la confirmation du paiement'
            ], 500);
        }
    }

    /**
     * Obtenir les détails d'un paiement
     */
    public function show($paymentId)
    {
        try {
            $payment = Payment::with('order.orderItems.product')
                            ->whereHas('order', function($query) {
                                $query->where('user_id', auth()->id());
                            })
                            ->findOrFail($paymentId);

            return response()->json([
                'success' => true,
                'data' => $payment
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Paiement non trouvé'
            ], 404);
        }
    }

    /**
     * Obtenir l'historique des paiements d'un utilisateur
     */
    public function index()
    {
        $payments = Payment::with('order.orderItems.product')
                          ->whereHas('order', function($query) {
                              $query->where('user_id', auth()->id());
                          })
                          ->latest()
                          ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $payments
        ]);
    }

    /**
     * Générer une URL de paiement (méthode helper)
     */
    private function generatePaymentUrl(Payment $payment)
    {
        return url("/api/payments/{$payment->id}/process");
    }
}