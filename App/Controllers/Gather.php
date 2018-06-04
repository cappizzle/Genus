<?php

namespace App\Controllers;

use \Core\View;
use App\Models\Skill;
use App\Models\User;

/**
 * Posts controller
 *
 * PHP version 5.4
 */
class Gather extends \Core\Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function returnAction()
    {
        $user = new User();
        $userArray = $user->fetchAll();

        $skillsArray = array();
        $userSkills = array();


        foreach($userArray as $u){
          $skill = new Skill();
          // array_push($skillsArray, $skill->fetchByUser($u['edipi']));
          foreach($skill->fetchByUser($u['edipi']) as $s){
            array_push($skillsArray, $s);
          }
          $final = array(
            "name" => $u['name'],
            "edipi" => $u['edipi'],
            "rank" => $u['individual_rank'],
            "unit" => $u['unit'],
            "number" => $u['phone_number'],
            "email" => $u['email'],
            "skills" => $skillsArray
          );

          array_push($userSkills, $final);
        }

        echo json_encode($userSkills);

    }

    public function skillsAction()
    {
      $skill = new Skill();
      echo json_encode($skill->fetchAll());
    }

}
