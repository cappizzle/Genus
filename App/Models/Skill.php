<?php

namespace App\Models;

use PDO;

/**
 * Post model
 *
 * PHP version 5.4
 */
class Skill extends \Core\Model
{

    public function __construct($data = [])
    {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        };
    }

    public function populate()
    {
        $sql = "INSERT INTO skills (edipi, skill_name, skill_level, skill_interest)
                VALUES (:edipi, :skill_name, :skill_level, :skill_interest)";

        $db = static::getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindParam(":edipi", $this->edipi, PDO::PARAM_STR);
        $stmt->bindParam(":skill_name", $this->talentText, PDO::PARAM_STR);
        $stmt->bindParam(":skill_level", $this->skill_percentage, PDO::PARAM_STR);
        $stmt->bindParam(":skill_interest", $this->interest_percentage, PDO::PARAM_STR);

        if($stmt->execute()){
          return true;
        }
        return false;
    }

    public function fetchByUser($data)
    {
      $sql = "SELECT * FROM skills WHERE edipi = :edipi";

      $db = static::getDB();
      $stmt = $db->prepare($sql);

      $stmt->bindParam(":edipi", $data, PDO::PARAM_STR);
      $stmt->execute();

      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fetchAll()
    {
      $sql = "SELECT * FROM skills";

      $db = static::getDB();
      $stmt = $db->prepare($sql);

      $stmt->execute();

      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
