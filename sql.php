<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security, disable for debugging
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

//Azure Server
/*
db connection string php Server: luisespinal.database.windows.net,1433 \r\nSQL Database: projects\r\nUser Name: luisespinal\r\n\r\nPHP Data Objects(PDO) Sample Code:\r\n\r\ntry {\r\n   $conn = new PDO ( \"sqlsrv:server = tcp:luisespinal.database.windows.net,1433; Database = projects\", \"luisespinal\", \"{your_password_here}\");\r\n    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );\r\n}\r\ncatch ( PDOException $e ) {\r\n   print( \"Error connecting to SQL Server.\" );\r\n   die(print_r($e));\r\n}\r\n\rSQL Server Extension Sample Code:\r\n\r\n$connectionInfo = array(\"UID\" => \"luisespinal@luisespinal\", \"pwd\" => \"{your_password_here}\", \"Database\" => \"projects\", \"LoginTimeout\" => 30, \"Encrypt\" => 1, \"TrustServerCertificate\" => 0);\r\n$serverName = \"tcp:luisespinal.database.windows.net,1433\";\r\n$conn = sqlsrv_connect($serverName, $connectionInfo);
server name: luisespinal.database.windows.net
server admin luisespinal
password projects80%
db name projects80%
*/

// $host = "projectsUser.db.2596913.hostedresource.com";
// $user = "projectsUser";
// $pass = "Projects80%";
// $db =  "projectsUser";



//Windows Server
$host = "projectsUser.db.2596913.hostedresource.com";
$user = "projectsUser";
$pass = "Projects80%";
$db =  "projectsUser";

//Linux Server

// $host = "projectsUser2.db.3872119.hostedresource.com";
// $user = "projectsUser2";
// $pass = "Projects80%";
// $db =  "projectsUser2";


$conn = new mysqli($host, $user, $pass, $db);

$sql = $conn->query("SELECT * FROM employee_tbl");

$data = "";
while($rs = $sql->fetch_array(MYSQLI_ASSOC)) {
    if ($data != "") {$data .= ",";}
    $data .= '{';
    $data .= '"userId":"'  . $rs["ID"] . '",';
    $data .= '"fullName":"'  . $rs["NAME"] . '",';
    $data .= '"title":"'  . $rs["TITLE"] . '",';
    $data .= '"sub_title":"'  . $rs["SUB_TITLE"] . '",';
    $data .= '"skills":"'  . $rs["SKILLS"] . '",';
    $data .= '"count":"'  . $rs["COUNT"] . '",';
    $data .= '"description":"'  . $rs["DESCRIPTION"] . '",';
    $data .= '"quote":"'  . $rs["QUOTE"] . '",';
    $data .= '"available":"'  . $rs["AVAILABLE"] . '",';
    $data .= '"price":"'  . $rs["PRICE"] . '",';
    $data .= '"avatar":"'  . $rs["AVATAR"] .'"';    
    $data .= '}';
}
$data ='{"employees":['.$data.']}';



$conn->close();
//echo($data);
//new line added Oct 13 to support RESTful web service
//$result = json_decode($data);
echo($data)
//echo($data->$data['employees'])

?>