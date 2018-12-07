<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Entry;

class BarService
{
    public function filter($params)
    {
        $cuisines = [];
        
        $query = Entry::find()
            ->section('bars');
    
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
        $bars = Entry::find()
              ->section('bars')
              ->all();

        $map = function ($b) {
            return [
                'title' => $b->title,
            ];
        };

        return array_map($map, $bars);
    }

    public function filtered($opts)
    {
        $filtered = $this->all();

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
}
