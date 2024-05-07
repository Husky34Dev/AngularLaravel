<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function getName()
    {
        $names = User::pluck('name');
        return response()->json($names);
    }

    public function getEmail()
    {
        $emails = User::pluck('email');
        return response()->json($emails);
    }
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user);
    }
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Validar los datos recibidos en la solicitud
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$id,
            // Otros campos que desees actualizar
        ]);

        // Actualizar los campos del usuario con los datos recibidos en la solicitud
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        // Actualizar otros campos si es necesario

        // Guardar los cambios en la base de datos
        $user->save();

        return response()->json($user);
    }

}
