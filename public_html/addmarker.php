<?php
	require_once('db.php');
	$note = mysql_real_escape_string($_POST['note']);
	echo 'OK';
?>
