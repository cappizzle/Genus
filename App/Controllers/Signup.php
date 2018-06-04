<?php

namespace App\Controllers;

use \Core\View;
use \App\Models\User;
use \App\Models\Skill;

class Signup extends \Core\Controller
{
  public function submitAction()
  {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $user = new User($request);
    if($user->save()){
      echo $user->name . " has been added. ";
    } else {
      echo 'Oops, there was an error';
    }


    foreach($request->skills as $s){
      $skill = new Skill($s);
      if($skill->populate()){
        echo $s->talentText . ' has been added for member: ' . $s->edipi . '. ';
      } else {
        echo 'Could not process your request';
      }
    }
  }
}
