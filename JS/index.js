
async function query(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            throw new Error('Failed to generate image');
        }
        const result = await response.blob();
        return URL.createObjectURL(result);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function generateImage() {
    const textInput = document.getElementById('textInput').value;
    const imageUrl = await query({ "inputs": textInput });
    if (imageUrl) {
        const generatedImage = document.getElementById('generatedImage');
        generatedImage.src = imageUrl;
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = imageUrl;
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.style.display = 'block'; // Show the image container
    } else {
        alert('Failed to generate image. Please try again later.'); // Notify the user
    }
}

function copyImageUrl() {
    const imageUrl = document.getElementById('generatedImage').src;
    const tempInput = document.createElement('input');
    tempInput.value = imageUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Image URL copied to clipboard!');
}

async function shareImage() {
    const imageUrl = document.getElementById('generatedImage').src;
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Generated Image',
                text: 'Check out this image generated from text!',
                url: imageUrl,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Sharing is not supported on this browser.');
    }
}