<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <title>Employee List</title>
</head>
<body>
<div class="container mt-5">
    <h1>Employee List</h1>
    <button id="refresh-btn" class="btn btn-primary mb-3">Refresh</button>
    <button id="view-btn" class="btn btn-secondary mb-3" disabled>View Employee</button>
    <ul id="employee-list" class="list-group">
        @foreach($employees as $employee)
            <li class="list-group-item" data-id="{{ $employee['ID'] }}">{{ $employee['NAME'] }}</li>
        @endforeach
    </ul>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="{{ mix('js/app.js') }}"></script>
<script>
    $(document).ready(function() {
        let selectedEmployee = null;

        $('#employee-list').on('click', '.list-group-item', function() {
            $('#employee-list .list-group-item').removeClass('active');
            $(this).addClass('active');
            selectedEmployee = $(this).data('id');
            $('#view-btn').prop('disabled', false);
        });

        $('#refresh-btn').click(function() {
            $.get('{{ route('employees.refresh') }}', function(data) {
                const list = $('#employee-list');
                list.empty();
                data.forEach(employee => {
                    const li = $('<li></li>')
                        .addClass('list-group-item')
                        .text(employee.NAME)
                        .data('id', employee.ID);
                    list.append(li);
                });
            });
        });

        $('#view-btn').click(function() {
            if (selectedEmployee) {
                $.get(`/employee/${selectedEmployee}`, function(employee) {
                    alert(`Employee: ${employee.NAME}\nEmail: ${employee.EMAIL}`);
                });
            }
        });
    });
</script>
</body>
</html>
