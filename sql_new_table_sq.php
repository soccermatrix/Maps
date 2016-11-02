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

//INSERT INTO Regions (RegionName) VALUES ('somedata')

$sql = "
CREATE TABLE employees  (
	ID int  IDENTITY(1,1) PRIMARY KEY,   
	NAME varchar(255) NOT NULL,
	TITLE varchar(255) NULL DEFAULT '(not title available)',
	SUB_TITLE varchar(255) NULL,
	SKILLS varchar(255) NULL,
	COUNT int NULL DEFAULT '1',
	DESCRIPTION varchar(255) NULL,
	QUOTE varchar(255) NULL,
	AVAILABLE tinyint NULL DEFAULT '1',
	PRICE int NULL,
	AVATAR varchar(255) NULL
) 
";
/*
CREATE TABLE Regions
(RegionID int IDENTITY(1,1) PRIMARY KEY,  
RegionName varchar(255) NOT NULL,  
RegionContact varchar(255) NULL)
*/

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}
?>