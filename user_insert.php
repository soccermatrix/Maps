<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$data = json_decode(file_get_contents("php://input"));

$fullName       = $data->fullName; 
$title          = $data->title;
$sub_title      = $data->sub_title;
$skills         = $data->skills;
$count          = $data->count;
$description    = $data->description;
$quote          = $data->quote;
$available      = $data->available;
$price          = $data->price;
$avatar         = $data->avatar;

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
    echo "success";
} else {
    echo "Error: " . $sql . "<br" . $conn->error;
}

$conn->close();

?>