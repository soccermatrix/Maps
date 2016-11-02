<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$data = json_decode(file_get_contents("php://input"));

$id             = $data->id;
$fullName       = "fullName";
$title          = "title";
$sub_title      = "sub title";
$skills         = "skills";
$count          = 25;
$description    = "description";
$quote          = "quote";
$available      = 1;
$price          = 50;
$avatar         = "avatar_1";

$host = "projectsUser.db.2596913.hostedresource.com";
$user = "projectsUser";
$pass = "Projects80%";
$db =  "projectsUser";


$conn = new mysqli($host, $user, $pass, $db);
$sql = $conn->query("UPDATE employee_tbl SET 
    NAME = '" . $fullName . "', 
    TITLE = '" . $title . "',
    SUB_TITLE = '" . $sub_title . "',
    SKILLS = '" . $skills . "',
    COUNT = '" . $count . "',
    DESCRIPTION = '" . $description . "',
    QUOTE = '" . $quote . "',
    AVAILABLE = '" . $available . "',
    PRICE = '" . $price . "',
    AVATAR = '" . $avatar . "'

    WHERE ID = '" . $id ."'")


//  if($conn->query($sql) === TRUE) {
//      echo "success";
//  } else {
//      echo "Error: " . $sql . "<br" . $conn->error;
//  }

// $conn->close();

?>