function calculateAverage(event) {
    event.preventDefault();

    // Get values of all input fields
    const inputs = [];
    for (let i = 1; i <= 7; i++) {
        const value = parseFloat(document.getElementById(`value${i}`).value);
        if (isNaN(value) || value < 1.0 || value > 5.0) {
            alert(`Please enter a valid grade between 1.0 and 5.0.`);
            return;
        }
        inputs.push(value);
    }

    // Calculate the weighted average
    const weights = [3, 4, 4, 4, 3, 1, 3];
    const sum = inputs.reduce(
        (total, value, index) => total + value * weights[index],
        0
    );
    const average = sum / 22;

    // Update the result
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your general weighted average is ${average.toFixed(
        2
    )}`;
    resultDiv.style.display = "block";

    // Show the download button
    const downloadButton = document.getElementById("downloadImage");
    downloadButton.style.display = "block";
}

function downloadAsStyledImage() {
    const body = document.body; // Select the entire body of the page
    const container = document.querySelector(".container"); // Select the container with grades

    // Temporarily hide interactive elements like buttons
    const buttons = document.querySelectorAll(
        'input[type="submit"], #downloadImage'
    );
    buttons.forEach((button) => (button.style.display = "none"));

    // Adjust body to enforce a 9:16 aspect ratio temporarily
    const originalBodyStyle = body.style.cssText; // Save original body styles
    body.style.width = "720px"; // Force width for 9:16 ratio (portrait)
    body.style.height = "1280px"; // Force height for 9:16 ratio (portrait)
    body.style.transform = "scale(1)";
    body.style.transformOrigin = "top left";
    body.style.overflow = "hidden";

    // Add a semi-transparent dark background to the body
    body.style.background = "linear-gradient(135deg, #6E08A6, #5D19A7, #160470)";

    // Temporarily scale up the container for better readability
    const originalContainerStyle = container.style.cssText; // Save original container styles
    container.style.transform = "scale(1.5)"; // Increase size by 1.5x
    container.style.transformOrigin = "center"; // Ensure it scales from the center
    container.style.margin = "100px auto"; // Add spacing to center it better
    container.style.background = "rgba(255, 255, 255, 0.4)";

    // Capture the body with fixed width and height for the image
    html2canvas(body, { 
        backgroundColor: null,
        width: 720, // Explicitly set width to 720px
        height: 1280 // Explicitly set height to 1280px
    }).then((canvas) => {
        // Restore original styles
        body.style.cssText = originalBodyStyle;
        container.style.cssText = originalContainerStyle;

        // Trigger the download
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "grades.png";
        link.click();

        // Restore button visibility
        buttons.forEach((button) => (button.style.display = "block"));
    });
}
