<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Entry;

class AttractionService
{
    public function filter($params)
    {
        $query = Entry::find()
            ->section('attractions');

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
        $attractions = Entry::find()
            ->section('attractions')
            ->all();

        $map = function ($a) {
            return [
                'title' => $a->title,
            ];
        };

        return array_map($map, $attractions);
    }

    public function filtered($opts = [])
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
                        return $sortDir == 'asc' ? $val : $val * -1;
                    }
                );
            }
        }

        return $filtered;
    }
}
