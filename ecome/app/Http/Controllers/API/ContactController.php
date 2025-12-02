<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller; 
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function create()
    {
        return view('contact.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        Contact::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message']
        ]);

        return redirect()->route('contact.create')->with('success', 'Message envoyé avec succès');
    }

    public function index()
    {
        $contacts = Contact::with('user')->latest()->get();
        return view('admin.contacts.index', compact('contacts'));
    }

    public function updateStatus(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,in_progress,resolved'
        ]);

        $contact->update($validated);

        return redirect()->back()->with('success', 'Statut du message mis à jour');
    }
}