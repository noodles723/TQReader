<?
$p=$_GET['p'];
$pics=file($p);
for($i=0;$i< count($pics);$i++)
{
    echo $pics[$i];
}
?>
