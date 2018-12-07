<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Entry;

class RestaurantService
{
    public function filter($params)
    {
        $cuisines = [];
        
        $query = Entry::find()
            ->section('restaurants');

        if (key_exists('cuisine', $params)) {
            if ($params['cuisine']) {
                $cuisines = explode(',', $params['cuisine']);
                $query = $query->relatedTo($cuisines);
            }
            unset($params['cuisine']);
        }
    
        if (key_exists('cost', $params)) {
            if ($params['cost']) {
                $costs = explode(',', $params['cost']);
                $query = $query->relatedTo($costs);
            }
            unset($params['cost']);
        }

        $query = Craft::configure($query, $params);

        return $query;
    }

    public function all()
    {
        $restaurants = Entry::find()
                     ->section('restaurants');
                    //  ->all();
        // $map = function($rest) {
        //     return [
        //         'id' => $rest->id,
        //         'title' => $rest->title,
        //          'cuisines' => $rest->cuisine,
        //         //'address' => $rest->restaurantAddress,
        //         'epicentre' => $rest->restaurantEpicentre,
        //         'cost' => $rest->restaurantCost->value,
        //         'prox' => $rest->restaurantProximity,
        //         'desc' => $rest->restaurantDescription,
        //     ];
        // };

        // return array_map($map, $restaurants);
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
                        $val = $a['title'] < $b['title']
                             ? -1
                             : ($a['title'] > $b['title'] ? 1 : 0);
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
