<?php 
$hostname_cnELI = "localhost";
$database_cnELI = "tiger";
$username_cnELI = "tiger"; 
$password_cnELI = "VJPL52N3rrCBd6rN"; 

$cnELI = mysql_pconnect($hostname_cnELI, $username_cnELI, $password_cnELI) or trigger_error(mysql_error(),E_USER_ERROR); 
mysql_select_db($database_cnELI, $cnELI);
?>
