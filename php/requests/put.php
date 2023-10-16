<?php

require_once ("../link.php");
error_reporting(E_ALL);

    if(isset($_POST)) {
        $id = $_POST["id"];
        $name = $_POST["name"];
        $middlename = $_POST["middlename"];
        $surname = $_POST["surname"];
        $birthdate = $_POST["birthdate"];
        
        $imagePath="";

        $origName=$_FILES["image"]["name"];
        if(!$origName){
            $imagePath = $_POST["backupImage"];
        }
        else{
            $imagePath="img/".$origName;
        }
        $row=mysqli_query($link,"SELECT `id` FROM image WHERE `path`='$imagePath'");
        
        if ($tmp=mysqli_fetch_assoc($row)){
            $img=$tmp["id"];
        }
        else {
            move_uploaded_file($_FILES["image"]["tmp_name"],"../../".$imagePath);
            mysqli_query($link, "INSERT INTO `image`(`path`) VALUES ('$imagePath')");

            $img = $link->insert_id;
        }
        

        mysqli_query($link, "UPDATE `user` SET `name`='$name',`middlename`='$middlename',`surname`='$surname',`birthdate`='$birthdate',`img`='$img' WHERE `id`='$id'");

        echo(json_encode(array("surname"=>$surname,"name"=>$name,"middlename"=>$middlename,"birthdate"=>$birthdate,"imagePath"=>$imagePath)));
    }

$link->close();
?>
