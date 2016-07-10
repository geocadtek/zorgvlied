<?php
	 
	class MyDB extends SQLite3
	{
		function __construct()
		{
			$this->open('zorgvlied_bners.sl3');
		}
	}

	$db = new MyDB();
	 
	$tabelnaam = "bners";
	$stm_user = "select * from  $tabelnaam ";
	
	$results = $db->query($stm_user);
	
	while($row = $results->fetchArray()) {
		
		echo "1;".$row['KSUB'].";".$row['ANVOOR'].";".$row['ANACHTER'].";".$row['BEROEP_BEKEND'].";".$row['TEKST_PERSOON']."|";
	
	}

	// DB altijd sluiten
	$db->close();
	
?>