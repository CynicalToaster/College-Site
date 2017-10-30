<?
    if ($_POST['reset'] != '1')
        $command = '/home/dan/anaconda3/envs/TensorFlow/bin/python /GitHub/TensorFlow/tf_train.py [0] ' . $_POST['neural_result']; 
    else
        $command = '/home/dan/anaconda3/envs/TensorFlow/bin/python /GitHub/TensorFlow/tf_reset.py';
    $output = shell_exec($command);
    echo 'Test: ' . $output;
?>

<script>
    location.reload();
</script>