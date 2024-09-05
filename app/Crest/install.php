<?php
require_once(__DIR__ . '/crest.php');

$result = crest::installApp();

if ($result['rest_only'] === false): ?>
    <head>
        <script src="//api.bitrix24.com/api/v1/"></script>
        <?php if ($result['install'] == true): ?>
            <script>
                BX24.init(function(){
                    BX24.installFinish();
                });
            </script>
        <?php endif; ?>
    </head>
    <body>
    <?php if ($result['install'] == true): ?>
        Installation has been finished
    <?php else: ?>
        Installation error
    <?php endif; ?>
    </body>
<?php else: ?>
    <!-- For REST only installations -->
    <?php if ($result['install'] == true): ?>
        REST-only installation has been finished
    <?php else: ?>
        REST-only installation error
    <?php endif; ?>
<?php endif; ?>
