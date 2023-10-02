<?php
require_once ("link.php");
if (isset($_GET)){
    if($_GET["type"] =="GET"){
        $entries=mysqli_query($link,"SELECT * FROM user JOIN image ON user.img=image.id");
        $result=[];
        while($row=mysqli_fetch_array($entries)){
            array_push($result,$row);
        }
        
        echo json_encode($result);
    }

    else if($_GET["type"] =="POST"){

    }

    else if($_GET["type"] =="PUT"){

    }
}
?>