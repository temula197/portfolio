document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    form.addEventListener('submit', handleContactFormSubmit);
});

function handleContactFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
        alert('Please complete all required fields before sending your message.');
        return;
    }

    const submitUrl = form.action;

    fetch(submitUrl, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(function(response) {
        if (response.ok) {
            alert('Message sent successfully! Thank you for reaching out.');
            form.reset();
        } else {
            return response.json()
                .then(function(errorData) {
                    throw new Error(errorData.error || 'Submission failed. Please try again.');
                })
                .catch(function() {
                    throw new Error('Submission failed. Please try again later.');
                });
        }
    })
    .catch(function(error) {
        alert('Failed to send message: ' + error.message);
    });
}


