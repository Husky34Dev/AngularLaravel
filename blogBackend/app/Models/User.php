<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Método requerido por la interfaz JWTSubject para devolver el identificador del usuario.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Devuelve el ID o clave primaria del usuario
    }

    /**
     * Método requerido para devolver reclamos personalizados en el token JWT.
     */
    public function getJWTCustomClaims()
    {
        return []; // Aquí puedes añadir datos personalizados si lo necesitas
    }
}
