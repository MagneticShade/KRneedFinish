<?php
require_once ("../link.php");
error_reporting(E_ALL);

 if (isset($_GET)) {

     $id = $_GET["id"];
     echo(json_encode($id));
     mysqli_query($link, "DELETE FROM user where id= $id");
 }

 $link->close();
 ?>

