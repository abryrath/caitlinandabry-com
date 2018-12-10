<?php

namespace abryrath\wedding\twigextensions;

use abryrath\wedding\App;
use Craft;
use Twig_Extension;
use Twig_SimpleFunction;

class AppTwigExtension extends Twig_Extension
{
    public function __construct()
    {
        // $env = Craft::$app->getView()->getTwig();
        // $env->addGlobal('')
    }

    public function getFunctions()
    {
        return [
            new Twig_SimpleFunction('photosSrc', [$this, 'photosSrc']),
        ];
    }

    public function photosSrc($photos)
    {
        return array_map(function ($photo) {
            return [
                'src' => $photo->getUrl(),
                'title' => $photo->title,
                'preview' => $photo->getUrl('photoPreview'),
            ];
        }, $photos);
    }
}