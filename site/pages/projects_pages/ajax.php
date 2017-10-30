<?
    if ($_POST['reset'] != '1')
        $command = 'C:/Users/Dan/AppData/Local/conda/conda/envs/tensorflow/python.exe C:/GitHub/TensorFlow/tf_train.py [0] ' . $_POST['neural_result']; 
    else
        $command = 'C:/Users/Dan/AppData/Local/conda/conda/envs/tensorflow/python.exe C:/GitHub/TensorFlow/tf_reset.py';
    $output = shell_exec($command);
    echo 'Test: ' . $output;
?>

<script>
    location.reload();
</script>