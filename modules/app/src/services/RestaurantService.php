<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Entry;

class RestaurantService
{
    public function all()
    {
        $restaurants = Entry::find()
                     ->section('restaurants')
                     ->all();
        $map = function($rest) {
            return [
                'id' => $rest->id,
                'title' => $rest->title,
                'cuisines' => $rest->cuisine,
                //'address' => $rest->restaurantAddress,
                'epicentre' => $rest->restaurantEpicentre,
                'cost' => $rest->restaurantCost->value,
                'prox' => $rest->restaurantProximity,
                'desc' => $rest->restaurantDescription,
            ];
        };

        return array_map($map, $restaurants);
    }

    public function filtered($opts)
    {
        $filtered = $this->all();
        if (key_exists('cuisines', $opts) && $opts['cuisines'] != 'all') {
            $cuisines = explode(',', $opts['cuisines']);
            $filtered = array_filter(
                $filtered,
                function ($restaurant) use ($cuisines) {
                    foreach ($restaurant['cuisines']->getOptions() as $opt) {
                        if ($opt->selected) {
                            //error_log($opt->value);
                            foreach ($cuisines as $c) {
                                if ($opt->value == $c) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                }
            );
        }

        if (key_exists('cost', $opts)) {
            $cost = $opts['cost'];
            $filtered = array_filter(
                $filtered,
                function ($restaurant) use ($cost) {
                    error_log(print_r($restaurant['cost'], true));
                    return $restaurant['cost'] === $cost;
                }
            );
        }

        if (key_exists('sort', $opts)) {
            $sort = $opts['sort'];
            $sortDir = $opts['sortDir'] ?? 'asc';

            if ($sort == 'alpha') {
                usort(
                    $filtered,
                    function ($a, $b) use ($sortDir) {
                        $val = $a < $b
                             ? -1
                             : ($a > $b ? 1 : 0);
                        return $sortDir == 'asc' ? $val : $val*-1; 
                    }
                );
            }
        }
        return $filtered;

        
    }

    public function cuisines()
    {
        $restaurants = Entry::find()
                     ->section('restaurants')
                     ->all();
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

    public function costs()
    {
        return [
            1 => '$',
            2 => '$$',
            3 => '$$$',
            4 => '$$$$',
            5 => '$$$$$',
        ];
    }
}
