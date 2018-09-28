<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Entry;

class RestaurantService
{
    public function all()
    {
        $restaurants = Entry::find()->section('restaurants')->all();
        $map = function($rest) {
            return [
                'title' => $rest->title,
                'cuisines' => $rest->cuisine,
                'address' => $rest->restaurantAddress,
                'epicentre' => $rest->restaurantEpicentre,
                'cost' => $rest->restaurantCost->value,
                'prox' => $rest->restaurantProximity,
                'desc' => $rest->restaurantDescription,
            ];
        };

        return array_map($map, $restaurants);
    }

    public function cuisines()
    {
        $restaurants = Entry::find()->section('restaurants')->all();
        $cuisines = [];

        foreach ($restaurants as $rest) {
            foreach ($rest->cuisine as $cuisine) {
                if (!key_exists($cuisine->value, $cuisines)) {
                    $cuisines[$cuisine->value] = $cuisine->label;
                }
            }
        }

        return $cuisines;
    }
}
