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
        Schema::create('comments', function (Blueprint $table) {
            $table->id(); //auto increment
            $table->text('body'); //use to store the actual comment
            $table->unsignedBigInteger('user_id'); // owner of the post
            $table->unsignedBigInteger('post_id'); //what post the comment belongs to
            $table->timestamps(); //time and date the comment is created

            //Foreign Keys
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            //The onDelete('cascade') method --- will remove the related recods in the
            //comments table when the post is deleted by the owner of the post
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
