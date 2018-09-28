<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Entry;

class AttractionService
{
    public function all()
    {
        $attractions = Entry::find()
                     ->section('attractions')
                     ->all();

        $map = function($a) {
            return [
                'title' => $a->title,
            ];
        };

        return array_map($map, $attractions);
    }
}
