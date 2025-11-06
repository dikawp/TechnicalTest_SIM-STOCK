<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('user', [
            'users' => User::where('id', '!=', Auth::id())->get()
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }


        $user->update($data);

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            abort(403, 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect()->route('users.index');
    }
}
