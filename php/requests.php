<?php
require_once ("link.php");
error_reporting(E_ALL);

 if (isset($_GET)) {
     switch ($_GET["type"]) {
         case "GET":
            $entries = mysqli_query($link, "SELECT name,middlename,surname,date,path FROM user JOIN image ON user.img=image.id ORDER BY user.date asc ");
            $result = [];
            while ($row = mysqli_fetch_assoc($entries)) {
            array_push($result, $row);
            }

            echo json_encode($result);
            break;

         case "SAFEGET":
             $entries = mysqli_query($link, "SELECT user.id, date,surname,name,middlename,birthdate,path FROM user JOIN image ON user.img=image.id ORDER BY user.date asc ");
             $result = [];
             while ($row = mysqli_fetch_assoc($entries)) {
                 array_push($result, $row);
             }

             echo json_encode($result);
             break;

         case "POST":
            $data = json_decode(file_get_contents('php://input'));
            $name = $data->name;
            $middlename = $data->middlename;
            $surname = $data->surname;
            $birthdate = $data->birthdate;
            $imagePath = $data->img;

            mysqli_query($link, "INSERT INTO `image`(`path`) VALUES ($imagePath)");

            $img = $link->insert_id;

            mysqli_query($link, "INSERT INTO `user`(`name`, `middlename`, `surname`, `birthdate`, `img`) VALUES ('$name, $middlename, $surname, $birthdate, $img')");
            break;

         case "DEL":

            $id = $_GET["id"];
             echo(json_encode($id));
            mysqli_query($link, "DELETE FROM user where id= $id");

            break;

         case "PUT":
             mysqli_query($link,"UPDATE");
             break;
    }
 }

?>