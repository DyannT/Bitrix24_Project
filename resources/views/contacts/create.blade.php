<!DOCTYPE html>
<html>
<head>
    <title>Add/Edit Contact</title>
</head>
<body>
<h1>Add Contact</h1>
<form action="{{route('contacts.store')}}" method="POST">
    @csrf
    <label>Name:</label>
    <input type="text" name="NAME" value="" required>
    <label>Address:</label>
    <input type="text" name="ADDRESS" value="">
    <label>Phone:</label>
    <input type="text" name="PHONE" value="">
    <label>Email:</label>
    <input type="email" name="EMAIL" value="">
    <label>Website:</label>
    <input type="text" name="WEB" value="">
    <label>Bank Info:</label>
    <input type="text" name="BANK_INFO" value="">
    <button type="submit">Create</button>
</form>
</body>
</html>
