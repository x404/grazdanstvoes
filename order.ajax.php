<?

include("data.php");

$subject=clearData($_POST[_fixed_name("theme")]). " - Гражданство ЕС";

$name = clearData($_POST[_fixed_name("name")]);
$email = clearData($_POST[_fixed_name("email")]);
$msg = clearData($_POST[_fixed_name("msg")]);

if ($name != '') { $name = "Имя: ".$name; };
if ($email != '') {$email = "\r\nEmail: ".$email; };
if ($msg != '') {$msg = "\r\nСообщение: ".$msg; };

$body = $name." 
Телефон: ".clearData($_POST[_fixed_name("tel")])
.$email
.$msg;

@mail($email,$subject,$body,"From:$email\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n");
?>	