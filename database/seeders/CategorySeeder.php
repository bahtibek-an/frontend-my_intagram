<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{

    private $category;

    public function __construct(Category $category){
        $this->category = $category;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $categories = [
            [
                'name'         => 'PHP Programming',
                'created_at'   => NOW(),
                'updated_at'   => NOW()
            ],
            [
                'name'         => 'Java Programming',
                'created_at'   => NOW(),
                'updated_at'   => NOW()
            ],
            [
                'name'         => 'Database Administration',
                'created_at'   => NOW(),
                'updated_at'   => NOW()
            ]
        ];


        //Insert the new categories into the database table (categories)
        $this->category->insert($categories);

    }
}
