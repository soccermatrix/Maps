<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security, disable for debugging
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$serverName = "projects3.db.2596913.hostedresource.com"; //serverName\instanceName
$connectionInfo = array( "Database"=>"projects3", "UID"=>"projects3", "PWD"=>"Projects80%");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}


$sql = "
INSERT INTO employees (NAME,TITLE,SUB_TITLE,SKILLS,COUNT,DESCRIPTION,QUOTE,AVAILABLE,PRICE,AVATAR)
VALUES (
'My Name',
'My Title',
'My Sub Title',
'My Skills',
'5', 
'My Description',
'My Quote',
'1',
'75',
'avatar_2'
)
";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}
?>