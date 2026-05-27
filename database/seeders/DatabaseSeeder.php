<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Insertamos datos de prueba para la práctica de la UPTex
        DB::table('productos')->insert([
            [
                'nombre' => 'Lápiz Técnico HB',
                'descripcion' => 'Lápiz de grafito de alta calidad ideal para dibujo y bosquejos mecánicos.',
                'precio' => 15.50,
                'stock' => 120,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Cuaderno Profesional Raya',
                'descripcion' => 'Cuaderno de 100 hojas con espiral metálico doble y pastas duras.',
                'precio' => 45.00,
                'stock' => 85,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Memoria USB 64GB Kingston',
                'descripcion' => 'Unidad flash USB 3.2 de alta velocidad para almacenamiento de proyectos.',
                'precio' => 189.00,
                'stock' => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}