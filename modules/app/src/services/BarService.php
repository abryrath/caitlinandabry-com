<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Entry;

class BarService
{
    public function all()
    {
        $bars = Entry::find()
              ->section('bars')
              ->all();

        $map = function($b) {
            return [
                'title' => $b->title,
            ];
        };

        return array_map($map, $bars);
    }
}
