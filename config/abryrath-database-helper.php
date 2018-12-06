<?php

return [
    'remotes' => [
        'production' => [
            'host' => 'abryrath.com',
            'username' => 'abry',
            'port' => '22',
            'phpPath' => '/usr/bin/php',
            'root' => '/home/abry/caitlinandabry-com',
            'backupDirectory' => '/home/abry/caitlinandabry-com/storage/backups/databases/',
        ],
        'staging' => [
            'host' => 'abryrath.com',
            'username' => 'abry',
            'port' => 22,
            'phpPath' => '/usr/bin/php',
            'root' => '/home/abry/stage.caitlinandabry.com',
            'backupDirectory' => '/home/abry/stage.caitlinandabry.com/storage/backups/databases/',
        ],
    ],
];
