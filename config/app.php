<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 */

return [
    'modules' => [
        'abryrath' => \abryrath\databasehelper\DatabaseHelperModule::class,
        'wedding' => \abryrath\wedding\App::class,
    ],
    'components' => [
        'restaurants' => \abryrath\wedding\services\RestaurantService::class,
        'bars' => \abryrath\wedding\services\BarService::class,
        'attractions' => \abryrath\wedding\services\AttractionService::class,
        'photos' => \abryrath\wedding\services\PhotoService::class,
    ],
    'bootstrap' => ['wedding'],
];
