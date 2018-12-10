<?php

namespace abryrath\wedding;

use Craft;
use yii\base\Module;
use abryrath\wedding\twigextensions\AppTwigExtension;

class App extends Module
{
    public static $instance;

    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@abryrath', $this->getBasePath());
        //$this->controllerNamespace = 'abryrath\'

        static::setInstance($this);
        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;
        Craft::$app->view->registerTwigExtension(new AppTwigExtension());
    }
}
