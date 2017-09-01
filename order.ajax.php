<?

include("data.php");

$subject="Заказ емкости ".clearData($_POST[_fixed_name("title")]). " - АкваХим";

$body="Имя: ".clearData($_POST[_fixed_name("name")])."
Email: ".clearData($_POST[_fixed_name("email")])."
Телефон: ".clearData($_POST[_fixed_name("tel")])."
Объем емкости: ".clearData($_POST[_fixed_name("volume")])."
Емкость ".clearData($_POST[_fixed_name("title")])."
";

@mail($email,$subject,$body,"From:$email\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n");
?>	