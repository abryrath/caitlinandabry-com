<?php
namespace abryrath\databasehelper;

use Craft;
use yii\base\Module;
use abryrath\databasehelper\services\SyncDbService;

class DatabaseHelperModule extends Module
{
    public static $instance;

    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@abryrath/databasehelper', $this->getBasePath());
        $this->controllerNamespace = 'abryrath\databasehelper\console\controllers';

        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;

        // Set base components
        $this->setComponents([
            'syncdb' => SyncDbService::class,
        ]);

        // Logging
        // Craft::info(
        //     Craft::t(
        //         'databaseHelper',
        //         '{name} module loaded',
        //         ['name' => 'abryrath']
        //     ),
        //     __METHOD__
        // );
    }

    public function getSettings()
    {
        $config = [];

        if (file_exists(CRAFT_BASE_PATH . '/config/abryrath-database-helper.php')) {
            $config = require CRAFT_BASE_PATH . '/config/abryrath-database-helper.php';
        }

        return (object) $config;
    }
}    
