<?php
require_once ("../link.php");
error_reporting(E_ALL);

if(isset($_POST)) {

    $name = $_POST["name"];
    $middlename = $_POST["middlename"];
    $surname = $_POST["surname"];
    $birthdate = $_POST["birthdate"];
    $origName=$_FILES["image"]["name"];

    $imagePath="img/".$origName;

    $row=mysqli_query($link,"SELECT `id` FROM image WHERE `path`='$imagePath'");
    if ($tmp=mysqli_fetch_assoc($row)["id"]){
        $img=$tmp;
    }
    else {
        move_uploaded_file($_FILES["image"]["tmp_name"],"../../".$imagePath);
        mysqli_query($link, "INSERT INTO `image`(`path`) VALUES ('$imagePath')");
        $img = $link->insert_id;
    }

    mysqli_query($link, "INSERT INTO `user`(`name`, `middlename`, `surname`, `birthdate`, `img`  ) VALUES ('$name', '$middlename', '$surname', '$birthdate', '$img')");

}
$link->close();

?>