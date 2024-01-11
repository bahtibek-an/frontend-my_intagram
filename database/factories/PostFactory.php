<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $coverOptions = [
            '5fdd9ec9-55b9-44ff-82c2-d3beb23a1a60.jpg',
            '8cb7d5cb-419c-44a8-9972-96ce3a2daae7.jpg',
            '847bfdf5-995f-4b69-b75a-d4285e5804e6.jpg',
            '6096a016-2d31-4a0e-be30-6ddbd19af3a9.png',
            'd0705238-b06b-472c-bf22-bc93a81e3c30.png',
        ];

        $cover = $this->faker->randomElement($coverOptions);

        return [
            'title' => $this->faker->sentence(5),
            'description' => $this->faker->sentence(50),
            'cover' => $cover,
            'likes' => $this->faker->randomNumber(),
            'dislikes' => $this->faker->randomNumber(),
            'user_id' => $this->faker->randomElement([6, 7,8,9,10])
        ];
    }

}
