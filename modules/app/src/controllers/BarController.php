<?php

namespace abryrath\wedding\controllers;

use Craft;
use yii\web\Controller;

class BarController extends Controller
{
    public function actionAll($sort = 'alpha', $sortDir = 'asc')
    {
        $opts = compact('sort', 'sortDir');
        
        $bars = Craft::$app
              ->get('bars')
              ->filtered($opts);

        return json_encode($bars);
    }
}
