$(".custom-button").on("click", function() {
    // Убираем класс "active" у всех кнопок
    $(".custom-button").removeClass("active-button");

    // Добавляем класс "active" к нажатой кнопке
    $(this).addClass("active-button");
});

    $("#submit").on("click",function () {
        let json = {
            "x": $(".active-button").val(),
            "y": $("input[name='yValue']").val(),
            "r": $("#rValue").val()
        };
        console.log(json.x, json.y, json.r)
        if (isNaN(+json.x) || isNaN(+json.y) || isNaN(json.r) || json.y < -3 || json.y > 5) {
            alert("Некорректные данные")
        }
        else {
            startTime = new Date().getTime();
            fetch("/fcgi-bin/app.jar?" + new URLSearchParams(json), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(response => {
                    let odz;
                    if (response.result) {
                        odz = "Попадание";
                    } else {
                        odz = "Мимо";
                    }

                    // Время выполнения скрипта
                    let endTime = new Date();
                    let executionTime = (endTime - startTime) + " ms";

                    // Текущее время
                    let currentTime = new Date().toLocaleString();

                    // Добавляем строку в таблицу
                    let newRow = `
        <tr>
            <td>${json.x}</td>
            <td>${json.y}</td>
            <td>${json.r}</td>
            <td>${odz}</td>
            <td>${currentTime}</td>
            <td>${executionTime}</td>
        </tr>
    `;
                    document.querySelector("#resultTable tbody").insertAdjacentHTML('beforeend', newRow);
                })
                .catch(error => {
                    alert("Ошибка при отправке данных: " + error.message);
                });
        }

    });


