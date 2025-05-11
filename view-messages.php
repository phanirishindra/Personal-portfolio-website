<?php
// Connect to MySQL database
$conn = new mysqli("localhost", "root", "", "portfolio"); // Update with your MySQL credentials if needed

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch messages from the database
$result = $conn->query("SELECT * FROM messages ORDER BY submitted_at DESC");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Messages</title>
    <link rel="stylesheet" href="styles.css"> <!-- Same CSS file -->
</head>
<body>

    <header>
        <div class="logo">MY PERSONAL PORTFOLIO</div>
        <nav>
            <ul>
                <li><a href="index.html">Back to Home</a></li>
            </ul>
        </nav>
    </header>

    <section id="contact" style="margin-top: 100px;">
        <h2>Submitted Messages</h2>
        <div style="text-align: left;">
            <?php
            if ($result->num_rows > 0) {
                // Display each message
                while ($row = $result->fetch_assoc()) {
                    echo "<div style='border:2px solid #4caf50; padding:15px; margin:10px 0; border-radius:5px; background:#ffffffaa;'>";
                    echo "<strong>Name:</strong> " . htmlspecialchars($row["name"]) . "<br>";
                    echo "<strong>Email:</strong> " . htmlspecialchars($row["email"]) . "<br>";
                    echo "<strong>Message:</strong><br>" . nl2br(htmlspecialchars($row["message"])) . "<br>";
                    echo "<small><em>Submitted at: " . $row["submitted_at"] . "</em></small>";
                    echo "</div>";
                }
            } else {
                echo "<p>No messages found.</p>";
            }
            ?>

        </div>
    </section>

    <footer>
        <p>&copy; 2025 Sathwik | All Rights Reserved</p>
    </footer>

</body>
</html>

<?php
$conn->close();
?>
