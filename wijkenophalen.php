<?php
	 
	class MyDB extends SQLite3
	{
		function __construct()
		{
			$this->open('zorgvlied_wijken.sl3');
		}
	}

	$db = new MyDB();
	 
	$tabelnaam = "wijken";
	$stm_user = "select * from  $tabelnaam ";
	
	$results = $db->query($stm_user);
	
	while($row = $results->fetchArray()) {
		
		echo "1;".$row['ID'].";".$row['WIJKNUMMER'].";".$row['WIJKNAAM'].";".$row['WIJKINFORMATIE']."|";
	
	}

	// DB altijd sluiten
	$db->close();
	
?>