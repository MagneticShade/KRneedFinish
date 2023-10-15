<?php
require_once ("../link.php");
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
    }
}
$link->close();
?>
