<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security, disable for debugging
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$data = json_decode(file_get_contents("php://input"));

// $fullName       = 'My Name';
// $title          = 'My Title';
// $sub_title      = 'My Sub Title';
// $skills         = 'My Skills';
// $count          = '5'; 
// $description    = 'My Description';
// $quote          = 'My Quote';
// $available      = '1';
// $price          = '75';
// $avatar         = 'avatar_2';


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

$serverName = "projects3.db.2596913.hostedresource.com"; //serverName\instanceName
$connectionInfo = array( "Database"=>"projects3", "UID"=>"projects3", "PWD"=>"Projects80%");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}


$sql = "
INSERT INTO employees (NAME,TITLE,SUB_TITLE,SKILLS,COUNT,DESCRIPTION,QUOTE,AVAILABLE,PRICE,AVATAR)
VALUES (
'" . $fullName . "', 
'" . $title . "',
'" . $sub_title . "',
'" . $skills . "',
'" . $count . "',
'" . $description . "',
'" . $quote . "',
'" . $available . "',
'" . $price . "',
'" . $avatar . "'
)
";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}
?>