function access_checker() {
    document.getElementsByTagName("html")[0].style.visibility = "hidden";
    let access = sessionStorage.getItem("access");

    if (access != "yes") {
        window.location.href = '/access_denied.html'
    } else {
        document.getElementsByTagName("html")[0].style.visibility = "visible";

        function clear_input() {
            document.getElementById('question').value = "";
            document.getElementById('options').value = "";
            document.getElementById('correctindex').value = "";
        }


        async function question_send(question, choices, correctindex) {

            const data = {
                question,
                choices,
                correctindex
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/add_questions', options);
            const json = await response.json();
        }

        function handleLoginSubmit(event) {
            event.preventDefault();
            let question = document.getElementById('question').value;
            let choices = document.getElementById('options').value;
            let correctindex = document.getElementById('correctindex').value;
            let options = choices.split(",");

            clear_input();
            alert("Question added successfully.");
            question_send(question, options, correctindex);

        }


        (function () {
            const forms = document.querySelectorAll('.question-form');
            Array.from(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (e) {
                        handleLoginSubmit(e)
                    });
                });
        })()

    }
}

access_checker();