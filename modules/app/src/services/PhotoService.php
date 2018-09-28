<?php

namespace abryrath\wedding\services;

use Craft;
use craft\elements\Asset;

class PhotoService
{
    public function all()
    {
        $photos = Asset::find()
                ->volume('s3Photos')
                ->all();

        $map = function($a) {
            return [
                'title' => '',
                'src' => $a->url,
            ];
        };

        return array_map($map, $photos);
    }
}
