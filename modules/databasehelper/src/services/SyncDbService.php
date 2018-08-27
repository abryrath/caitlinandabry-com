<?php

namespace abryrath\databasehelper\services;

use Craft;
use craft\base\Component;
use abryrath\databasehelper\DatabaseHelperModule;

function storage_path($path = null)
{
    static $craftStoragePath;

    if ($craftStoragePath === null) {
        $craftStoragePath = Craft::$app->path->getStoragePath();
    }

    if ($path) {
        return $craftStoragePath . '/' . trim($path, '/');
    }
    
    return $craftStoragePath . '/';
}

function env($key, $default = null)
{
    // first try normal env
    $value = getenv($key);

    // if normal env is false, try site specific env
    if ($value === false) {
        return $default;
    }

    switch (strtolower($value)) {
    case 'true':
    case '(true)':
        return true;

    case 'false':
    case '(false)':
        return false;

    case 'empty':
    case '(empty)':
        return '';

    case 'null':
    case '(null)':
        return;
    }

    // if (strlen($value) > 1 && StringHelper::startsWith($value, '"') && StringHelper::endsWith($value, '"')) {
    //     return substr($value, 1, -1);
    // }

    return $value;
}

class SyncDbService extends Component
{
    const BACKUP_DIRECTORY = 'backups/databases/';
    const SQL_DUMP_FILE_NAME = 'db_dump.sql';
    const SQL_DUMP_FILE_TARBALL = 'db_dump.sql.tar.gz';

    private $remotes = [];

    public function __construct()
    {
        $this->remotes = DatabaseHelperModule::$instance->getSettings()->remotes;
    }

    public function dumpMysql()
    {
        $this->checkBackupPath();

        $execSqlDump = env('MYSQL_DUMP_PATH') . ' -h ' . env('DB_SERVER') . ' -P ' . env('DB_PORT') . ' -u ' . env('DB_USER') . " --password='" . env('DB_PASSWORD') . "' " . env('DB_DATABASE') . ' > ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_NAME) . ' ;';
        $this->exec($execSqlDump);

        $execTar = 'cd ' . $this->sqlDumpPath() . ' && tar -czvf ' . static::SQL_DUMP_FILE_TARBALL . ' ' . static::SQL_DUMP_FILE_NAME;
        $this->exec($execTar);

        $execRm = 'rm ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_NAME);
        $this->exec($execRm);
    }

    public function sync($logger, $environment = 'production')
    {
        if (!isset($this->remotes)) {
            $logger->log('No remotes configured');
            return;
        }

        $this->checkBackupPath();
        $remote = $this->remotes[$environment];

        $logger->log('Beginning remote dump');
        $remoteSqlDumpStart = microtime(true);
        $execRemoteSsh = 'ssh ' . $remote['username'] . '@' . $remote['host'] . ' -p ' . $remote['port'];
        $execRemoteDump = $execRemoteSsh . ' ' . $remote['phpPath'] . ' ' . $remote['root'] . '/craft abryrath/database-helper-console/dumpmysql';
        $result = $this->exec($execRemoteDump);
        $remoteSqlDumpEnd = microtime(true);
        $logger->log('Remote dump completed in ' . number_format(($remoteSqlDumpEnd - $remoteSqlDumpStart), 2) . ' seconds');

        sleep(1);
        $logger->log('Begging remote download');
        $downloadStart = microtime(true);
        $remoteTarballPath = $remote['backupDirectory'] . static::SQL_DUMP_FILE_TARBALL;
        $execDownload = 'scp -P ' . $remote['port'] . ' ' . $remote['username'] . '@' . $remote['host'] . ':' . $remoteTarballPath . ' ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_TARBALL);
        $result = $this->exec($execDownload);
        $downloadEnd = microtime(true);
        $logger->log('Remote download completed in ' . number_format(($downloadEnd - $downloadStart), 2) . ' seconds');

        sleep(1);

        // delete remote file
        //$this->exec($execRemoteSsh . ' rm ' . $remoteTarballPath);
        $logger->log('Remote File Deleted');
        print_r($this->exec('cd ' . $this->sqlDumpPath() .' && tar -xzvf ' . static::SQL_DUMP_FILE_TARBALL));
        $this->exec('mysql -u ' . env('DB_USER') . ' -h ' . env('DB_SERVER') . ' -P ' . env('DB_PORT') . " --password='" . env('DB_PASSWORD') . "' " . env('DB_DATABASE') . ' < ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_NAME));
        $logger->log('Local Dump Complete');

        // delete sql file
        //$this->exec('rm ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_NAME));

        // delete zip file
        //$this->exec('rm ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_TARBALL));
        
    }
    protected function checkBackupPath()
    {
        $backupPath = $this->sqlDumpPath();
        if (!file_exists($backupPath)) {
            mkdir($backupPath, 0777, true);
        }
    }

    protected function sqlDumpPath($file = null)
    {
        if ($file) {
            return storage_path(static::BACKUP_DIRECTORY . $file);
        }

        return storage_path(static::BACKUP_DIRECTORY);
    }

    protected function exec($cmd)
    {
        echo $cmd . PHP_EOL;
        shell_exec($cmd . ' 2>&1');
    }
}
