<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('post_id'); // Clave foránea para la publicación relacionada
            $table->string('name'); // Nombre del autor del comentario
            $table->string('email'); // Correo electrónico del autor del comentario
            $table->text('content'); // Contenido del comentario
            $table->timestamps(); // Campos de registro de fecha y hora

            // Restricciones de clave foránea
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
