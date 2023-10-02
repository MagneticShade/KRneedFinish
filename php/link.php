<?php
$host="localhost";
$user="root";
$pass="";
$db="phpdata";

$link=new mysqli($host,$user,$pass,$db);

if($link->connect_errno){
    die("Error connecting to database: " . $link->connect_errno);
}
?>