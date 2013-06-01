<?php 
$hostname_cn = "localhost";
$database_cn = "tiger";
$username_cn = "tiger"; 
$password_cn = "VJPL52N3rrCBd6rN"; 

$cn = mysql_pconnect($hostname_cn, $username_cn, $password_cn) or trigger_error(mysql_error(),E_USER_ERROR); 
mysql_select_db($database_cn, $cn);
?>
