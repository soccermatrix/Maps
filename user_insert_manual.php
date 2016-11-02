<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$data = json_decode(file_get_contents("php://input"));

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

$sql = $conn->query("INSERT INTO employee_tbl (NAME,TITLE,SUB_TITLE,SKILLS,COUNT,DESCRIPTION,QUOTE,AVAILABLE,PRICE,AVATAR) VALUES ('" 
     . $fullName . "','" 
     . $title . "','"
     . $sub_title . "','"
     . $skills . "','"
     . $count . "','"
     . $description . "','"
     . $quote . "','"
     . $available . "','"
     . $price . "','"
     . $avatar . "')"
    );


if($conn->query($sql) === TRUE) {
    echo "New recod created";
} else {
    echo "Error: " . $sql . "<br" . $conn->error;
}

$conn->close();

?>