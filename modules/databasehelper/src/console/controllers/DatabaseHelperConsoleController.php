<?php

namespace abryrath\databasehelper\console\controllers;

use Craft;
use abryrath\databasehelper\DatabaseHelperModule;
use yii\console\Controller;
use yii\helpers\Console;

class DatabaseHelperConsoleController extends Controller
{
    public function actionSyncdb($environment = 'production')
    {
        $logger = new class($this) {
                protected $console;
                protected $levels = [
                    'info' => CONSOLE::FG_GREEN,
                    'error' => CONSOLE::FG_RED,
                    'normal' => CONSOLE::FG_YELLOW,
                ];

                public function __construct($console)
                {
                    $this->console = $console;
                }

                public function log($text, $level = 'normal')
                {
                    $this->console->stdout($text, $this->levels[$level]);
                    $this->console->stdout(PHP_EOL);
                }
            };

        DatabaseHelperModule::$instance->syncdb->sync($logger, $environment);
    }

    public function actionDumpmysql()
    {
        DatabaseHelperModule::$instance->syncdb->dumpMysql();
    }
}
