<?php

namespace abryrath\wedding\controllers;

use Craft;
use yii\web\Controller;

class RestaurantController extends Controller
{
    public function actionAll($cuisines = '', $cost = '',  $sort = '', $sortDir = '')
    {
        $opts = [];
        if ($cuisines) {
            $opts['cuisines'] = $cuisines;
        }
        if ($cost) {
            $opts['cost'] = $cost;
        }
        if ($sort) {
            $opts['sort'] = $sort;
        }
        if ($sortDir) {
            $opts['sortDir'] = $sortDir;
        }
        $restaurants = Craft::$app
                     ->get('restaurants')
                     ->filtered($opts);
        
        return json_encode($restaurants);
    }
}
