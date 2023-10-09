<?php
require_once ("link.php");
error_reporting(E_ALL);

 if (isset($_GET["type"])){
        $entries=mysqli_query($link,"SELECT name,middlename,surname,date,path FROM user JOIN image ON user.img=image.id ORDER BY user.date asc ");
        $result=[];
        while($row=mysqli_fetch_assoc($entries)){
            array_push($result,$row);
        }

        echo json_encode($result);
 }

 else if (isset($_POST)){

    if($_SERVER['REQUEST_METHOD'] =="GET"){
        $entries=mysqli_query($link,"SELECT user.id, date,surname,name,middlename,birthdate,path FROM user JOIN image ON user.img=image.id ORDER BY user.date asc ");
        $result=[];
        while($row=mysqli_fetch_assoc($entries)){
            array_push($result,$row);
        }

        echo json_encode($result);
    }


    else if($_SERVER['REQUEST_METHOD'] =="POST"){
        $data=json_decode(file_get_contents('php://input'));
        $name=$data->name;
        $middlename=$data->middlename;
        $surname=$data->surname;
        $birthdate=$data->birthdate;
        $imagePath=$data->img;

        mysqli_query($link,"INSERT INTO `image`(`path`) VALUES ($imagePath)");

        $img=$link->insert_id;

        mysqli_query($link,"INSERT INTO `user`(`name`, `middlename`, `surname`, `birthdate`, `img`) VALUES ('$name, $middlename, $surname, $birthdate, $img')");
    }

    else if($_SERVER['REQUEST_METHOD'] =="DELETE"){
        $data=json_decode(file_get_contents('php://input'));
        $id=$data->id;
        mysqli_query($link,"DELETE FROM user where id=$id");
    }


    else if($_SERVER['REQUEST_METHOD'] =="PATCH"){

    }
 }

?>