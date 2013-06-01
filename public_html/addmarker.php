<?php
	require_once('db.php');
	$note = mysql_real_escape_string($_POST['note']);
	$lat = mysql_real_escape_string($_POST['lat']);
	$long = mysql_real_escape_string($_POST['long']);
	//$picture = mysql_real_escape_string($_POST['picture']);
	$sql = "INSERT INTO `tiger`.`marker_sitephoto` (`id`, `approved`, `owner`, `created`, `lastupdate`, `type_id`, `latitude`, `longitude`, `note`, `image`, `mime_type`, `caption`) VALUES (NULL, '', '', '', '', '1', '".$lat."', '".$long."', '".$note."', '', '', '');";
	$retval = mysql_query( $sql, $cn );
	if(! $retval )
	{
		echo mysql_error();
	}
	echo 'OK';
?>
