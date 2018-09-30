<?php

namespace abryrath\wedding\controllers;

use Craft;
use yii\web\Controller;

class AttractionController extends Controller
{
    public function actionAll($sort = 'alpha', $sortDir = 'asc')
    {
        $opts = compact('sort', 'sortDir');

        $attractions = Craft::$app
                     ->get('attractions')
                     ->filtered($opts);
        
        return json_encode($attractions);
    }
}
