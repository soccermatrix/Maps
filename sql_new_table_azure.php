<?php
header('Access-Control-Allow-Origin: *');  

 function OpenConnection()  
    {  
        try  
        {  
            $serverName = "tcp:luisespinal.database.windows.net,1433";  
            $connectionOptions = array("Database"=>"projects",  
                "Uid"=>"luisespinal", "PWD"=>"Projects80%");  
            $conn = sqlsrv_connect($serverName, $connectionOptions);  
            if($conn == false)  
                 die( print_r( sqlsrv_errors(), true));
        }  
        catch(Exception $e)  
        {  
            echo("Error!");  
        }  
    }  

    $conn = OpenConnection();  

?>